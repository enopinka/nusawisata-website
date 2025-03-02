import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <AppLayout>
                {/* hero section */}
                <section>
                    <div className="relative h-[680px] bg-[url('/images/hero.jpg')] bg-center bg-cover w-full border border-black overflow-hidden flex items-end">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gray-700/30"></div>

                        {/* Konten */}
                        <div className="relative font-montserrat text-white text-[70px] font-bold mx-8 flex flex-col mb-10">
                            <p>Lorem ipsum</p>
                            <p>dolor sit amet minim!</p>
                        </div>
                    </div>
                </section>

                {/* blogs section */}
                <section className="h-full w-full bg-custom-cream">
                    <div className="mx-8 py-16 h-full grid grid-cols-2 md:grid-cols-4 gap-4 ">
                        <div className="grid gap-4">
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>

                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                            <div className="relative group">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* service section */}
                <section className="bg-custom-blue h-[800px]">
                    <div className="text-white mx-8 py-16">
                        <p className="font-montserrat text-[48px] font-extrabold">
                            Layanan perjalanan
                        </p>
                        <p className="font-montserrat text-[48px] font-extrabold">
                            terfavorit
                        </p>
                        <p className="font-jost text-[24px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit!
                        </p>
                    </div>
                    <div className="flex gap-6 mx-8">
                        <Card className="bg-custom-cream h-72">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>
                                    Card Description
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Obcaecati nulla eligendi
                                    recusandae at impedit tenetur similique
                                    commodi quae consequatur, placeat porro,
                                    quasi id, omnis autem.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-custom-cream h-72">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>
                                    Card Description
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Obcaecati nulla eligendi
                                    recusandae at impedit tenetur similique
                                    commodi quae consequatur, placeat porro,
                                    quasi id, omnis autem.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-custom-cream h-72">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>
                                    Card Description
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Obcaecati nulla eligendi
                                    recusandae at impedit tenetur similique
                                    commodi quae consequatur, placeat porro,
                                    quasi id, omnis autem.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="font-montserrat font-extrabold text-[24px] text-white my-12 mx-8 flex justify-end">
                        <p>Lihat lainnya</p>
                    </div>
                </section>
                {/* apalah section */}
                <section className="h-[800px] bg-custom-blue ">
                    <div className="flex text-white mx-8 py-16 justify-around">
                        <div className="w-3/5">
                            <div className="font-montserrat text-[48px] font-extrabold mb-8">
                                <p>Mulai Perjalananmu</p>
                                <p>Bersama Kami</p>
                            </div>
                            <div className="font-jost text-[24px] font-medium text-custom-cream">
                                <p className="">
                                    Lorem ipsum odor amet, consectetuer
                                    adipiscing elit. Amet at est lacinia amet
                                    habitasse potenti duis lacus. Ridiculus
                                    vulputate ante lectus elit elementum neque
                                    laoreet placerat. Vulputate orci dapibus
                                    lacus interdum aliquet imperdiet sociosqu. 
                                </p>
                                <ol className="list-decimal ml-8">
                                    <li>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Quas, delectus? Error
                                        modi sunt nihil fugiat?
                                    </li>
                                    <li>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Eum dicta eius ducimus
                                        eveniet dolorum illo?
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="w-1/4 ">
                            <img
                                src="images/basa-basi.jpg"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </section>
                {/* apalah lagi section */}
                <section className="h-screen bg-custom-cream"></section>
                {/* footer */}
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
            </AppLayout>
        </>
    );
}
