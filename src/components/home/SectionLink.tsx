import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { SectionLink } from '@/types/SectionLink'
import { IconEnum } from '@/types/IconEnum'

type SectionLinkProps = {
    sectionLink: SectionLink;
}

const iconComponents = {
    [IconEnum.ARROW_RIGHT]: ArrowLongRightIcon,
}

export default function SectionLink({ sectionLink }: SectionLinkProps) {
    const IconComponent = iconComponents[sectionLink.icon];

    return (
            <div key={sectionLink.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <IconComponent className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {sectionLink.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{sectionLink.description}</p>
                    <p className="mt-6">
                        <a href={sectionLink.href} className="text-sm font-semibold leading-6 text-indigo-600">
                            Undersøg <span aria-hidden="true">→</span>
                        </a>
                    </p>
                </dd>
            </div>
    )
}
