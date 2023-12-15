import { GetStaticProps } from 'next';
import StatsBar from "@/components/category/StatsBar";
import ProductList from "@/components/category/ProductList";
import { Product } from '@/types/Product';

type StaticGenerationMethodProps = {
    products: Product[],
    buildTime: number
}

export const getStaticProps: GetStaticProps = async () => {
    const start = performance.now();

    const apiURL = process.env.NEXT_PUBLIC_AWS_API_ENDPOINT;

    try {
        const response = await fetch(apiURL as string);
        const { body } = await response.json();
        const fetchedProducts: Product[] = JSON.parse(body);

        const end = performance.now();
        const buildTime = (end - start) / 1000;

        return {
            props: {
                products: fetchedProducts,
                buildTime: buildTime.toFixed(2)
            }
        };
    } catch (err) {
        console.error('Error fetching products:', err);
        return { props: { products: [], buildTime: 0 } };
    }
}

export default function StaticGenerationMethod({ products, buildTime }: StaticGenerationMethodProps) {
    // Dette er fordi productData er klar på clienten, når siden er loaded
    const clientProductDataReadyTime = 0

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                    <div className="border-b border-gray-200 pb-10 pt-24">
                        <h4>Husk at tømme cache</h4>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Static Site Generation Method</h1>
                        <p className="mt-4 text-base text-gray-500">
                            Static Site Generation (SSG) er en metode, hvor sider genereres på byggetidspunktet. Dette betyder, at alle brugere får serveret den samme statiske fil, hvilket kan resultere i hurtigere loadtider og bedre SEO, da indholdet er klar, når søgemaskiner crawler siden. Det er især effektivt for indhold, der ikke ændrer sig ofte, men kan også understøtte dynamiske data gennem inkrementel regenerering.
                        </p>

                    </div>
                    <div>
                        <StatsBar products={products} loadingTime={buildTime} loadingTimeName={'Build time'} clientProductDataReadyTime={clientProductDataReadyTime} />
                    </div>
                    <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                        <ProductList products={products} />
                    </div>
                </main>
            </div>
        </div>
    );
}
