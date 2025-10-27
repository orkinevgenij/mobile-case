import { updateViews } from '@/actions/product/update-count';
import NotFound from './not-found';
import { prisma } from '@/lib/prisma';
import Detail from '@/components/ProductDetail';

export default async function ProductDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color?: string }>;
}) {
  const { id } = await params;
  const { color } = await searchParams;

  const [product, allColors] = await Promise.all([
    prisma.case.findUnique({ where: { id } }),
    prisma.caseVariation.findMany({
      where: { case: { id } },
      select: { color: true },
      orderBy: { color: 'asc' },
    }),
  ]);

  if (!product) return NotFound();

  const activeVariationPromise = prisma.caseVariation.findFirst({
    where: {
      case: { id },
      ...(color ? { color } : {}),
    },
    include: { case: true },
  });

  const updateViewsPromise = updateViews(id);

  const [activeVariation] = await Promise.all([activeVariationPromise, updateViewsPromise]);

  if (!activeVariation) return NotFound();
  return (
    <Detail product={product} colors={allColors.map((c) => c.color)} variation={activeVariation} />
  );
}
