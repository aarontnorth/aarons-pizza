import StyledButton from "../components/StyledButton";
import {useOrderPizza} from "../api/orders";
import {Field, Form, Formik} from "formik";
import TextFieldWithHeader from "../components/TextFieldWithHeader";
import {PageWrapper} from "../components/PageWrapper";

const Order = () => {
    const orderPizza = useOrderPizza();

    // @ts-ignore
    const handleClick = (values) => {
        const pizza = {
            "Crust": values.crust,
            "Flavor": values.flavor,
            "Size": values.size,
        }
        orderPizza.mutate(pizza);
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
                <Form>
                    <Field component={TextFieldWithHeader} name="crust" label={"crust"} />
                    <Field component={TextFieldWithHeader} name="flavor" label={"flavor"} />
                    <Field component={TextFieldWithHeader} name="size" label={"size"} />
                    <StyledButton sx={{mt: 4, width: 'fit-content'}} type={'submit'}>
                        Submit order
                    </StyledButton>
                </Form>
            </Formik>
        </PageWrapper>
    )
}

export default Order
