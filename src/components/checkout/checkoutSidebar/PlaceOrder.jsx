import React, { useContext } from 'react';
import Btn from '@/elements/buttons/Btn';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import request from '@/utils/axiosUtils';
import { AddToCartAPI } from '@/utils/axiosUtils/API';
import CartContext from '@/helper/cartContext';

const PlaceOrder = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const handleClick = async () => {
    console.log(values, 'Placing order with values');
    try {
      const items = cartProducts.map(item => ({
        item_code: item?.variation?.id || item?.product?.id,
        qty: item.quantity,
        rate: item?.variation?.sale_price || item?.product?.sale_price,
      }));

      await request({
        url: AddToCartAPI,
        method: 'POST',
        data: { items, submit: true, ...values },
      }).then(response => {
        console.log('Order placed successfully:', response);
        router.push(`/${i18Lang}/account/order/details/${response?.data?.order_id}`);
      });
    } catch (err) {
      console.error("Sales Order sync failed:", err);
    }
    
    // router.push(`/${i18Lang}/account/order/details/1000`)
  };
  return (
    <Btn className='btn-md fw-bold mt-4 text-white theme-bg-color w-100' onClick={handleClick}>
      {t('PlaceOrder')}
    </Btn>
  );
};

export default PlaceOrder;
