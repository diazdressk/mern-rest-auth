import React from 'react';
import AuthLayout from '../features/auth/components/AuthLayout';
import RegistrationFormComponent from '../features/auth/components/RegistrationForm.component';

type Props = {};

const RegisterPage = (props: Props) => {
  return <AuthLayout>
    <RegistrationFormComponent />
  </AuthLayout>;
};

export default RegisterPage;
