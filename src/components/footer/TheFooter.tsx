import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.webp";

export default function TheFooter() {
    return (
        <footer className="bg-primary-blue" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-8 lg:px-8">
                    <div>
                        {/*<Link href="/">*/}
                        {/*    <Image*/}
                        {/*        src={logo}*/}
                        {/*        alt="Project logo"*/}
                        {/*        width={65}*/}
                        {/*        height={65}*/}
                        {/*    />*/}
                        {/*</Link>*/}
                        <p className="text-sm leading-6 text-white">
                            Making the world a better place through constructing elegant hierarchies.
                        </p>
                    </div>
            </div>
        </footer>
    )
}
