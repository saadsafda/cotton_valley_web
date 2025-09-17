import React, { useContext } from "react";
import { Col } from "reactstrap";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import FooterDownloadAppLink from "./FooterDownloadAppLink";
import FooterSupportEmail from "./FooterSupportEmail";
import FooterSupportNumber from "./FooterSupportNumber";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiHome5Line, RiHomeLine, RiMailLine } from "react-icons/ri";
import Link from "next/link";

const FooterContactUs = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <Col xl={3} lg={4} sm={6}>
      {themeOption?.footer?.support_number ||
      themeOption?.footer?.support_email ? (
        <div className={`footer-title contact-title`}>
          <h4>{t("ContactUs")}</h4>
        </div>
      ) : (
        ""
      )}
      <div className="footer-contact">
        <ul>
          {themeOption?.footer?.about_address && (
            <li>
              <div className="footer-number">
                <RiHome5Line style={{ fontSize: "30px"}} />
                <div className="contact-number">
                  <Link href="https://www.google.com/maps" target="_blank">
                    {themeOption?.footer?.about_address}
                  </Link>
                </div>
              </div>
            </li>
          )}
          {/* 
          <div className="footer-logo-contain"> */}
          {/* <ul className="address"> */}
          {/* {themeOption?.footer?.about_email && (
                <li>
                  <RiMailLine />
                  <Link
                    href={`mailto:${themeOption?.footer?.about_email}`}
                    target="_blank"
                  >
                    {themeOption?.footer?.about_email}
                  </Link>
                </li>
              )} */}
          {/* </ul> */}
          {/* </div> */}
          <FooterSupportNumber />
          <FooterSupportEmail />
          <FooterDownloadAppLink />
        </ul>
      </div>
    </Col>
  );
};

export default FooterContactUs;
