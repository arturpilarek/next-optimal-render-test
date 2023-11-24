import TheHeader from "@/components/header/TheHeader";
import TheFooter from "@/components/footer/TheFooter";

type MainLayoutProps = {
    children: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps) {

    return (
        <>
            <TheHeader />
            <main className="bg-white min-h-screen-85">{children}</main>
            <TheFooter />
        </>
    );
}
