import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react';
import { Formik, Form, Field } from 'formik';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: 'Invalid email or password' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='user-form' onSubmit={handleSubmit} autoComplete='off'>
                    <h3>Sign up to Habi2be</h3>
                    <Field
                        placeholder='Email'
                        name='email' />
                    <Field
                        placeholder='Password'
                        name='password'
                        type='password' />
                    <button
                        type="submit">
                        {isSubmitting ? 'Loading...' : 'Login'}
                    </button>
                </Form>
            )}
        </Formik>
    )
})