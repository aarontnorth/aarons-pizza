import React from 'react';
import StyledButton from '../components/StyledButton';
import {Field, Form, Formik} from 'formik';
import TextFieldWithError from '../components/TextFieldWithError';
import {PageWrapper} from '../components/PageWrapper';
import {useContext} from 'react';
import OrderContext from '../contexts/OrderContext';
import * as Yup from 'yup';

const Order = () => {
  const {createOrder} = useContext(OrderContext);

  const orderSchema = Yup.object().shape({
    crust: Yup.string().required('Crust is required'),
    flavor: Yup.string().required('Flavor is required'),
    size: Yup.string().required('Size is required'),
  });

  // @ts-ignore
  const handleClick = (values) => {
    const pizza = {
      'Crust': values.crust,
      'Flavor': values.flavor,
      'Size': values.size,
    };
    createOrder(pizza);
  };

  return (
    <PageWrapper heading={'Order a pie!'} subheading={'Customize your order'}>
      <Formik
        validationSchema={orderSchema}
        initialValues={{ crust: 'Regular', flavor: 'Cheese', size: 'Medium' }}
        onSubmit={(values, actions) => {
          handleClick(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form autoComplete={'off'}>
            <Field
              component={TextFieldWithError}
              name="crust"
              label={'crust'}
              hasError={errors.crust && touched.crust}
              errorText={errors.crust}
            />
            <Field
              component={TextFieldWithError}
              name="flavor"
              label={'flavor'}
              hasError={errors.flavor && touched.flavor}
              errorText={errors.flavor}
            />
            <Field
              component={TextFieldWithError}
              name="size"
              label={'size'}
              hasError={errors.size && touched.size}
              errorText={errors.size}
            />
            <StyledButton sx={{mt: 4, width: 'fit-content'}} type={'submit'}>
                Submit order
            </StyledButton>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default Order;
