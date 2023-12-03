import { GetServerSideProps } from 'next';
import StatsBar from "@/components/category/StatsBar";
import { Product } from '@/types/Product';
import ProductList from "@/components/category/ProductList";

type SSRMethodTestingProps = {
    products: Product[];
    serverFetchTime: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
    const start = performance.now();

    const apiURL = process.env.NEXT_PUBLIC_AWS_API_ENDPOINT;

    try {
        const response = await fetch(apiURL as string);
        const { body } = await response.json();
        const fetchedProducts: Product[] = JSON.parse(body);

        const updatedProducts = fetchedProducts.map(product => ({
            ...product,
            ModifiedImageURL: `${product.ImageURL}?v=${Math.floor(Math.random() * 1000)}`
        }));

        const end = performance.now();
        const fetchTime = end - start;

        return {
            props: {
                products: updatedProducts,
                serverFetchTime: fetchTime.toFixed(2)
            }
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        return { props: { products: [], serverFetchTime: 0 } };
    }
}

export default function SSRMethodTesting({ products, serverFetchTime }: SSRMethodTestingProps) {

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
                        <StatsBar products={products} loadingTime={serverFetchTime} loadingTimeName={'Server fetch time'} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    );
}
