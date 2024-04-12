import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProgressMobileStepper from "./add-customer-stepper";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import  AsyncAutocomplete  from "./async-autocomplete";
import { useContext } from 'react';
import { CustomerContext } from 'src/contexts/customer-context';

const tipos_doc = [
  {
    value: 1,
    label: "V",
  },
  {
    value: 2,
    label: "E",
  },
  {
    value: 3,
    label: "P",
  },
  {
    value: 4,
    label: "J",
  },
  {
    value: 5,
    label: "G",
  },
];

const tipos_persona = [
  {
    value: 1,
    label: "Natural",
  },
  {
    value: 2,
    label: "Jurídico",
  },
];

const CustomerForm = ({ handleStep, handleStepBack, activeStep }) => {
  const theme = useTheme();
  const { v_person_id, 
          setPersonId, 
          v_doc_typeid, 
          setDocTypeId, 
          v_cusm_ndoc, 
          setCusmNdOC, 
          v_actv_id, 
          setActvId, 
          v_cusm_namec, 
          setCusmNameC, 
          v_bank_id, 
          setBankId, 
          v_acct_number, 
          setAcctNumber} = useContext(CustomerContext);

  const formik = useFormik({
    initialValues: {
      v_person_id: v_person_id,
      v_doc_typeid: v_doc_typeid,
      v_cusm_ndoc: v_cusm_ndoc,
      v_actv_id: v_actv_id,
      v_cusm_namec: v_cusm_namec,
      v_bank_id: v_bank_id,
      v_acct_number: v_acct_number,
    },
    validationSchema: Yup.object({
      v_person_id: Yup.number().moreThan(0).lessThan(3).required("Obligatorio"),
      v_doc_typeid: Yup.number().moreThan(0).lessThan(6).required("Obligatorio"),
      v_cusm_ndoc: Yup.string()
        .matches(/([0-9])/)
        .max(10)
        .min(7)
        .required("Debe ingresar un RIF/Cédula válido"),
     // v_actv_id: Yup.number().required("Obligatorio"),
      v_cusm_namec: Yup.string()
        .matches(/([A-Za-zÀ-ÿ&']+(\s{0,1}))+/g, "Debe ser un nombre válido")
        .max(255)
        .required("Debe ingresar un nombre válido"),
      //v_bank_id: Yup.number().required("Obligatorio"),
      v_acct_number: Yup.string()
        .matches(/([0-9])/)
        .length(20)
        .required("Debe ingresar un número de cuenta válido"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        /* const response = await fetch('http://localhost:3001/api/v1/customers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.sessionStorage.getItem('token')
          },
          body: JSON.stringify(values)
        })
        const jsonResponse = await response.json()
        //console.log(jsonResponse);
        alert(`El cliente ${jsonResponse.result[0].v_cusm_namec} ha sido agregado exitosamente`) */
        handleStep();
        //setPersonId(values.v_person_id)
        //alert(`current context ${v_cusm_namec}`);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

    useEffect(()=>{
      setPersonId(formik.values.v_person_id)
      setDocTypeId(formik.values.v_doc_typeid) 
      setCusmNdOC(formik.values.v_cusm_ndoc) 
      //setActvId(formik.values.v_actv_id) 
      setCusmNameC(formik.values.v_cusm_namec) 
      //setBankId(formik.values.v_bank_id) 
      setAcctNumber(formik.values.v_acct_number)  
  }, [formik.values.v_person_id, formik.values.v_doc_typeid, formik.values.v_cusm_ndoc, formik.values.v_actv_id, formik.values.v_cusm_namec, formik.values.v_bank_id, formik.values.v_acct_number, setAcctNumber, setCusmNameC, setCusmNdOC, setDocTypeId, setPersonId])

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          //width: '100%'
        }}
      >
        <Box
          sx={{
            //maxWidth: 750,
            px: 3,
            pt: "5%",
            //width: '100%'
          }}
        >
          <div>
            <Stack 
            spacing={1} 
            sx={{ mb: 3 }}>
              <Typography variant="h4">Información del Cliente</Typography>
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
                      <Grid xs={3}>
                        <TextField
                          error={!!(formik.touched.v_person_id && formik.errors.v_person_id)}
                          fullWidth
                          helperText={formik.touched.v_person_id && formik.errors.v_person_id}
                          select
                          label="Tipo de Persona"
                          name="v_person_id"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_person_id}
                        >
                          {tipos_persona.map((option) => (
                            <MenuItem 
                            key={option.value} 
                            value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid xs={3}>
                        <TextField
                          error={!!(formik.touched.v_doc_typeid && formik.errors.v_doc_typeid)}
                          fullWidth
                          helperText={formik.touched.v_doc_typeid && formik.errors.v_doc_typeid}
                          select
                          label="Tipo de Documento"
                          name="v_doc_typeid"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_doc_typeid}
                        >
                          {tipos_doc.map((option) => (
                            <MenuItem 
                            key={option.value} 
                            value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid xs={6}>
                        <TextField
                          error={!!(formik.touched.v_cusm_ndoc && formik.errors.v_cusm_ndoc)}
                          fullWidth
                          helperText={formik.touched.v_cusm_ndoc && formik.errors.v_cusm_ndoc}
                          label="Número de Documento"
                          name="v_cusm_ndoc"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_cusm_ndoc}
                        />
                      </Grid>
                    </Grid>
                    <Grid 
                    xs={12} 
                    container 
                    columnSpacing={1}>
                      <Grid 
                      xs={12} 
                      md={6} 
                      lg={4}>
                      <AsyncAutocomplete 
                        activity 
                        name="Actividad de la Empresa" 
                        url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-actividades`} 
                        update={{v_actv_id, setActvId}} 
                        /> 
                      </Grid>
                      <Grid xs={8}>
                        <TextField
                          error={!!(formik.touched.v_cusm_namec && formik.errors.v_cusm_namec)}
                          fullWidth
                          helperText={formik.touched.v_cusm_namec && formik.errors.v_cusm_namec}
                          label="Nombre de la Empresa"
                          name="v_cusm_namec"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="email"
                          value={formik.values.v_cusm_namec}
                        />
                      </Grid>
                    </Grid>
                    <Typography 
                    variant="h6" 
                    sx={{ marginLeft: "1%" }}>
                      Datos Bancarios del Cliente
                    </Typography>
                    <Grid 
                    xs={12} 
                    container 
                    columnSpacing={1}>
                      <Grid 
                      xs={12} 
                      md={6} 
                      lg={4}>
                      <AsyncAutocomplete 
                        bank 
                        name="Banco" 
                        url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-bancos`} 
                        update={{v_bank_id, setBankId}} 
                        /> 
                      </Grid>
                      <Grid xs>
                        <TextField
                          error={!!(formik.touched.v_acct_number && formik.errors.v_acct_number)}
                          helperText={formik.touched.v_acct_number && formik.errors.v_acct_number}
                          fullWidth
                          label="Número de Cuenta"
                          name="v_acct_number"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_acct_number}
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

              <Button size="small" onClick={handleStepBack} disabled={activeStep === 0} >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Anterior
              </Button>

              <Button size="small" type="submit" disabled={activeStep === 5} sx={{marginLeft: 'auto'}}>
                Siguiente
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>

              </Grid>

              {/* <Button
                fullWidth
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Siguiente
              </Button> */}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default CustomerForm;
