import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Link from 'next/link'
import {Page} from '@/types/Page'

type MobileNavigationProps = {
    pages: Page[]
    openState: boolean,
    changeOpenState: any
}

export default function MobileNavigation({ pages, openState, changeOpenState }: MobileNavigationProps) {

    const doChangeOpenState = () => {
        changeOpenState(!openState)
    }

    return (
            <Transition.Root show={openState} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={doChangeOpenState}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={doChangeOpenState}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        <div  className="flow-root">
                                            <Link href="/about" className="-m-2 block p-2 font-medium text-gray-900">
                                                Om projektet
                                            </Link>
                                        </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
    );
}
