import { useCallback, useState, useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import GeneralErrorModal from 'src/components/general-error-modal';
import { AuthContext } from 'src/contexts/auth-context';
import GeneralSuccessModal from 'src/components/general-success-modal';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const {user} = useContext(AuthContext);
  //const [method, setMethod] = useState('email');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: Yup.object({
      code: Yup
        .string()
        .matches(/\d{6}/, 'Debe introducir una OTP válida')
        .length(6, 'Debe introducir una OTP válida')
        .required('Debe introducir una OTP válida')
    }),
    onSubmit: async (values, helpers) => {
      try {
        //console.log(values.code);
        const {email} = user;
        const body = {
          email: email,
          code: values.code
        }
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/auth/verify-otp`,{
          method: 'POST',
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        .then(async(result)=>{
          if(result.ok){
            setSuccess(true)
            router.replace('http://localhost:3000/auth/login')
          }
        })
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Verificación de Correo | Ventas FP
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          //alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
      <GeneralErrorModal 
      opened={error} 
      setOpened={setError}/>
      <GeneralSuccessModal 
        opened={success}
        setOpened={setSuccess}
        message={"OTP validada"}
      />
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Verifica tu Correo
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                ¿No tienes cuenta?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Regístrate
                </Link>
              </Typography>
            </Stack>
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>

                  <TextField
                    //size= 'medium'
                    error={!!(formik.touched.code && formik.errors.code)}
                    fullWidth
                    helperText={formik.touched.code && formik.errors.code}
                    label="OTP"
                    name="code"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    //sx={{textAlign: 'center'}}
                    inputProps={{
                      style: {textAlign: 'center', fontSize: 40}
                    }}
                    
                    //value={formik.values.password}
                  />
                </Stack>
                {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continuar
                </Button>
                {/* <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button> */}
                {/* <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert> */}
              </form>
            {/* )}
            {method === 'phoneNumber' && ( */}
              {/* <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div> */}
            {/* )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
