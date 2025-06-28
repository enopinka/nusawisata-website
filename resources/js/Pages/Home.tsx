import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

type Blog = {
    id: number;
    title: string;
};

type BlogsProps = {
    blogs: Blog[];
};

export default function Home({ blogs }: BlogsProps) {
    console.log(blogs);
    return (
        <>
            <AppLayout>
                {/* hero section */}

                <section className="mt-20 bg-custom-cream">
                    <div className="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-16 flex flex-col items-center gap-10">
                        <div className="w-full">
                            <img src="/images/hero.jpg" alt="Hero" className="rounded-2xl w-full h-96 md:h-[480px] object-cover shadow-lg" />
                        </div>
                        <div className="w-full text-left lg:text-left">
                            <h1 className="mt-12 text-4xl md:text-5xl font-extrabold font-montserrat text-custom-blue leading-snug">
                                Jajah Setiap Sudut Nusantara<br />Bersama <span className="text-blue-900">Nusawisata!</span>
                            </h1>
                            <p className="mt-4 text-gray-700 text-base md:text-lg font-jost max-w-3xl mx-auto lg:mx-0">
                                Temukan momen-momen unik dan permata tersembunyi di berbagai penjuru Nusantara yang menghadirkan pengalaman tak terlupakan.
                            </p>
                        </div>
                       
                        <div className="my-8 w-full flex flex-col lg:flex-row gap-8">
                            {/* Gambar di kiri */}
                            <div className="w-full lg:w-2/5 flex mb-6 lg:mb-0">
                                <img
                                    src="/images/basa-basi.jpg"
                                    className="rounded-lg w-full max-w-sm h-[360px] object-cover shadow-lg"
                                    alt="Ilustrasi perjalanan"
                                />
                            </div>
                            {/* Konten di kanan */}
                            <div className="w-full lg:w-3/5 flex flex-col justify-start ">
                                <div className="font-montserrat text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                    <p>Mulai Perjalananmu</p>
                                    <p>Bersama Kami</p>
                                </div>
                                <div className="font-jost text-base md:text-lg text-justify text-custom-blue space-y-4">
                                    <p>
                                        Lorem ipsum odor amet, consectetuer adipiscing elit. Amet at est lacinia amet
                                        habitasse potenti duis lacus. Ridiculus vulputate ante lectus elit elementum neque
                                        laoreet placerat. Vulputate orci dapibus lacus interdum aliquet imperdiet sociosqu.
                                    </p>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </section>
                {/* blogs section */}
                <section className="bg-custom-cream">
                    <div className="bg-custom-blue max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-8">
                        <div className="space-y-4">
                            <h2 className="font-montserrat mt-4 text-3xl text-custom-cream font-extrabold">Blog Kami</h2>
                            <p className="font-jost text-lg text-custom-cream">
                                Temukan berbagai artikel informatif, tips perjalanan, dan cerita seru seputar destinasi wisata terbaik dari kami.
                            </p>
                        </div>
                        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {blogs.slice(0, 3).map((blog) => (
                                <div key={blog.id} className="relative group rounded-lg overflow-hidden">
                                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" className="w-full h-64 object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-40 transition duration-300"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                                        <h3 className="text-xl font-bold">{blog.title}</h3>
                                        <p className="text-sm">
                                            (Deskripsi placeholder)
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/blog" className="flex justify-end items-center gap-2 text-custom-cream font-semibold hover:underline mt-6">
                            <span>Lihat Lainnya</span>
                            <ChevronRight />
                        </Link>
                    </div>
                </section>

                {/* service section */}
                <section className="bg-custom-cream">
                    <div className="bg-custom-blue container  px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8">
                        <div className="text-custom-cream space-y-4 my-8">
                            <div>
                                <p className="font-montserrat text-3xl font-extrabold">
                                    Layanan perjalanan
                                </p>
                                <p className="font-montserrat text-3xl font-extrabold">
                                    terfavorit
                                </p>
                            </div>
                            <p className="font-jost text-lg">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit!
                            </p>
                        </div>
                        <div className="flex gap-6 my-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Card
                                    key={index}
                                    className="bg-custom-cream h-72 flex flex-col"
                                >
                                    <CardHeader>
                                        <CardTitle className="truncate">Card Title</CardTitle>
                                        <CardDescription className="truncate">
                                            Card Description
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <p className="line-clamp-3">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nulla eligendi recusandae at impedit tenetur similique commodi quae consequatur, placeat porro, quasi id, omnis autem.
                                        </p>
                                        <Link
                                            href="#"
                                            className="mt-2 text-blue-700 hover:underline self-start text-sm"
                                        >
                                            Lihat selengkapnya
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Link
                            href="/tour-package"
                            className="w-full flex justify-end items-center gap-1 hover:underline text-custom-cream"
                        >
                            <p className="text-xl text-right font-semibold font-jost flex">
                                Lihat Lainnya
                            </p>
                            <div className="">
                                <ChevronRight size={24} />
                            </div>
                        </Link>
                    </div>
                </section>
                <section className=" bg-custom-cream">
                    <div className="container  px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-8">
                        <div className="space-y-4">
                            {" "}
                            <p className="mt-12 font-montserrat text-3xl text-custom-blue font-extrabold">
                                Sewa Kendaraan
                            </p>
                            <p className="font-jost  text-custom-blue text-lg">
                                Nikmati kemudahan perjalanan dengan layanan sewa
                                kendaraan kami—beragam pilihan armada untuk
                                setiap kebutuhan Anda.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row my-8 gap-6">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Card
                                    key={index}
                                    className="bg-custom-blue rounded-2xl w-full sm:w-1/2 p-6 mx-auto flex flex-col items-center"
                                >
                                    <img
                                        src="/images/bus.jpeg"
                                        className="rounded-xl w-full h-48 object-cover mb-4"
                                        alt="Bus Nyaman"
                                    />
                                    <CardContent className="text-custom-cream w-full flex flex-col items-center">
                                        <CardTitle className="my-6 font-bold text-center">
                                            Bus Nyaman
                                        </CardTitle>
                                        <p className="text-justify">
                                            Bus nyaman dengan kapasitas 30–45 penumpang, dilengkapi AC, reclining seat, audio video, dan bagasi luas. Cocok untuk perjalanan wisata rombongan.
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Link
                            href="/rental"
                            className="w-full flex justify-end items-center gap-1 hover:underline"
                        >
                            <p className="text-xl text-right font-semibold font-jost flex">
                                Lihat Lainnya
                            </p>
                            <div className="">
                                <ChevronRight size={24} />
                            </div>
                        </Link>
                    </div>
                </section>
                {/* apalah section */}
                <section
                    className="relative py-16"
                    style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div
                        className="absolute inset-0 bg-black opacity-50 z-0"
                        aria-hidden="true"
                    />
                    <div className="relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 text-white">
                        {/* Konten Teks */}
                        <div className="w-full lg:w-3/5">
                            <div className="font-montserrat text-4xl md:text-5xl font-extrabold mb-10 mt-10 leading-tight">
                                <p>Ayo mulai petualanganmu sekarang!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* apalah lagi section */}

                {/* footer */}
            </AppLayout>
        </>
    );
}
