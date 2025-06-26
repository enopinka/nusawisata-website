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

                <section>
                    <div className="relative h-screen bg-[url('/images/hero.jpg')] bg-center bg-cover w-full  border-black overflow-hidden flex items-end">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gray-700/30"></div>

                        {/* Konten */}
                        <div className="relative font-montserrat text-white text-[70px] font-bold mx-8 flex flex-col mb-10 container">
                            <p>Jajah Setiap Sudut Nusantara</p>
                            <p>Bersama Nusawisata!</p>
                        </div>
                    </div>
                </section>

                {/* blogs section */}
                <section className="h-full w-full bg-custom-cream">
                    <div className="max-w-6xl mx-auto py-8">
                        <div className="space-y-4">
                            <p className="font-montserrat text-3xl text-custom-blue font-extrabold">
                                Blog Kami
                            </p>
                            <p className="font-jost  text-custom-blue text-lg">
                                Temukan berbagai artikel informatif, tips
                                perjalanan, dan cerita seru seputar destinasi
                                wisata terbaik dari kami.
                            </p>
                        </div>
                        <div className="py-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="relative group rounded-lg overflow-hidden"
                                >
                                    <img
                                        className="h-auto max-w-full rounded-lg transition duration-300"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 transition duration-300"></div>
                                    <div className="m-4 absolute inset-0 flex flex-col items-start justify-end opacity-0 group-hover:opacity-100 transition duration-300 space-y-2">
                                        <p className="text-white font-semibold text-2xl font-montserrat">
                                            {blog.title}
                                        </p>
                                        <p className="text-white font-montserrat">
                                            Ini deskripsi tapi belom dibikin
                                            kolomnya di database jadi ya begini
                                            dulu ya. soalnya aneh kalo title
                                            doang
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/blog"
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
                {/* service section */}
                <section className="bg-custom-blue h-fit">
                    <div className="max-w-6xl mx-auto py-8">
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
                                    className="bg-custom-cream h-72"
                                >
                                    <CardHeader>
                                        <CardTitle>Card Title</CardTitle>
                                        <CardDescription>
                                            Card Description
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Obcaecati nulla eligendi recusandae
                                            at impedit tenetur similique commodi
                                            quae consequatur, placeat porro,
                                            quasi id, omnis autem.
                                        </p>
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
                <section className="h-fit bg-custom-cream">
                    <div className="max-w-6xl mx-auto py-8">
                        <div className="space-y-4">
                            {" "}
                            <p className="font-montserrat text-3xl text-custom-blue font-extrabold">
                                Sewa Kendaraan
                            </p>
                            <p className="font-jost  text-custom-blue text-lg">
                                Nikmati kemudahan perjalanan dengan layanan sewa
                                kendaraan kami—beragam pilihan armada untuk
                                setiap kebutuhan Anda.
                            </p>
                        </div>
                        <div className="my-8 grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index} className="flex">
                                    <img
                                        src="/images/bus.jpeg"
                                        className="rounded-md p-2"
                                    />
                                    <div>
                                        <CardHeader>
                                            <CardTitle>Bus Nyaman</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            Bus nyaman dengan kapasitas 30–45
                                            penumpang, dilengkapi AC, reclining
                                            seat, audio video, dan bagasi luas.
                                            Cocok untuk perjalanan wisata
                                            rombongan.
                                        </CardContent>
                                    </div>
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

                {/* footer */}
            </AppLayout>
        </>
    );
}
