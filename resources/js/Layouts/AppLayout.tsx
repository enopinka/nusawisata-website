import { Button } from "@/Components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/Components/ui/navigation-menu";
import { Link } from "@inertiajs/react";
import React from "react";

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
            <div className="bg-custom-blue bg-opacity-75 h-16 w-full fixed top-0 shadow-md z-50 backdrop-blur ">
                <div className="flex justify-between items-center h-16 container">
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
                    <ul className="flex gap-4">
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
                                                                childIndex,
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
                                                            ),
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
                </div>
            </div>

            {/* content */}
            <div className="-mt-16 relative z-0">
                {/* children */}
                {children}
            </div>

            <footer className="h-60 bg-custom-blue text-white relative">
                <div className="flex justify-between mx-8 py-8 relative">
                    <div className="">
                        <div className="absolute bottom-4 font-montserrat font-bold text-[40px] text-custom-cream flex flex-col">
                            <p>PRATAMA</p>
                            <p>NUSA WISATA</p>
                        </div>
                    </div>
                    <div className="flex gap-16">
                        <div className="space-y-8 font-jost text-[20px] font-semibold">
                            <p>Hubungi Kami:</p>

                            <div>
                                <p>email@gmail.com</p>
                                <p>+628123456789</p>
                                <p>@instagram</p>
                            </div>
                        </div>
                        <div className="space-y-8 font-jost text-[20px] font-semibold">
                            <p>Hubungi Kami:</p>

                            <div>
                                <p>email@gmail.com</p>
                                <p>+628123456789</p>
                                <p>@instagram</p>
                            </div>
                        </div>
                        <div className="space-y-8 font-jost text-[20px] font-semibold">
                            <p>Hubungi Kami:</p>

                            <div>
                                <p>email@gmail.com</p>
                                <p>+628123456789</p>
                                <p>@instagram</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mx-8" />
            </footer>
        </>
    );
}
