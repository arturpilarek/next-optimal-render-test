import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

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
}

type Stats = {
    id: number;
    name: string;
    stat: string;
}

export default function FetchMethodTesting() {
    const [products, setProducts] = useState<Product[]>([]);
    const [stats, setStats] = useState<Stats[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState<number>(0);
    const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

    const fetchProductsFromS3 = async () => {
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'bachelor-test-product-bucket',
            Key: 'product-data.json'
        };

        try {
            const start = performance.now();
            const data = await s3.getObject(params).promise();
            const end = performance.now();
            const fetchedProducts: Product[] = JSON.parse(data.Body.toString('utf-8'));

            setProducts(fetchedProducts.slice(0, 1000));
            setStats([{ id: 1, name: 'Fetching products time', stat: `${(end - start).toFixed(2)}ms` }]);
            setLoadingStartTime(end);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const handleImageLoaded = () => {
        setImagesLoaded(prev =>  prev + 1);
    };

    useEffect(() => {
        fetchProductsFromS3();
    }, []);

    useEffect(() => {
        const updateStats = () => {
            const currentStats = stats.filter(stat => stat.id !== 2);
            if (imagesLoaded === products.length && loadingStartTime) {
                const loadingEndTime = performance.now();
                const loadingTime = loadingEndTime - loadingStartTime;
                currentStats.push({ id: 2, name: 'Images loading time', stat: `${loadingTime.toFixed(2)}ms` });
            } else {
                currentStats.push({ id: 2, name: 'Images Loaded', stat: `${imagesLoaded} of ${products.length}` });
            }
            setStats(currentStats);
        };

        updateStats();
    }, [imagesLoaded, products.length, loadingStartTime]);

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
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
                                                src={product.ImageURL}
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
    )
}
