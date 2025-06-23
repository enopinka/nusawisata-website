import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";

type Tour = {
    id: number;
    title: string;
    description: string;
    tourPackages: {
        title: string;
        description: string;
        price: number;
    }[];
};

type TourPackageProps = {
    tours: Tour[];
};

export default function TourPackage({ tours }: TourPackageProps) {
    console.log(tours);
    return (
        <AppLayout>
            <div className="pt-32 bg-custom-cream min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="py-4">
                        <p className="text-4xl font-montserrat font-bold">
                            Paket Wisata
                        </p>
                        <p className="font-jost  text-custom-blue text-lg">
                            Temukan berbagai pilihan paket wisata menarik yang
                            telah kami siapkan untukmu, lengkap dengan destinasi
                            populer, fasilitas terbaik, dan pengalaman
                            perjalanan yang tak terlupakan.
                        </p>
                    </div>
                    <div>
                        {tours.map((tour) => (
                            <div key={tour.id}>
                                <div className="py-4">
                                    <p className="text-3xl font-montserrat font-semibold">
                                        {tour.title}
                                    </p>
                                    <p className="text-lg font-jost">
                                        {tour.description}
                                    </p>
                                </div>
                                {tour.tourPackages &&
                                tour.tourPackages.length > 0 ? (
                                    <div className="space-y-2">
                                        {tour.tourPackages.map((pkg, index) => (
                                            <Card
                                                key={index}
                                                className=" w-96 my-4 border rounded-md"
                                            >
                                                <CardHeader>
                                                    <img
                                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                                                        className="w-full mb-4 h-auto rounded-lg"
                                                    />
                                                    <CardTitle className="font-bold">
                                                        {pkg.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: pkg.description,
                                                        }}
                                                    />
                                                    <div className="w-full flex flex-col items-end my-4">
                                                        <p className="text-lg text-gray-600">
                                                            Harga
                                                        </p>
                                                        <p className="font-bold text-xl">
                                                            Rp{pkg.price}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-muted-foreground">
                                        Paket belum tersedia!
                                    </p>
                                )}
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
