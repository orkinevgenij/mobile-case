import { getVariationsByProductId } from '@/actions/product/get-variations';
import Variations from '@/components/dashboard/Variations';
import Container from '@/components/Container';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function ProductVariations({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const user = session?.user.role;
  
    if (user !== 'ADMIN') {
      redirect('/');
    }
  const { id } = await params;
  const variations = await getVariationsByProductId(id);

  return (
    <Container>
      <Variations variations={variations} caseId={id} />
    </Container>
  );
}
