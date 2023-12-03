
import { useState } from 'react'
import MobileNavigation from "@/components/header/MobileNavigation";
import DesktopNavigation from "@/components/header/DesktopNavigation";
const navigation = {
    pages: [
        { name: 'Fetch', href: '/testing/fetch' },
        { name: 'Static Generation', href: '/testing/ssg' },
        { name: 'SSR', href: '/testing/ssr' },
        { name: 'ISR', href: '/testing/isr' },
        { name: 'Dynamic Import med CSR', href: '#' },
        { name: 'Graphql Queries', href: '#' },
    ],
}

export default function TheHeader() {

    const [open, setOpen] = useState(false)

    const setNavigationOpen = (data : boolean) => {
        setOpen(data)
    }

    return (
        <div className="bg-white">
            <MobileNavigation pages={navigation.pages} openState={open} changeOpenState={setNavigationOpen} />
            <DesktopNavigation pages={navigation.pages} openState={open} changeOpenState={setNavigationOpen} />
        </div>
    );
}
