import VariationAddForm from '@/components/dashboard/AddVariation';
import Container from '@/components/Container';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AddVariation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user.role;

  if (user !== 'ADMIN') {
    redirect('/');
  }
  return (
    <Container>
      <VariationAddForm caseId={id} />
    </Container>
  );
}
