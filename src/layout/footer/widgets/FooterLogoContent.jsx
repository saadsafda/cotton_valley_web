import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import Link from 'next/link';
import { RiHomeLine, RiMailLine } from 'react-icons/ri';
import Avatar from '@/components/common/Avatar';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { placeHolderImage } from '../../../data/CommonPath';
import I18NextContext from '@/helper/i18NextContext';
import { usePathname } from 'next/navigation';
import ParisLogo from '../../../../public/assets/images/logo/logo.png';

const FooterLogoContent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [logoAbc, setLogo] = useState(ParisLogo);
  const { i18Lang } = useContext(I18NextContext);
  const pathName = usePathname();
  useEffect(() => {
    let logo = ParisLogo;
    setLogo(logo);
  }, [pathName, i18Lang]);
  return (
    <Col xl={3} sm={6}>
      <div className='footer-logo'>
        <div className='theme-logo'>
          <Link href='/'>{logoAbc ? <Avatar data={logoAbc} placeHolder={placeHolderImage} name={'Footer'} height={28} width={160} /> : null}</Link>
        </div>
        <div className='footer-logo-contain'>
          {themeOption?.footer?.footer_about && <p>{themeOption?.footer?.footer_about}</p>}
          <ul className='address'>
            {themeOption?.footer?.about_address && (
              <li>
                <RiHomeLine />
                <Link href='https://www.google.com/maps' target='_blank'>
                  {themeOption?.footer?.about_address}
                </Link>
              </li>
            )}
            {themeOption?.footer?.about_email && (
              <li>
                <RiMailLine />
                <Link href={`mailto:${themeOption?.footer?.about_email}`} target='_blank'>
                  {themeOption?.footer?.about_email}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default FooterLogoContent;
