import { Link } from "@inertiajs/react";
import React from "react";

export default function App({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* navbar aplikasi */}
            <div className="overflow-x-hidden">
                <div className=" bg-custom-blue  h-16 flex justify-between items-center">
                    <div className="mx-4 flex gap-2 items-center">
                        <div className="w-14 h-14 relative">
                            <img src="/images/logo.png" alt="logo" />
                        </div>
                        <div className="text-custom-cream font-montserrat font-bold">
                            <p>PRATAMA</p>
                            <p>NUSA WISATA</p>
                        </div>
                    </div>
                    <div>
                        <ul className="w-full flex gap-4 font-jost text-custom-cream mx-4">
                            <li>
                                <Link href="/" className="">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/tour-package" className="">
                                    Paket Wisata
                                </Link>
                            </li>
                            <li>
                                <Link href="/rental" className="">
                                    Sewa Kendaraan
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="">
                                    Tentang Kami
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* children */}
                {children}
            </div>
        </>
    );
}
