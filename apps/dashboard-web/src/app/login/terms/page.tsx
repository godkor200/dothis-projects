import LoginTerms from '@/components/Auth/LoginTerms';

const LoginTermsPage = () => {
  return (
    <>
      <h1 className="text-grey700 mb-10  text-center  text-[28px] font-semibold">
        반가워요 😊 두디스가 처음이시네요!
        <br /> Let`s Do This!
      </h1>
      <p className="mb-[20px] text-center">
        Google 계정으로 Dothis에 가입합니다
      </p>

      <LoginTerms />
    </>
  );
};

export default LoginTermsPage;
