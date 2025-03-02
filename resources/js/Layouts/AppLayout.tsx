import { Link } from "@inertiajs/react";
import React from "react";

export default function App({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* navbar aplikasi */}
            <div>
                <div className="bg-custom-blue bg-opacity-75 h-16 flex justify-between items-center sticky top-0 shadow-md z-50">
                    <div className="mx-4 flex gap-2 items-center">
                        <div className="w-14 h-14 relative">
                            <img src="/images/logo.png" alt="logo" />
                        </div>
                        <div className="text-custom-cream font-montserrat font-bold leading-tight">
                            <p>PRATAMA</p>
                            <p>NUSA WISATA</p>
                        </div>
                    </div>
                    <div>
                        <ul className="w-full flex gap-4 font-jost text-custom-cream mx-4">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link href="/tour-package">Paket Wisata</Link>
                            </li>
                            <li>
                                <Link href="/rental">Sewa Kendaraan</Link>
                            </li>
                            <li>
                                <Link href="/portfolio">Portfolio</Link>
                            </li>
                            <li>
                                <Link href="/about">Tentang Kami</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="-mt-16 relative z-0">
                    {/* children */}
                    {children}
                </div>
            </div>
        </>
    );
}
