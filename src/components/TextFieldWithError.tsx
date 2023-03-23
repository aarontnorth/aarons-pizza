import React from 'react';
import {TextField, Grid, styled, Typography} from '@mui/material';

interface TextFieldProps {
    label: string;
    field?: JSX.IntrinsicAttributes;
    hasError: boolean;
    errorText?: string;
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

const TextFieldWithError = ({label, field, hasError, errorText}: TextFieldProps ) => {
  return (
    <Grid container direction={'column'} sx={{mt: 4}}>
      <StyledTextField
        {...field}
        label={label}
        type={'input'}
        name={label}
      />
      {hasError && <Typography sx={{color: 'red'}}>{errorText}</Typography>}
    </Grid>
  );
};

export default TextFieldWithError;