'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Col } from 'reactstrap';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import Cookies from 'js-cookie';
import emailSentImage from '../../../../public/assets/images/inner-page/forgot.png';

const ForgotPasswordSuccess = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const email = Cookies.get('ue');

  useEffect(() => {
    // If no email in cookie, redirect to forgot password page
    if (!email) {
      router.push('/auth/forgot-password');
    }
  }, [email, router]);

  return (
    <>
      <Breadcrumb title={'CheckYourEmail'} subNavigation={[{ name: 'CheckYourEmail' }]} />
      <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space forgot-section', fluidClass: 'w-100' }} customCol={true}>
        <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
          <div className='image-contain'>
            <Image src={emailSentImage} className='img-fluid' alt='email-sent' />
          </div>
        </Col>

        <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
          <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='log-in-box text-center'>
              <div className='mb-4'>
                <div className='success-icon mb-3'>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#0da487" strokeWidth="2" fill="none"/>
                    <path d="M8 12L11 15L16 9" stroke="#0da487" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className='mb-3'>{t('CheckYourEmail')}</h2>
                <p className='text-muted mb-2'>
                  {t('WeHaveSentPasswordResetLinkTo')}
                </p>
                {email && (
                  <p className='fw-bold mb-3' style={{ color: '#0da487' }}>
                    {email}
                  </p>
                )}
                <p className='text-muted mb-4'>
                  {t('PleaseCheckYourEmailAndClickOnThePasswordResetLink')}
                </p>
                <div className='alert alert-info' role='alert'>
                  <small>
                    <strong>{t('Note')}:</strong> {t('TheResetLinkWillExpireIn30Minutes')}
                  </small>
                </div>
              </div>
              
              <div className='d-flex flex-column gap-2'>
                <button
                  type='button'
                  className='btn btn-animation w-100'
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  {t('ResendEmail')}
                </button>
                <button
                  type='button'
                  className='btn btn-outline-secondary w-100'
                  onClick={() => router.push('/auth/login')}
                >
                  {t('BackToLogin')}
                </button>
              </div>
            </div>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default ForgotPasswordSuccess;
