import { updateViews } from '@/actions/product/update-count';
import Details from '@/components/ProductDetails';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

type ProductDetailsProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string }>;
};

const ProductDetails = async ({ params, searchParams }: ProductDetailsProps) => {
  const { id } = await params;
  const { color } = await searchParams;

  const product = await prisma.case.findUnique({
    where: { id },
  });
  if (!product) return notFound();

  const allColors = await prisma.caseVariation.findMany({
    where: { caseId: id },
    select: { color: true },
    orderBy: { color: 'asc' },
  });

  const activeVariation = await prisma.caseVariation.findFirst({
    where: {
      caseId: id,
      ...(color ? { color } : {}),
    },
    include: { case: true },
  });
  if (!activeVariation) return notFound();
  await updateViews(id);
  return (
    <Details product={product} colors={allColors.map((c) => c.color)} variation={activeVariation} />
  );
};

export default ProductDetails;
