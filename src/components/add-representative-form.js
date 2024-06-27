import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useContext } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import Autocomplete from "@mui/material/Autocomplete";
import UserAutocomplete from "./user-autocomplete";

const codMovilId = [
  {
    label: "0412",
    value: 1,
  },
  {
    label: "0414",
    value: 2,
  },
  {
    label: "0424",
    value: 3,
  },
  {
    label: "0416",
    value: 4,
  },
  {
    label: "0426",
    value: 5,
  },
];

const RepresentativeForm = ({ handleStep, handleStepBack, activeStep }) => {
  const theme = useTheme();
  const {
    v_percon_name,
    v_percon_last,
    v_cod_movilid,
    v_percon_movil,
    v_cod_localid,
    v_percon_local,
    v_percon_email,
    setPerconName,
    setPerconLast,
    setCodMovilId,
    setPerconMovil,
    setCodLocalId,
    setPerconLocal,
    setPerconEmail,
    cod_localid_data
  } = useContext(CustomerContext);

  //const [codLocalId, setCodLocalIdHook] = useState(null);

  const formik = useFormik({
    initialValues: {
      v_percon_name: v_percon_name,
      v_percon_last: v_percon_last,
      v_cod_movilid: v_cod_movilid,
      v_percon_movil: v_percon_movil,
      //variable_cod_localid: v_cod_localid,
      v_percon_local: v_percon_local,
      v_percon_email: v_percon_email,
    },
    validationSchema: Yup.object({
      v_percon_name: Yup.string().max(255).required("El nombre es requerido"),
      v_percon_last: Yup.string().max(255).required("El apellido is requerido"),
      v_cod_movilid: Yup.number().required("Indique el código telefónico"),
      v_percon_movil: Yup.string()
        .matches(/([0-9])/, "Debe ingresar un número de teléfono válido")
        .length(7)
        .required("Obligatorio"),
      //variable_cod_localid: Yup.object().required(),
      v_percon_local: Yup.string()
        .matches(/([0-9])/)
        .length(7)
        .required("Debe ingresar un número de teléfono válido"),
      v_percon_email: Yup.string().email("Debe ingresar un correo válido").required("Obligatorio"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleStep();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleChange = (value)=>{
    setCodLocalId(value)
    formik.handleChange
  }

  useEffect(() => {
    setPerconName(formik.values.v_percon_name),
      setPerconLast(formik.values.v_percon_last),
      setCodMovilId(formik.values.v_cod_movilid),
      setPerconMovil(formik.values.v_percon_movil),
      //setCodLocalId(formik.values.variable_cod_localid);
      setCodLocalId(v_cod_localid),
      console.log(v_cod_localid)
      //console.log(`${formik.values.variable_cod_localid} formik value`),
      setPerconLocal(formik.values.v_percon_local),
      setPerconEmail(formik.values.v_percon_email);
      //console.log(`${v_cod_localid} context value`)
  }, [
    formik.values.v_percon_name,
    formik.values.v_percon_last,
    formik.values.v_cod_movilid,
    formik.values.v_percon_movil,
    //formik.values.variable_cod_localid,
    v_cod_localid,
    //codLocalId,
    formik.values.v_percon_local,
    formik.values.v_percon_email,
    setCodLocalId, 
    setCodMovilId,
    setPerconEmail,
    setPerconLast,
    setPerconLocal,
    setPerconMovil,
    setPerconName
  ]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: 3,
            pt: "5%",
          }}
        >
          <div>
            <Stack 
            spacing={1} 
            sx={{ mb: 3 }}>
              <Typography variant="h4">Representante Legal</Typography>
            </Stack>
            <form 
            noValidate 
            onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <div>
                  <Grid 
                  container 
                  spacing={3}>
                    <Grid 
                    xs={12} 
                    container 
                    columnSpacing={1}>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_percon_name && formik.errors.v_percon_name)}
                          fullWidth
                          helperText={formik.touched.v_percon_name && formik.errors.v_percon_name}
                          label="Nombres del Representante Legal"
                          name="v_percon_name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_percon_name}
                        />
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_percon_last && formik.errors.v_percon_last)}
                          fullWidth
                          helperText={formik.touched.v_percon_last && formik.errors.v_percon_last}
                          label="Apellidos del Representante Legal"
                          name="v_percon_last"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_percon_last}
                        />
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_percon_email && formik.errors.v_percon_email)}
                          fullWidth
                          helperText={formik.touched.v_percon_email && formik.errors.v_percon_email}
                          label="Correo Electrónico"
                          name="v_percon_email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_percon_email}
                        />
                      </Grid>
                    </Grid>
                    <Grid 
                    xs={12} 
                    container 
                    columnSpacing={1}>
                      <Grid xs={2}>
                        <TextField
                          error={!!(formik.touched.v_cod_movilid && formik.errors.v_cod_movilid)}
                          fullWidth
                          select
                          helperText={formik.touched.v_cod_movilid && formik.errors.v_cod_movilid}
                          label="Código Móvil"
                          name="v_cod_movilid"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_cod_movilid}
                        >
                          {codMovilId.map((option) => (
                            <MenuItem 
                            key={option.value} 
                            value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_percon_movil && formik.errors.v_percon_movil)}
                          fullWidth
                          helperText={formik.touched.v_percon_movil && formik.errors.v_percon_movil}
                          label="Teléfono Móvil"
                          name="v_percon_movil"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_percon_movil}
                        />
                      </Grid>
                      <Grid xs={3}>
                      <UserAutocomplete 
                      name={'Código'} 
                      url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/get-codlocalid`} 
                      data={v_cod_localid} 
                      setData={setCodLocalId} 
                      isOptionEqualToValue={(option, value) => option.cod_value === value.cod_value}
                      getOptionLabel={(option) => option.cod_value}
                      />
                        {/* <Autocomplete
                          value={v_cod_localid}
                          id="variable_cod_localid"
                          onChange={(event, value)=>
                          { handleChange(value)}}
                          options={cod_localid_data}
                          autoHighlight
                          getOptionLabel={(option) => option.cod_value}
                          renderOption={(props, option)=>(
                            <Box component="li" {...props}>
                              {option.cod_value}
                            </Box>
                          )}
                          renderInput={(params)=>(
                            <TextField
                            {...params}
                            label="Código"
                            id="variable_cod_localid"
                            error={!!(formik.touched.variable_cod_localid && formik.errors.variable_cod_localid)}
                            helperText={formik.touched.variable_cod_localid && formik.errors.variable_cod_localid}
                            onBlur={formik.handleBlur}
                            value={v_cod_localid}
                            onChange={(event, value)=>
                          { handleChange(value)}}
                            inputProps={{
                              ...params.inputProps,
                              autocomplete: 'new-password'
                            }}
                            />
                          )}
                          //onChange={(event, newValue)=>{setCodLocalId(newValue)}}
                          //value={formik.values.v_cod_localid}
                          //isOptionEqualToValue={(option) => option.title === option.cod_localid}
                          //sx={{ width: 300 }}
                          /> */}
                      </Grid>
                      <Grid xs={3}>
                        <TextField
                          error={!!(formik.touched.v_percon_local && formik.errors.v_percon_local)}
                          fullWidth
                          helperText={formik.touched.v_percon_local && formik.errors.v_percon_local}
                          label="Teléfono Local"
                          name="v_percon_local"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_percon_local}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Stack>
              {formik.errors.submit && (
                <Typography 
                color="error" 
                sx={{ mt: 3 }} 
                variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Grid xs={12} container columnSpacing={1}>
                <Button size="small" onClick={handleStepBack} disabled={activeStep === 0}>
                  {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Anterior
                </Button>

                <Button
                  size="small"
                  type="submit"
                  disabled={activeStep === 5}
                  sx={{ marginLeft: "auto" }}
                >
                  Siguiente
                  {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              </Grid>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default RepresentativeForm;
