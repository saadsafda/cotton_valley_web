'use client';
import React, { useContext, useEffect, useState } from 'react';
import Btn from '@/elements/buttons/Btn';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import Avatar from '@/components/common/Avatar';
import Link from 'next/link';
import logoImage from '../../../../../public/assets/images/logo/logo.png';
import { RiMenuLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const HeaderLogo = () => {
  const [logo, setLogo] = useState('');
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const pathName = usePathname();
  useEffect(() => {
    let logo = logoImage;
    setLogo(logo);
  }, [pathName, i18Lang, themeOption?.logo?.header_logo]);
  return (
    <>
      <Btn className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2' type='button'>
        <span className='navbar-toggler-icon' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <RiMenuLine />
        </span>
      </Btn>
      <Link href='/' className='web-logo nav-logo'>
        <Avatar data={logo} placeHolder={logoImage} name={'Header'} customImageClass={'img-fluid'} height={28} width={162} />
      </Link>
    </>
  );
};

export default HeaderLogo;
