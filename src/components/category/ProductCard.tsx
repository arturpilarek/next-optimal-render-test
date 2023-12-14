import {Product} from "@/types/Product";
import Image from "next/image";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {

    return (
                    <div
                        key={product.ProductId}
                        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                            <Image
                                src={product.ImageURL}
                                alt={product.ProductTitle}
                                width={306}
                                height={384}
                                fetchPriority='high'
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
    );
}
