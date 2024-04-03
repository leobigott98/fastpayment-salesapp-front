import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
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
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import GeneralErrorModal from "src/components/general-error-modal";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  //const [method, setMethod] = useState('email');
  const [error, setError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await auth.signIn(values.email, values.password);
        if (response) {
          router.push("/");
        } else {
          setError(true);
        }
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


  /* const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
      console.log(method);
    },
    []
  ); */

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Login | Ventas FP</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GeneralErrorModal opened={error} setOpened={setError} />
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
              <Typography variant="h4">Inicio de Sesión</Typography>
              <Typography color="text.secondary" variant="body2">
                ¿No tienes cuenta? &nbsp;
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
            {/* <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs> */}
            {/* {method === 'email' && ( */}
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  //value={formik.values.email}
                />
               {/*  <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  //value={formik.values.password}
                >
                  <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                </TextField> */}
                <FormControl  
                  variant="filled"
                  margin="none"
                  error={!!(formik.touched.password && formik.errors.password)}
                  //sx={{m:0, p:0}}
                  
                  >
                  <InputLabel
                    //error={!!(formik.touched.password && formik.errors.password)}
                    //variant="filled"
                   size="small"
                    >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    //id="outlined-adornment-password"
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
                    //notched
                  />
                  <FormHelperText
                    error={!!(formik.touched.password && formik.errors.password)}>
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                </FormControl>
              </Stack>
              {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Typography color="text.secondary" variant="body2">
                <Link
                  component={NextLink}
                  href="/auth/password-recovery"
                  underline="hover"
                  variant="subtitle2"
                >
                  Olvidé mi contraseña
                </Link>
              </Typography>
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
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

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
