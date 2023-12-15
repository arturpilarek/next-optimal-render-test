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

        const end = performance.now();
        const fetchTime = (end - start) / 1000;

        return {
            props: {
                products: fetchedProducts,
                serverFetchTime: fetchTime.toFixed(2)
            }
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        return { props: { products: [], serverFetchTime: 0 } };
    }
}

export default function ServerSideRenderingMethod({ products, serverFetchTime }: SSRMethodTestingProps) {
    // Dette er fordi productData er klar på clienten, når siden er loaded
    const clientProductDataReadyTime = 0

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
                        <h4>Husk at tømme cache</h4>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Server-Side Rendering Method</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Server-Side Rendering (SSR) i Next.js genererer hver side dynamisk ved serveranmodning, hvilket sikrer aktuelt indhold og stærk SEO. SSR er ideelt til sider, der kræver hyppige opdateringer eller har bruger-specifikt indhold.
                        </p>
                    </div>
                    <div>
                        <StatsBar products={products} loadingTime={serverFetchTime} loadingTimeName={'Server fetch time'} clientProductDataReadyTime={clientProductDataReadyTime} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    );
}
