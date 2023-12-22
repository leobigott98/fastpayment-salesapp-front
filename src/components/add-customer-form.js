import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProgressMobileStepper from './add-customer-stepper';
import { useEffect } from 'react';

const tipos_doc = [
  {
    value: 1,
    label: 'J',
  },
  {
    value: 2,
    label: 'V',
  },
  {
    value: 3,
    label: 'E',
  }
];

const CustomerForm = ({handleStep}) => {
  const formik = useFormik({
    initialValues: {
      correo: '',
      r_social: '',
      n_comercial: '',
      tlf_fijo: '',
      tlf_movil: '',
      tipo_doc: 1,
      doc: ''
    },
    validationSchema: Yup.object({
      r_social: Yup
        .string()
        .matches(/([A-Za-zÀ-ÿ&']+(\s{0,1}))+/g, 'Debe ser un nombre válido')
        .max(255)
        .required('Razón Social es obligatorio'),
      n_comercial: Yup
        .string()
        .matches(/([A-Za-zÀ-ÿ&']+(\s{0,1}))+/g, 'Debe ser un nombre válido')
        .max(255)
        .required('Nombre Comercial es obligatorio'),
      tlf_fijo: Yup
        .string()
        .matches(/([0-9])/, 'Debe ser un teléfono válido')
        .length(11)
        .required('Teléfono Fijo es obligatorio'),
      tlf_movil: Yup
        .string()
        .matches(/([0-9])/, 'Debe ser un teléfono válido')
        .length(11)
        .required('Teléfono Móvil es obligatorio'),
      correo: Yup
        .string()
        .email('Debe ser un correo válido')
        .max(255)
        .required('Correo es obligatorio'),
      tipo_doc: Yup
        .number()
        .moreThan(0)
        .lessThan(4)
        .required('Obligatorio'),
      doc: Yup
        .string()
        .matches(/([0-9])/)
        .length(9)
        .required('El RIF es obligatorio'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log('clicked')
        const response = await fetch('http://localhost:3001/api/v1/customers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.sessionStorage.getItem('token')
          },
          body: JSON.stringify(values)
        })
        const jsonResponse = await response.json()
        //console.log(jsonResponse);
        alert(`El cliente ${jsonResponse.result[0].razon_social} ha sido agregado exitosamente`)
        handleStep();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          //width: '100%'
        }}
      >
        <Box
          sx={{
            //maxWidth: 750,
            px: 3,
            pt: '5%',
            //width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Información del Cliente
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              <div>
                <Grid
                container
                spacing={3}
                >
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <TextField
                  error={!!(formik.touched.r_social && formik.errors.r_social)}
                  fullWidth
                  helperText={formik.touched.r_social && formik.errors.r_social}
                  label="Razón Social"
                  name="r_social"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.r_social}
                />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <TextField
                  error={!!(formik.touched.n_comercial && formik.errors.n_comercial)}
                  fullWidth
                  helperText={formik.touched.n_comercial && formik.errors.n_comercial}
                  label="Nombre Comercial"
                  name="n_comercial"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.n_comercial}
                />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <TextField
                  error={!!(formik.touched.tlf_fijo && formik.errors.tlf_fijo)}
                  fullWidth
                  helperText={formik.touched.tlf_fijo && formik.errors.tlf_fijo}
                  label="Teléfono Fijo"
                  name="tlf_fijo"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tlf_fijo}
                />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <TextField
                  error={!!(formik.touched.tlf_movil && formik.errors.tlf_movil)}
                  fullWidth
                  helperText={formik.touched.tlf_movil && formik.errors.tlf_movil}
                  label="Teléfono Móvil"
                  name="tlf_movil"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tlf_movil}
                />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <TextField
                  error={!!(formik.touched.correo && formik.errors.correo)}
                  fullWidth
                  helperText={formik.touched.correo && formik.errors.correo}
                  label="Correo Electrónico"
                  name="correo"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.correo}
                />
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    container
                    columnSpacing={1}
                >
                <Grid
                  xs={3}
                  md={3}
                  lg={3}  
                >
                  <TextField
                  error={!!(formik.touched.tipo_doc && formik.errors.tipo_doc)}
                  helperText={formik.touched.tipo_doc && formik.errors.tipo_doc}
                  fullWidth
                  select
                  defaultValue="J"
                  label="Tipo"
                  name="tipo_doc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tipo_doc}
                >
                  {tipos_doc.map((option) => (
                    <MenuItem key={option.value} value={option.value} defaultValue="J">
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
                <Grid
                  xs
                >
                  <TextField
                  error={!!(formik.touched.doc && formik.errors.doc)}
                  helperText={formik.touched.doc && formik.errors.doc}
                  fullWidth
                  label="RIF"
                  name="doc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.doc}
                />
               </Grid>
              </Grid>
            </Grid>
            </div>
                
                {/* <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="RIF"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                /> */}
                
              </Stack>
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
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Guardar
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default CustomerForm;
