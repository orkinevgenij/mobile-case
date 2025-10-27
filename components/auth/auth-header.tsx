interface HeaderProps {
  label: string;
  title: string;
}

const AuthHeader = ({ title, label }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className='text-3xl font-semibold text-green-500'>{title}</h1>
      <p className='text-sm text-green-500'>{label}</p>
    </div>
  );
};

export default AuthHeader;
