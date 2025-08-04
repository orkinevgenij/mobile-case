import VariationAddForm from '@/components/dashboard/AddVariation';
import Container from '@/components/layout/Container';

const AddVariation = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <Container>
      <VariationAddForm caseId={id} />
    </Container>
  );
};
export default AddVariation;
