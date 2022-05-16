import React from 'react';
//import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function TextInputField(props) {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);

    // function _renderHelperText() {
    //   const [touched, error] = at(meta, 'touched', 'error');
    //   if (touched && error) {
    //     return error;
    //   }
    // }

    return (
        <TextField
            type="text"
            error={meta.touched && meta.error && true}
            //helperText={"Proba"}//_renderHelperText()}
            {...field}
            {...rest}
        />
    );
}
