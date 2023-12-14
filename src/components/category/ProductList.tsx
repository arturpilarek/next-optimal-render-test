import {Product} from "@/types/Product";
import ProductCard from "./ProductCard";

type ProductListProps = {
    products: Product[];
};

export default function ProductList({ products }: ProductListProps) {

    return (
        <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">
                Products
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map((product) => (
                    <ProductCard product={product} key={product.ProductId} />
                ))}
            </div>
        </section>
    );
}
