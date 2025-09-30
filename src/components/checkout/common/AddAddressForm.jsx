import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import I18NextContext from '@/helper/i18NextContext';
import request from '@/utils/axiosUtils';
import { CountryAPI } from '@/utils/axiosUtils/API';
import { YupObject, emailSchema, nameSchema, phoneSchema } from '@/utils/validation/ValidationSchemas';
import { useTranslation } from '@/app/i18n/client';
import SelectForm from './SelectForm';

const AddAddressForm = ({ mutate, type, editAddress, setEditAddress, modal, setModal }) => {
  useEffect(() => {
    modal !== 'edit' && setEditAddress && setEditAddress({});
  }, [modal]);
  const { data } = useQuery({queryKey: [CountryAPI], queryFn: () => request({ url: CountryAPI }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Formik
      initialValues={{
        id: editAddress ? editAddress?.id : '',
        title: editAddress ? editAddress?.title : '',
        street: editAddress ? editAddress?.street : '',
        country_id: editAddress ? editAddress?.country?.id : '',
        state_id: editAddress ? editAddress?.state?.id : '',
        city: editAddress ? editAddress?.city : '',
        pincode: editAddress ? editAddress?.pincode : '',
        phone: editAddress ? editAddress?.phone : '',
        address_type: editAddress ? editAddress?.address_type : null,
        country_code: editAddress ? editAddress?.country_code : '1',
        address_type: editAddress ? editAddress?.address_type : '',
      }}
      validationSchema={YupObject({
        title: nameSchema,
        street: nameSchema,
        city: nameSchema,
        country_id: nameSchema,
        state_id: nameSchema,
        pincode: nameSchema,
        phone: phoneSchema,
        address_type: nameSchema,
      })}
      onSubmit={(values) => {
        if (modal) {
          values['_method'] = 'PUT';
        }
        values['pincode'] = values['pincode'].toString();
        mutate(values);
      }}>
      {({ values, setFieldValue, isSubmitting }) => <SelectForm values={values} setFieldValue={setFieldValue} setModal={setModal} data={data} isSubmitting={isSubmitting} />}
    </Formik>
  );
};

export default AddAddressForm;
