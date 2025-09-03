import I18NextContext from '@/helper/i18NextContext';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';

const ProductInformation = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='pickup-box'>
      <div className='product-title'>
        <h4>{t("ProductInformation")}</h4>
      </div>
      <div className='product-info'>
        <ul className='product-info-list'>
          <li>{t("CasePack")} : {productState?.selectedVariation?.case_pack ?? productState?.product?.case_pack}</li>
          <li>{t("CBM")} : {productState?.product?.cbm}</li>
          <li>
            {t("UPC Code")} :
            {productState?.selectedVariation?.upc_code ? ModifyString(productState?.selectedVariation?.upc_code, false, '_') : ModifyString(productState?.product?.upc_code, false, '_')}
          </li>
          <li>{t("Carton UPC")} : {productState?.selectedVariation?.carton_upc ?? productState?.product?.carton_upc} </li>
          {/* <li>{t("Date")} : {dateFormat(productState?.product?.created_at, true)}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default ProductInformation;
