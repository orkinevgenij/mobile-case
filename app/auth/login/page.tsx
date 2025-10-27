import { auth } from '@/auth';
import LoginForm from '@/components/auth/login-form';
import Container from '@/components/Container';
import { redirect } from 'next/navigation';

const Login = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};
export default Login;
