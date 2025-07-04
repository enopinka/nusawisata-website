import { Button } from "@/Components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/Components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import { Facebook, FacebookIcon, InstagramIcon, MenuIcon } from "lucide-react";
import React from "react";
import { FiFacebook, FiInstagram, FiWatch } from "react-icons/fi";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

const menus = [
    { title: "Blogs", href: "/blog" },
    {
        title: "Layanan",
        children: [
            { title: "Paket Wisata", href: "/tour-package" },
            { title: "Sewa Kendaraan", href: "/rental" },
        ],
    },
    { title: "Portofolio", href: "/portfolio" },
    { title: "Tentang Kami", href: "/about" },
];

export default function App({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {/* navbar aplikasi */}
            <div className="bg-custom-blue h-16 w-screen fixed top-0 shadow-md z-50 ">
                <div className="flex justify-between items-center h-16 container ">
                    <Link href="/" className="flex gap-2 items-center">
                        <img
                            src="/images/logo.png"
                            className="size-12"
                            alt="logo"
                        />
                        <div className="text-custom-cream font-montserrat font-bold leading-tight text-sm">
                            <p>PRATAMA</p>
                            <p>NUSA WISATA</p>
                        </div>
                    </Link>
                    <ul className="sm:flex gap-4 hidden">
                        {menus.map((menu, index) => {
                            if (menu.children) {
                                return (
                                    <NavigationMenu
                                        key={"menu-dropdown-" + index}
                                    >
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger className="text-custom-cream font-jost bg-transparent hover:bg-none hover:underline">
                                                    {menu.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="bg-white rounded-md shadow-lg p-4 border ">
                                                    <ul className="flex flex-col gap-2 w-36">
                                                        {menu.children.map(
                                                            (
                                                                child,
                                                                childIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        "menu-sub-" +
                                                                        childIndex
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            child.href
                                                                        }
                                                                        className=" text-gray-700 hover:text-gray-900  hover:underline"
                                                                    >
                                                                        {
                                                                            child.title
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                );
                            } else {
                                return (
                                    <li key={"menu-item-" + index}>
                                        <Button
                                            asChild
                                            variant={"link"}
                                            className="text-custom-cream font-jost px-0"
                                        >
                                            <Link href={menu.href}>
                                                {menu.title}
                                            </Link>
                                        </Button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <MenuIcon className="text-white" />
                            </SheetTrigger>
                            <SheetContent>
                                <ul>
                                    {menus.map((menu, index) =>
                                        menu.children ? (
                                            <li key={`menu-item-${index}`}>
                                                <p className="px-4 py-2 font-semibold text-gray-800">
                                                    {menu.title}
                                                </p>
                                                <ul className="pl-6">
                                                    {menu.children.map(
                                                        (child, childIndex) => (
                                                            <li
                                                                key={`menu-sub-${childIndex}`}
                                                            >
                                                                <Link
                                                                    href={
                                                                        child.href
                                                                    }
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    {
                                                                        child.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        ) : (
                                            <li key={`menu-item-${index}`}>
                                                <Link
                                                    href={menu.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {menu.title}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="-mt-16 relative z-0 w-full">
                {/* children */}
                {children}
                <a
                    href="https://wa.me/6282220358706"
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-16 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp size={28} />
                </a>
            </div>

            <footer className=" bg-custom-blue text-white relative w-full h-auto py-4">
                <div className="flex flex-col sm:flex-row justify-between gap-8 py-8 container mx-auto relative">
                    <div className="sm:static relative text-center sm:text-left">
                        <div className="font-montserrat font-bold text-[32px] sm:text-[40px] text-custom-cream flex flex-col">
                            <p>PRATAMA</p>
                            <p>NUSA WISATA</p>
                        </div>
                    </div>
                    <hr className="mx-8 sm:hidden block" />

                    <div className="flex flex-col gap-4 text-white font-jost">
                        <div className="text-center sm:text-left">
                            <h4 className="font-semibold mb-2 text-base sm:text-lg">
                                Alamat
                            </h4>
                            <p>Jl. Kedu Gang 1,</p>
                            <p>Kecamatan Kedu, Kabupaten Temanggung</p>
                            <p>Jawa Tengah, Indonesia</p>
                        </div>

                        <div className="flex gap-4 mt-2 sm:justify-start justify-center">
                            <a
                                href="https://www.instagram.com/akhmad_mualiff?igsh=dDFjbnkxaG1ia3Bi"
                                className="flex items-center justify-center bg-slate-500 w-8 h-8 rounded-full"
                                target="_blank"
                            >
                                <FiInstagram size={20} className="text-white" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@pratama_nusa_wisata?_t=ZS-8xkYIgAdfNg&_r=1"
                                className="flex items-center justify-center bg-slate-500 w-8 h-8 rounded-full"
                                target="_blank"
                            >
                                <FaTiktok size={20} className="text-white" />
                            </a>
                            <a
                                href="https://wa.me/6282220358706"
                                className="flex items-center justify-center bg-slate-500 w-8 h-8 rounded-full"
                                target="_blank"
                            >
                                <FaWhatsapp size={20} className="text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="mx-8 sm:block hidden" />
            </footer>
        </>
    );
}
