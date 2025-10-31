import { useContext, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useSearchParams, useRouter } from 'next/navigation';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import I18NextContext from '@/helper/i18NextContext';
import useUpdatePassword, { UpdatePasswordSchema } from '@/utils/hooks/auth/useUpdatePassword';
import { useTranslation } from '@/app/i18n/client';
import FormBtn from '@/components/common/FormBtn';
import { ToastNotification } from '@/utils/customFunctions/ToastNotification';
import Cookies from 'js-cookie';

const UpdatePasswordForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { mutate, isLoading } = useUpdatePassword();
  
  useEffect(() => {
    // Check if token exists in URL or cookies
    const cookieToken = Cookies.get('uo');
    if (!token && !cookieToken) {
      ToastNotification('error', 'Invalid or missing reset token. Please request a new password reset.');
      setTimeout(() => {
        router.push('/auth/forgot-password');
      }, 2000);
    }
  }, [token, router]);
  
  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      validationSchema={UpdatePasswordSchema}
      onSubmit={(values) => {
        if (values.password !== values.password_confirmation) {
          ToastNotification('error', 'Passwords do not match');
          return;
        }
        mutate({ ...values, token });
      }}>
      {() => (
        <Form className='row g-2'>
          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('EnterPassword'), title: 'Password', label: 'New Password', type: 'password' },
              { name: 'password_confirmation', placeholder: t('EnterConfirmPassword'), title: 'ConfirmPassword', label: 'Confirm Password', type: 'password' },
            ]}
          />
          <FormBtn 
            title={'UpdatePassword'} 
            classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} 
            loading={isLoading}
            disabled={!token && !Cookies.get('uo')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
