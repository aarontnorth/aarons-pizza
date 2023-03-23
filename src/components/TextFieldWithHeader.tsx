import {TextField, Grid, styled} from "@mui/material";

interface TextFieldProps {
    label: string;
    field?: JSX.IntrinsicAttributes
}

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-input': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

const TextFieldWithHeader = ({label, field}: TextFieldProps ) => {
    return (
        <Grid container direction={'column'} sx={{mt: 4}}>
            <StyledTextField
                {...field}
                label={label}
                type={'input'}
                name={label}
            />
        </Grid>
    )
}

export default TextFieldWithHeader