import {TextField, Grid, Typography } from "@mui/material";
import {ReactElement, JSXElementConstructor, ReactFragment} from "react";

interface TextFieldProps {
    label: string;
    field?: JSX.IntrinsicAttributes
}

const TextFieldWithHeader = ({label, field}: TextFieldProps ) => {
    return (
        <Grid container direction={'column'} sx={{mb: 4}}>
            <Typography>{label}</Typography>
            <TextField
                {...field}
                type={'input'}
                name={label}
                variant={"filled"}
                color={"secondary"}
                sx={{color: "white"}}
            />
        </Grid>
    )
}

export default TextFieldWithHeader