import AppLayout from "@/Layouts/AppLayout";
import { useState } from "react";

type Tour = {
    id: number;
    title: string;
    description: string;
    tourPackages: {
        title: string;
        description: string;
        price: number;
        image?: string;
    }[];
};

type TourPackageProps = {
    tours: Tour[];
};

const dummyImg = "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg";

export default function TourPackage({ tours }: TourPackageProps) {
    // Tab state
    const [tab, setTab] = useState<"Paket Wisata" | "Sewa Kendaraan">("Paket Wisata");
    // Filter state (dropdown)
    const [filter, setFilter] = useState("Semua Lokasi");

    return (
        <AppLayout>
            <div className="pt-16 bg-custom-cream min-h-screen pb-10">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="pt-10 pb-4">
                        <p className="text-lg font-jost text-custom-blue mb-4">
                            temukan layanan wisatamu bersama kami!
                        </p>
                        <div className="flex flex-wrap gap-3 items-center mb-6">
                            <button
                                className={`px-6 py-2 rounded-full border font-semibold transition ${
                                    tab === "Paket Wisata"
                                        ? "bg-custom-blue text-white border-custom-blue shadow"
                                        : "bg-white text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white"
                                }`}
                                onClick={() => setTab("Paket Wisata")}
                            >
                                Paket Wisata
                            </button>
                            <button
                                className={`px-6 py-2 rounded-full border font-semibold transition ${
                                    tab === "Sewa Kendaraan"
                                        ? "bg-custom-blue text-white border-custom-blue shadow"
                                        : "bg-white text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white"
                                }`}
                                onClick={() => setTab("Sewa Kendaraan")}
                            >
                                Sewa Kendaraan
                            </button>
                            <select
                                className="ml-auto px-4 py-2 rounded-full border border-custom-blue bg-white text-custom-blue font-semibold"
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                            >
                                <option>Semua Lokasi</option>
                                {tours.map(tour => (
                                    <option key={tour.id}>{tour.title}</option>
                                ))}
                            </select>
                        </div>
                        <hr className="border-custom-blue" />
                    </div>

                    {/* Section: Paket Wisata Terfavorit */}
                    {tab === "Paket Wisata" && tours.length > 0 && (
                        <>
                            <div className="mt-8 mb-10">
                                <h2 className="text-xl font-bold mb-4">Paket Wisata terfavorit</h2>
                                <div className="bg-[#1E2952] text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center shadow-lg">
                                    <img
                                        src={tours[0].tourPackages[0]?.image || dummyImg}
                                        alt={tours[0].tourPackages[0]?.title}
                                        className="w-full md:w-72 h-56 object-cover rounded-xl border-4 border-white shadow"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-2 font-montserrat">
                                            {tours[0].tourPackages[0]?.title || "-"}
                                        </h3>
                                        <div
                                            className="font-jost text-base mb-2"
                                            dangerouslySetInnerHTML={{
                                                __html: tours[0].tourPackages[0]?.description || "",
                                            }}
                                        />
                                        <div className="mt-4">
                                            <span className="font-bold text-lg">
                                                {tours[0].tourPackages[0]?.price
                                                    ? `Rp${tours[0].tourPackages[0].price.toLocaleString("id-ID")}`
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Paket Wisata per Lokasi */}
                            {tours
                                .filter(tour => filter === "Semua Lokasi" || tour.title === filter)
                                .map((tour, idx) => (
                                    <div key={tour.id} className="mb-12">
                                        <h2 className="text-2xl font-bold mb-6 font-montserrat">
                                            {tour.title}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                            {tour.tourPackages.map((pkg, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-[#1E2952] text-white rounded-2xl shadow-lg flex flex-col h-full"
                                                >
                                                    <img
                                                        src={pkg.image || dummyImg}
                                                        alt={pkg.title}
                                                        className="w-full h-40 object-cover rounded-t-2xl"
                                                    />
                                                    <div className="p-5 flex flex-col flex-1">
                                                        <h4 className="text-lg font-bold mb-2 font-montserrat">{pkg.title}</h4>
                                                        <div
                                                            className="font-jost text-sm mb-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: pkg.description,
                                                            }}
                                                        />
                                                        <div className="mt-auto flex justify-between items-end">
                                                            <span className="font-bold text-base">
                                                                {pkg.price ? `Rp${pkg.price.toLocaleString("id-ID")}` : ""}
                                                            </span>
                                                            <a
                                                                href="#"
                                                                className="text-xs underline text-white font-semibold hover:text-custom-cream transition"
                                                            >
                                                                selengkapnya &gt;
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}

                    {/* Section: Sewa Kendaraan */}
                    {tab === "Sewa Kendaraan" && (
                        <div className="py-20 text-center text-2xl text-custom-blue font-bold opacity-60">
                            Fitur Sewa Kendaraan segera hadir!
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}