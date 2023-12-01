// pages/static-generation-method.tsx
import React, {useEffect, useRef, useState} from 'react';
import { GetStaticProps } from 'next';
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
    ModifiedImageURL?: string;
}

type Stats = {
    id: number;
    name: string;
    stat: string;
}

type StaticGenerationMethodProps = {
    products: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
    const start = performance.now();

    const s3 = new AWS.S3();
    const params = {
        Bucket: 'bachelor-test-product-bucket',
        Key: 'product-data.json'
    };

    try {
        const response = await s3.getObject(params).promise();
        let products: Product[] = [];

        if (response.Body) {
            const bodyContent = response.Body.toString('utf-8');
            products = JSON.parse(bodyContent).map((product: Product) => ({
                ...product,
                ModifiedImageURL: `${product.ImageURL}?v=${Math.floor(Math.random() * 1000)}`
            })).slice(0, 1000);
        }

        const end = performance.now();
        const buildTime = end - start;

        return {
            props: {
                products,
                buildTime: buildTime.toFixed(2)
            },
            revalidate: 10
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        return { props: { products: [], buildTime: 0 } };
    }
}

export default function StaticGenerationMethod({ products, buildTime }: StaticGenerationMethodProps & { buildTime: number }) {
    const imagesLoaded = useRef(0);
    const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
    const [stats, setStats] = useState<Stats[]>([
        { id: 1, name: 'Build time', stat: `${buildTime}ms` }
    ]);

// Stats logic
    useEffect(() => {
        setLoadingStartTime(performance.now());
        // We're using Image object to independently track when each image has loaded
        products.forEach((product) => {
            const img = new Image();
            img.src = product.ModifiedImageURL as string;
            img.onload = handleImageLoaded;
            img.onerror = handleImageError; // Håndter fejl ved indlæsning
        });
    }, [products]);

    const handleImageLoaded = () => {
        imagesLoaded.current += 1;
        updateImageStat();
    };

    const handleImageError = () => {
        console.error('Fejl ved indlæsning af billede');
    };

    const updateImageStat = () => {
        if (imagesLoaded.current === products.length && loadingStartTime) {
            const loadingEndTime = performance.now();
            const loadingTime = loadingEndTime - loadingStartTime;
            setStats(prevStats => [
                ...prevStats.filter(stat => stat.id !== 2),
                { id: 2, name: 'Images loading time', stat: `${loadingTime.toFixed(2)}ms` }
            ]);
        } else {
            setStats(prevStats => [
                ...prevStats.filter(stat => stat.id !== 2),
                { id: 2, name: 'Images Loaded', stat: `${imagesLoaded.current} of ${products.length}` }
            ]);
        }
    };

    useEffect(() => {
        setLoadingStartTime(performance.now());
    }, []);

    useEffect(() => {
        setStats(prevStats => [
            ...prevStats.filter(stat => stat.id !== 1),
            { id: 1, name: 'Build time', stat: `${buildTime}ms` }
        ]);
    }, [products.length, loadingStartTime, buildTime]);

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
                        <h4>Husk at genopfriske sitet</h4>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Static Site Generation Method</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Static Site Generation (SSG) er en metode, hvor sider genereres på byggetidspunktet. Dette betyder, at alle brugere får serveret den samme statiske fil, hvilket kan resultere i hurtigere loadtider og bedre SEO, da indholdet er klar, når søgemaskiner crawler siden. Det er især effektivt for indhold, der ikke ændrer sig ofte, men kan også understøtte dynamiske data gennem inkrementel regenerering.
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
