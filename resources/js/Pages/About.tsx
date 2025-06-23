import AppLayout from "@/Layouts/AppLayout";

export default function About() {
    return (
        <AppLayout>
            <div className="pt-32 bg-custom-cream min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="my-4 space-y-2">
                        <p className="text-4xl font-montserrat font-bold">
                            Tentang Kami
                        </p>
                        <p className="font-jost text-custom-blue text-lg">
                            Kami hadir untuk memberikan solusi transportasi
                            terbaik dengan layanan profesional dan kendaraan
                            yang terawat. Kepuasan pelanggan adalah prioritas
                            utama kami.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
