import VariationAddForm from '@/components/dashboard/AddVariation';
import Container from '@/components/Container';

export default async function AddVariation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Container>
      <VariationAddForm caseId={id} />
    </Container>
  );
}
