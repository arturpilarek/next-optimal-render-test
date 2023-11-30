// pages/ssr-method.tsx
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { GetServerSideProps } from 'next';

type Product = {
    ProductId: number;
    Gender: string;
    Category: string;
    SubCategory: string;
    ProductType: string;
    Colour: string;
    Usage: string;
    ProductTitle: string;
    Image: string;
    ImageURL: string;
    ModifiedImageURL?: string;
}

type Stats = {
    id: number;
    name: string;
    stat: string;
}

type SSRMethodTestingProps = {
    products: Product[];
    serverFetchTime: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
    const start = performance.now();

    const s3 = new AWS.S3();
    const params = {
        Bucket: 'bachelor-test-product-bucket',
        Key: 'product-data.json'
    };

    try {
        const response = await s3.getObject(params).promise();

        const end = performance.now();
        const fetchTime = end - start;

        let products: Product[] = [];

        if (response.Body) {
            const bodyContent = response.Body.toString('utf-8');
            const fetchedProducts: Product[] = JSON.parse(bodyContent);
            const updatedProducts = fetchedProducts.map(product => ({
                ...product,
                ModifiedImageURL: `${product.ImageURL}?v=${Math.floor(Math.random() * 1000)}`
            }));
            products = updatedProducts.slice(0, 1000);
        }

        return {
            props: {
                products,
                serverFetchTime: fetchTime.toFixed(2)
            }
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        return { props: { products: [], serverFetchTime: 0 } };
    }
}

export default function SSRMethodTesting({ products, serverFetchTime }: SSRMethodTestingProps) {
    const [stats, setStats] = useState<Stats[]>([
        { id: 1, name: 'Server-side fetching time', stat: `${serverFetchTime}ms` }
    ]);
    const [imagesLoaded, setImagesLoaded] = useState<number>(0);
    const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

    const handleImageLoaded = () => {
        setImagesLoaded(prev =>  prev + 1);
    };

    // To be sure we're starting fresh on each render
    useEffect(() => {
        return () => {
            setStats([]);
        };
    }, []);

    useEffect(() => {
        if (imagesLoaded === products.length && loadingStartTime) {
            const loadingEndTime = performance.now();
            const loadingTime = loadingEndTime - loadingStartTime;
            setStats([
                { id: 1, name: 'Server-side fetching time', stat: `${serverFetchTime}ms` },
                { id: 2, name: 'Images loading time', stat: `${loadingTime.toFixed(2)}ms` }
            ]);
        } else {
            setStats([
                { id: 1, name: 'Server-side fetching time', stat: `${serverFetchTime}ms` },
                { id: 2, name: 'Images Loaded', stat: `${imagesLoaded} of ${products.length}` }
            ]);
        }
    }, [imagesLoaded, products.length, loadingStartTime, serverFetchTime]);

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
                        <h4>Husk at genopfriske sitet</h4>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Fetch rendering method</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Client-side fetch anvender browserens native fetch API til at anmode om og modtage data efter siden er indlæst. Denne metode er nyttig for dynamisk indhold, der kræver opdateringer efter brugerinteraktioner, men kan have indflydelse på initial loadtid og SEO.
                        </p>
                    </div>
                    <div>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {stats.map((item) => (
                                <div key={item.id} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">

                        <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                                {products.map((product) => (
                                    <div
                                        key={product.ProductId}
                                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                                    >
                                        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={product.ModifiedImageURL}
                                                fetchPriority='high'
                                                alt={product.ProductTitle}
                                                onLoad={handleImageLoaded}
                                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col space-y-2 p-4">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                <a href={product.ProductTitle}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.ProductTitle}
                                                </a>
                                            </h3>
                                            <div className="flex flex-1 flex-col justify-end">
                                                <p className="text-sm italic text-gray-500">{product.Colour}</p>
                                                <p className="text-base font-medium text-gray-900">{product.Usage}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
