import React, {useEffect, useRef, useState} from 'react';
import AWS from 'aws-sdk';
import ProductList from "@/components/category/ProductList";
import StatsBar from "@/components/category/StatsBar";
import { Product } from '@/types/Product';

export default function FetchMethodTesting() {
    const [products, setProducts] = useState<Product[]>([]);
    const [fetchTime, setFetchTime] = useState<number | null>(null);

    const fetchProductsFromS3 = async () => {
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'bachelor-test-product-bucket',
            Key: 'product-data.json'
        };

        const start = performance.now();

        try {
            const response = await s3.getObject(params).promise();

            if (response.Body) {
                const bodyContent = response.Body.toString('utf-8');
                const fetchedProducts: Product[] = JSON.parse(bodyContent);
                setProducts(fetchedProducts.slice(0, 1000).map(product => ({
                    ...product,
                    // We're adding a random number to the image URL to avoid caching, so we can test the loading time independently
                    ModifiedImageURL: `${product.ImageURL}?v=${Math.floor(Math.random() * 1000)}`
                })));
            }

            const end = performance.now();
            setFetchTime(end - start);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProductsFromS3().then(() => console.log('Products fetched'))
    }, []);

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
                        <StatsBar products={products} loadingTime={fetchTime} loadingTimeName={'Fetch time'} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    )
}
