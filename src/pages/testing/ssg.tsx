// pages/static-generation-method.tsx
import React, {useEffect, useRef, useState} from 'react';
import { GetStaticProps } from 'next';
import AWS from 'aws-sdk';
import StatsBar from "@/components/category/StatsBar";
import ProductList from "@/components/category/ProductList";
import { Product } from '@/types/Product';

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
                        <StatsBar products={products} loadingTime={buildTime} loadingTimeName={'Build time'} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    );
}