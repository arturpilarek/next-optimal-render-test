import Link from "next/link";
import {Bars3Icon} from "@heroicons/react/24/outline";
import { Page } from "../../../types/Page";
import logo from "../../../public/logo.webp";
import Image from "next/image";

type DesktopNavigationProps = {
    pages: Page[],
    openState: boolean,
    changeOpenState: any
}

export default function DesktopNavigation({pages, openState, changeOpenState}: DesktopNavigationProps) {

    const doChangeOpenState = () => {
        changeOpenState(!openState)
    }

    return (
        <div className="relative bg-gray-900">
            <header className="relative z-10">
                <nav aria-label="Top">
                    <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div>
                                <div className="flex h-16 items-center justify-between">

                                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                        <Link href="/">
                                            <span className="sr-only">Project&apos;s logo</span>
                                            <Image
                                                src={logo}
                                                alt="Project logo"
                                                width={65}
                                                height={65}
                                            />
                                        </Link>
                                    </div>

                                    <div className="hidden h-full lg:flex">
                                        {/* Flyout menus */}
                                        <div className="flex h-full justify-center space-x-8">
                                            {pages.map((page) => (
                                                <Link
                                                    key={page.name}
                                                    href={page.href}
                                                    prefetch={false}
                                                    className="flex items-center text-sm font-medium text-white"
                                                >
                                                    {page.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button type="button" className="-ml-2 p-2 text-white" onClick={doChangeOpenState}>
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <Link href="/" className="lg:hidden">
                                            <span className="sr-only">Project&apos;s logo</span>
                                            <Image
                                                src={logo}
                                                alt="Project logo"
                                                width={65}
                                                height={65}
                                            />
                                    </Link>

                                    <div className="flex flex-1 items-center justify-end">
                                        <Link href="/about" className="hidden text-sm font-medium text-white lg:block">
                                            Om projektet
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
