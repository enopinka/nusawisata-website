import AppLayout from "@/Layouts/AppLayout";

type Kendaraan = {
    id: number;
    title: string;
    description: string;
    price: string;
};

type JenisKendaraan = {
    id: number;
    title: string;
    description: string;
    kendaraan: Kendaraan[];
};

type RentalProps = {
    jenisKendaraan: JenisKendaraan[];
};

export default function Rental({ jenisKendaraan }: RentalProps) {
    return (
        <AppLayout>
            <div className="pt-32 bg-custom-cream min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="my-4 space-y-2">
                        <p className="text-4xl font-montserrat font-bold">
                            Sewa Kendaraan
                        </p>
                        <p className="font-jost  text-custom-blue text-lg">
                            Temukan berbagai pilihan paket sewa kendaraan dengan
                            harga terbaik, cocok untuk perjalanan pribadi,
                            wisata, atau keperluan bisnis. Kami menyediakan
                            armada berkualitas dan layanan terpercaya untuk
                            kenyamananmu.
                        </p>
                    </div>
                    <div className="max-w-6xl">
                        {jenisKendaraan.map((jenisKendaraan) => (
                            <div key={jenisKendaraan.id}>
                                <div className="my-4">
                                    <p className="font-semibold text-lg">
                                        {" "}
                                        {jenisKendaraan.title}
                                    </p>
                                    {Array.isArray(jenisKendaraan?.kendaraan) &&
                                    jenisKendaraan.kendaraan.length > 0 ? (
                                        jenisKendaraan.kendaraan.map(
                                            (kendaraan) => (
                                                <div key={kendaraan.id}>
                                                    <p>{kendaraan.title}</p>
                                                    <p>
                                                        {kendaraan.description}
                                                    </p>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="my-4 text-center text-muted-foreground">
                                            Kendaraan Belum Tersedia!
                                        </p>
                                    )}
                                    <hr />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
