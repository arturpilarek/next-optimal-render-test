import Link from "next/link";
import Image from "next/image";

type HeroBannerProps = {}

export default function HeroBanner({}: HeroBannerProps) {

    return (
        <div className="relative bg-gray-900">
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1609773335024-be4301497ea9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Project Hero Image"
                    width="1725"
                    height="1063"
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />
            {/* AI-inspireret indhold, tilpasset af forfatter */}
            <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">Test af forskellige renderingsmetoder</h1>
                <p className="mt-4 text-xl text-white">
                    Udforsk, hvordan valget af renderingmetode - CSR, SSR, SSG eller ISR - påvirker indlæsning af produkter på e-commerce hjemmesider. Gennem denne test analyserer vi de forskellige tilgange og deres effekt på indlæsningstider på kategorisider.
                </p>
                <Link
                    href="/about"
                    className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                    Læs Mere
                </Link>
            </div>
        </div>
    );
}
