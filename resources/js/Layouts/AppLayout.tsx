import { Link } from "@inertiajs/react";
import React from "react";

export default function App({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* navbar aplikasi */}
            <div>
                <ul className="w-full flex gap-4">
                    <li>
                        <Link href="/" className="text-blue-800">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-blue-800">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="/tour-package" className="text-blue-800">
                            Paket Wisata
                        </Link>
                    </li>
                    <li>
                        <Link href="/rental" className="text-blue-800">
                            Sewa Kendaraan
                        </Link>
                    </li>
                    <li>
                        <Link href="/portfolio" className="text-blue-800">
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-blue-800">
                            Tentang Kami
                        </Link>
                    </li>
                </ul>
            </div>
            {/* children */}
            {children}
        </>
    );
}
