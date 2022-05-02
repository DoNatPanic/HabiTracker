import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
            <Formik 
                initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}
                validationSchema={yup.object({
                    displayName: yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required field'),
                    username: yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required field'),
                    email: yup.string()
                        .email('Email is not valid')
                        .required('Required field'),
                    password: yup.string()
                        .min(8, "Must be 8 characters or more")
                        .matches(/[a-z]+/, "One lowercase character")
                        .matches(/[A-Z]+/, "One uppercase character")
                        .matches(/[@$!%*#?&]+/, "One special character")
                        .matches(/\d+/, "One number")
                        .required('No password provided'),
                })}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty, touched }) => (
                    <Form className='user-form' onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Register to Habi2be</h3>
                        <Field
                            placeholder='Display Name'
                            name='displayName' />
                        {errors.displayName && touched.displayName ? (
                            <div>{errors.displayName}</div>
                        ) : null}
                        <Field
                            placeholder='Username'
                            name='username' />
                        {errors.username && touched.username ? (
                            <div>{errors.username}</div>
                        ) : null}
                        <Field
                            placeholder='Email'
                            name='email' />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Field
                            placeholder='Password'
                            name='password'
                            type='password' />
                        {touched.password && errors.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <button
                            disabled={!isValid || !dirty || isSubmitting}
                            type="submit">
                            {isSubmitting ? 'Loading...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
    )
})