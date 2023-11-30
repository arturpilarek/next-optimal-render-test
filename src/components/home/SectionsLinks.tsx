import {ArrowLongRightIcon, ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon} from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Fetch',
        description:
            'Client-side fetch anvender browserens native fetch API til at anmode om og modtage data efter siden er indlæst. Denne metode er nyttig for dynamisk indhold, der kræver opdateringer efter brugerinteraktioner, men kan have indflydelse på initial loadtid og SEO.',
        href: '/testing/fetch',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'Static Generation',
        description:
            'Static Site Generation (SSG) i Next.js genererer HTML ved build-tid. Det resulterer i hurtigere loadtider og forbedret SEO, da indholdet er klar, når brugeren anmoder om siden. SSG er bedst til sider, der ikke kræver hyppige opdateringer.',
        href: '#',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'SSR',
        description:
            'Server-Side Rendering (SSR) behandler HTML på serveren for hver brugeranmodning. Det sikrer, at brugerne modtager opdateret indhold, men kan øge serverbelastningen og forlænge loadtider sammenlignet med statiske metoder.',
        href: '/testing/ssr',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'SSR + hydration',
        description:
            'SSR med hydration kombinerer server-side genereret HTML med client-side JavaScript. Det giver en fuldt renderet side til brugeren med efterfølgende interaktivitet gennem Reacts hydration proces, hvilket gør siden interaktiv.',
        href: '#',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'ISR',
        description:
            'Incremental Static Regeneration (ISR) tillader sider at blive genereret statisk som med SSG, men med mulighed for at regenerere sider efter en bestemt tidsperiode. Det giver en balance mellem fast indhold og dynamisk opdatering.',
        href: '#',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'Dynamic Import med CSR',
        description:
            'Dynamic Import i kombination med Client-Side Rendering (CSR) gør det muligt at indlæse JavaScript-moduler og data dynamisk. Det reducerer den initial loadtid ved at anmode om ressourcer kun, når de er nødvendige.',
        href: '#',
        icon: ArrowLongRightIcon,
    },
    {
        name: 'GraphQL Queries',
        description:
            'Brugen af GraphQL-forespørgsler giver en mere finjusteret kontrol over datamængder og strukturer, som hentes fra serveren. Det reducerer unødvendig dataload og kan forbedre performance, især i komplekse applikationer med mange datakilder.',
        href: '#',
        icon: ArrowLongRightIcon,
    },
]


export default function SectionsLinks() {
    return (
        <div className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Dybdegående Analyse af Renderingmetoder
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Denne sektion giver en detaljeret gennemgang af forskellige renderingmetoder og deres indflydelse på webapplikationers performance. Fra traditionel client-side rendering til avancerede server-side teknikker, udforsk hvordan hver tilgang kan optimeres for at forbedre brugeroplevelsen på e-commerce platforme.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                    <p className="mt-6">
                                        <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                                            Learn more <span aria-hidden="true">→</span>
                                        </a>
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
