import AppLayout from "@/Layouts/AppLayout";

type Portofolio = {
    id: number;
    title: string;
    description: string;
    image: string;
};

type PortfolioProps = {
    portofolio: Portofolio[];
};

export default function Portfolio({ portofolio }: PortfolioProps) {
    return (
        <AppLayout>
            <div className="pt-32 bg-custom-cream min-h-screen">
                <div className="max-w-6xl mx-auto py-4">
                    <div className="my-4 space-y-2">
                        <p className="text-4xl font-montserrat font-bold">
                            Portofolio
                        </p>
                        <p className="font-jost text-custom-blue text-lg">
                            Lihat berbagai proyek dan pencapaian yang telah kami
                            selesaikan. Kami bangga menampilkan hasil kerja
                            terbaik kami sebagai bukti komitmen terhadap
                            kualitas, kepercayaan, dan kepuasan pelanggan.
                        </p>
                    </div>
                    <div>
                        {portofolio && portofolio.length > 0 ? (
                            portofolio.map((portofolioItem) => (
                                <div
                                    key={portofolioItem.id}
                                    className="my-6 w-full flex gap-4 border border-gray-300 shadow-sm shadow-gr p-4 rounded-md"
                                >
                                    <div className="w-1/4">
                                        <img
                                            src={`/storage/${portofolioItem.image}`}
                                            alt={portofolioItem.title}
                                        />
                                    </div>
                                    <div className="space-y-4 w-3/4">
                                        {" "}
                                        <p className="text-3xl font-semibold ">
                                            {portofolioItem.title}
                                        </p>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: portofolioItem.description,
                                            }}
                                            className="text-lg font-jost"
                                        ></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">
                                Masih Kosong
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
