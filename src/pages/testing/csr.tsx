import {useEffect, useState} from 'react';
import ProductList from "@/components/category/ProductList";
import StatsBar from "@/components/category/StatsBar";
import { Product } from '@/types/Product';

export default function FetchMethodTesting() {
    const [products, setProducts] = useState<Product[]>([]);
    const [fetchTime, setFetchTime] = useState<number | null>(null);

    const fetchProductFromAWS = async () => {

        const apiURL = process.env.NEXT_PUBLIC_AWS_API_ENDPOINT;
        const start = performance.now();

        try {
            const response = await fetch(apiURL as string);
            const { body } = await response.json();
            const fetchedProducts: Product[] = JSON.parse(body);

            setProducts(fetchedProducts);

            const end = performance.now();
            setFetchTime(end - start);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProductFromAWS().then(() => console.log('Products fetched'))
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
