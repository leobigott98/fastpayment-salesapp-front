import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "../../../layouts/auth/layout";
import GeneralErrorModal from "src/components/general-error-modal";
import Visibility from '@mui/icons-material/Visibility';
import GeneralSuccessModal from 'src/components/general-success-modal';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';

const Page = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
        const id = router.query.id
        const body = {
            password: values.password,
            url: id
        }
      try {
        console.log(token)
        await fetch(`http://localhost:3001/api/v1/auth/passwordReset/reset`,{
            method: 'POST',
            headers: {
                "X-Auth-Token": token,
                "Content-Type": "application/json"
              },
            body: JSON.stringify(body)
        }).then((result)=>{
            if(result.ok){
                setSuccess(true)
                router.replace('http://localhost:3000/auth/login')
            }else{
                setError(true)
            }
        })
        
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(()=>{
    const id = router.query.id
    const checkURL = async(id)=>{
        await fetch(`http://localhost:3001/api/v1/auth/passwordReset/checkURL/${id}`)
            .then(async (response)=>{
                if (!response.ok){
                    setError(true)
                    router.replace('http://localhost:3000/auth/login')
                } else {
                    const json = await response.json();
                    setEmail(json.email)
                    setToken(json.token)
                }
            })
    }
    checkURL(id);
  },[])

  return (
    <>
      <Head>
        <title>Password Reset | Ventas FP</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GeneralErrorModal opened={error} setOpened={setError} />
        <GeneralSuccessModal opened={success} setOpened={setSuccess} message='Contraseña actualizada exitosamente'/>
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Restablecimiento de Contraseña</Typography>
              <Typography variant="h7">Usuario: {email}</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <FormControl  
                  variant="filled"
                  margin="none"
                  error={!!(formik.touched.password && formik.errors.password)}
                  >
                  <InputLabel
                   size="small"
                    >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color={formik.touched.password && formik.errors.password ? 'error' : ''}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FormHelperText
                    error={!!(formik.touched.password && formik.errors.password)}>
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                </FormControl>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continuar
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;