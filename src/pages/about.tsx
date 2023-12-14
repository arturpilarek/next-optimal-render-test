import SectionsLinks from "@/components/home/SectionsLinks";
import Image from 'next/image';

export default function About() {

    return (
            <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-16 lg:px-8 lg:pt-32">
                <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Om projektet</h2>
                        <div className="mt-6 flex flex-col-reverse gap-x-8 gap-y-8 lg:gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                {/* AI-inspireret indhold, tilpasset af forfatter */}
                                <p className="text-xl leading-8 text-gray-600">
                                    Dette projekt undersøger, hvordan valget af renderingsmetoder påvirker ydeevnen på e-commerce hjemmesider. Ved at sammenligne forskellige moderne renderingsmetoder, undersøges deres indflydelse på indlæsningstider og den generelle performance af kategorisider. Ifølge Baymard Institute var Cart Abandonment Rate for online shopping 70.19% i 2023. Dette høje tal kan delvist tilskrives langsomme og buggy e-commerce sites. Derfor er denne undersøgelse vigtig for at identificere effektive teknikker, der kan forbedre brugeroplevelsen og øge effektiviteten af e-commerce hjemmesider.
                                </p>
                            </div>
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <Image src="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Next.js logo" width={400} height={250} className="w-full rounded-xl object-cover shadow-lg" />
                            </div>
                    </div>
                </div>
                <SectionsLinks />
            </div>
    )
}
