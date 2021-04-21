import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import { SignUpValues } from '../types';
import * as Yup from 'yup';
import Center from './Center';

const validationSchema = Yup.object({
    username: Yup.string().min(3).max(15).required('This field is required'),
    password: Yup.string().min(5).required('This field is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords does not match'),
});

const initialValues: SignUpValues = {
    username: '',
    password: '',
    confirmPassword: '',
};

interface Props {
    signUp: (values: SignUpValues) => void;
}

const SignUpForm: React.FC<Props> = ({ signUp }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => signUp(values)
    });

    return (
        <Container maxWidth="xs">
            <Center>
                <Typography variant="h4">
                    Sign Up
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField 
                        id="username"
                        name="username"
                        value={formik.values.username}
                        label="Username"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="text"
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField 
                        id="password"
                        value={formik.values.password}
                        label="Password"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        name="password"
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField 
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        label="Confirm Password"
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        name="confirmPassword"
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button type="submit" variant="outlined" fullWidth>
                        Sign up
                    </Button>
                </form>
            </Center>
        </Container>
    );
};

export default SignUpForm;