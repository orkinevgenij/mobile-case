import { auth } from '@/auth';
import RegisterForm from '@/components/auth/register-form';
import Container from '@/components/Container';
import { redirect } from 'next/navigation';

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect('/');
  }
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};
export default Register;
