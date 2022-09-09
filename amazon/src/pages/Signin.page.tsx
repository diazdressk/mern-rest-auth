import AuthLayout from '../features/auth/components/AuthLayout';
import SigninFormComponent from '../features/auth/components/SigninForm.component';
type Props = {};

const SigninPage = (props: Props) => {
  return <AuthLayout><SigninFormComponent /></AuthLayout>;
};

export default SigninPage;
