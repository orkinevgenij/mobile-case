import { getBrands } from "@/actions/smartphones";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default async function Brands() {
    const brands = await getBrands();
    if (brands.length === 0) return <p>Бренд не знайдено</p>;
    return (
        <Container>
            <h1 className="text-xl font-semibold mb-4">Чохли для  {brands[0].name}  </h1>

            <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
                {brands.map((brand) => (
                    <Link key={brand.id} href={`/series/${brand.id}`} className='p-6 shadow-sm shadow-neutral-300 hover:shadow-yellow-300'>
                        {brand.name}
                    </Link>
                ))}
            </div>
        </Container>)
}