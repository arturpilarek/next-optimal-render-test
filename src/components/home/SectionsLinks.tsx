import { IconEnum } from '@/types/IconEnum'
import SectionLink from './SectionLink'

const sectionLinks = [
    {
        name: 'Client Side Rendering',
        description:
            'Client-side fetch anvender browserens native fetch API til at anmode om og modtage data efter siden er indlæst. Denne metode er nyttig for dynamisk indhold, der kræver opdateringer efter brugerinteraktioner, men kan have indflydelse på initial loadtid og SEO.',
        href: '/testing/csr',
        icon: IconEnum.ARROW_RIGHT,
    },
    {
        name: 'SSR',
        description:
            'Server-Side Rendering (SSR) behandler HTML på serveren for hver brugeranmodning. Det sikrer, at brugerne modtager opdateret indhold, men kan øge serverbelastningen og forlænge loadtider sammenlignet med statiske metoder.',
        href: '/testing/ssr',
        icon: IconEnum.ARROW_RIGHT,
    },
    {
        name: 'Static Generation',
        description:
            'Static Site Generation (SSG) i Next.js genererer HTML ved build-tid. Det resulterer i hurtigere loadtider og forbedret SEO, da indholdet er klar, når brugeren anmoder om siden. SSG er bedst til sider, der ikke kræver hyppige opdateringer.',
        href: '#',
        icon: IconEnum.ARROW_RIGHT,
    },
    {
        name: 'ISR',
        description:
            'Incremental Static Regeneration (ISR) tillader sider at blive genereret statisk som med SSG, men med mulighed for at regenerere sider efter en bestemt tidsperiode. Det giver en balance mellem fast indhold og dynamisk opdatering.',
        href: '#',
        icon: IconEnum.ARROW_RIGHT,
    }
]


export default function SectionsLinks() {
    return (
        <div className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tilgængelige testmetoder
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {sectionLinks.map((sectionLink) => (
                            <SectionLink sectionLink={sectionLink} key={sectionLink.name} />
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
