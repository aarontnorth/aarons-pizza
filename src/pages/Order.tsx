import StyledButton from "../components/StyledButton";
import {Field, Form, Formik} from "formik";
import TextFieldWithError from "../components/TextFieldWithError";
import {PageWrapper} from "../components/PageWrapper";
import {useContext} from "react";
import OrderContext from "../contexts/OrderContext";

const Order = () => {
    const {createOrder} = useContext(OrderContext);

    // @ts-ignore
    const handleClick = (values) => {
        const pizza = {
            "Crust": values.crust,
            "Flavor": values.flavor,
            "Size": values.size,
        }
        createOrder(pizza);
    }

    return (
        <PageWrapper heading={"Order a pie!"} subheading={"Customize your order"}>
            <Formik
                initialValues={{ crust: "Regular", flavor: "Cheese", size: "Medium" }}
                onSubmit={(values, actions) => {
                    handleClick(values)
                    actions.setSubmitting(false);
                }}
            >
                <Form autoComplete={"off"}>
                    <Field component={TextFieldWithError} name="crust" label={"crust"} />
                    <Field component={TextFieldWithError} name="flavor" label={"flavor"} />
                    <Field component={TextFieldWithError} name="size" label={"size"} />
                    <StyledButton sx={{mt: 4, width: 'fit-content'}} type={'submit'}>
                        Submit order
                    </StyledButton>
                </Form>
            </Formik>
        </PageWrapper>
    )
}

export default Order
