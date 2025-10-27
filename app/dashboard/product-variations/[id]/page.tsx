import { getVariationsByProductId } from '@/actions/product/get-variations';
import Variations from '@/components/dashboard/Variations';
import Container from '@/components/Container';

export default async function ProductVariations({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const variations = await getVariationsByProductId(id);

  return (
    <Container>
      <Variations variations={variations} caseId={id} />
    </Container>
  );
}
