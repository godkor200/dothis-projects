import AuthProvider from '@/components/feature/AuthProvider';

const RootTemplate = ({ children }: StrictPropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RootTemplate;
