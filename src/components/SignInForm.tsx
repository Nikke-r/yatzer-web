import React from 'react';
import { SignInValues } from '../types';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Center from './Center';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import AppNotification from './AppNotification';
import { QueryLazyOptions, OperationVariables } from '@apollo/client';

const validationSchema = Yup.object({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
});

const initialValues: SignInValues = {
    username: '',
    password: '',
};

interface Props {
    signIn: (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
    authError: string | undefined;
}

const SignInForm: React.FC<Props> = ({ signIn, authError }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => signIn({ variables: { ...values }})
    });

    return (
        <Container maxWidth="xs">
            <Center>
                <Typography variant="h4">
                    Sign In
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="username"
                        label="Username"
                        name="username"
                        required
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.username}
                    />
                    <TextField 
                        id="password"
                        name="password"
                        label="Password"
                        required
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formik.values.password}
                    />
                    <Button fullWidth type="submit" variant="outlined">
                        Sign In
                    </Button>
                </form>
            </Center>
            {authError && <AppNotification notification={authError} />}
        </Container>
    );
};

export default SignInForm;