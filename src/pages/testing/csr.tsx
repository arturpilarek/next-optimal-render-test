import {useEffect, useState} from 'react';
import ProductList from "@/components/category/ProductList";
import StatsBar from "@/components/category/StatsBar";
import { Product } from '@/types/Product';

export default function ClientSideRenderingMethod() {
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
            setFetchTime(((end - start) / 1000))
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProductFromAWS().then(() => console.log('Products fetched'))
    }, []);

    const convertedFetchTime = fetchTime !== null ? parseFloat(fetchTime.toFixed(2)) : fetchTime;

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
                        <h4>Husk at tømme cache</h4>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Client-side rendering method</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Client-Side Rendering (CSR) betyder, at webindholdet genereres i brugerens browser ved hjælp af JavaScript. Denne tilgang henter data og opdaterer UI dynamisk, hvilket er ideelt for interaktive applikationer. CSR kan dog forlænge den oprindelige indlæsningstid og påvirke SEO, da søgemaskiner har sværere ved at indeksere indhold, der genereres klient-side.
                        </p>
                    </div>
                    <div>
                        <StatsBar products={products} loadingTime={convertedFetchTime} loadingTimeName={'Fetch time'} clientProductDataReadyTime={convertedFetchTime} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    )
}
