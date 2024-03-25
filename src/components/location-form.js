import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Link, Stack, TextField, Typography, MenuItem, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import LocationAutocomplete from "./location-autocomplete";

const LocationForm = ({ handleStep, handleStepBack, activeStep, context, name }) => {
  const theme = useTheme();

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openMunicipality, setOpenMunicipality] = useState(false);
  const [openParrish, setOpenParrish] = useState(false);
  const loadingCountry = openCountry && countryData.length === 0;
  const loadingState = openState && stateData.length === 0;
  const loadingMunicipality = openMunicipality && municipalityData.length === 0;
  const loadingParrish = openParrish && parrishData.length === 0;

  const {
    countryData,
    stateData,
    municipalityData,
    parrishData,
    setCountryData,
    setStateData,
    setMunicipalityData,
    setParrishData,
  } = useContext(CustomerContext);

  const {
    type,
    customer,
    country,
    state,
    city,
    municipality,
    parrish,
    street,
    floor,
    office,
    setType,
    setCustomer,
    setCountry,
    setState,
    setCity,
    setMunicipality,
    setParrish,
    setStreet,
    setFloor,
    setOffice,
  } = context;

  const formik = useFormik({
    initialValues: {
      /* type: type,
      customer: customer, */
      country: country,
      state: state,
      city: city,
      municipality: municipality,
      parrish: parrish,
      street: street,
      floor: floor,
      office: office,
    },
    validationSchema: Yup.object({
      country: Yup.number().required("required"),
      state: Yup.number().required("required"),
      city: Yup.number().required("required"),
      municipality: Yup.number().required("required"),
      parrish: Yup.number().required("required"),
      street: Yup.string().max(255).required("required"),
      floor: Yup.string().max(255).required("required"),
      office: Yup.string().max(255).required("required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(()=>{
    setStreet(formik.values.street);
    setFloor(formik.values.floor);
    setOffice(formik.values.office);
  },[formik.values.floor, formik.values.street, formik.values.office])

  useEffect(()=>{
    if(country === ''){
      setCountry('')
      setState('')
      setMunicipality('')
      setCity('')
      setParrish('')  
    }
    if(state === ''){
      setState('')
      setMunicipality('')
      setCity('')
      setParrish('')
    }
    if(municipality === ''){
      setMunicipality('')
      setParrish('')
    }
    if(city === ''){
      setCity('')
    }
    if(parrish === ''){
      setParrish('')
    }
    console.log(country, state, municipality, parrish)
  }, [country, state, municipality, parrish, city])

/*   useEffect(() => {
    setCountry(formik.values.country);
    setState(formik.values.state);
    setMunicipality(formik.values.municipality);
    setCity(formik.values.city);
    setParrish(formik.values.parrish);
    setStreet(formik.values.street);
    setFloor(formik.values.floor);
    setOffice(formik.values.office);
  }, [
    formik.values.country,
    formik.values.state,
    formik.values.municipality,
    formik.values.city,
    formik.values.parrish,
    formik.values.street,
    formik.values.floor,
    formik.values.office,
  ]); */

  useEffect(()=>{
    let active = true;
    if(!loadingCountry){
      return undefined
    }
    

  })

  return (
    <>
      {/* <Box
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
        > */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4">Dirección del {name}</Typography>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} container columnSpacing={1}>
                <Grid xs={4}>
                <LocationAutocomplete country name="País" url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-paises`} data={{pais_id: 232}} update={{country, setCountry}} dependant={{setState, setMunicipality, setCity, setParrish}} enabled={true} erase={false}/> 
                </Grid>
                <Grid xs={4}>
                <LocationAutocomplete state name="Estado" url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-estados`} data={{pais_id: 232}} update={{state, setState}} dependant={{setMunicipality, setCity, setParrish}} enabled={{country}} erase={country}/>
                </Grid>
                <Grid xs={4}>
                <LocationAutocomplete city name="Ciudad" url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-ciudades`} data={{pais_id: 232, estado_id: state.estad_id}} dependant={{city, setCity}} enabled={{state}} erase={state}/> 
                </Grid>
              </Grid>
              <Grid xs={12} container columnSpacing={1}>
                <Grid xs={4}>
                <LocationAutocomplete municipality name="Municipio" url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-municipios`} data={{pais_id: 232, estado_id: state.estad_id}} update={{municipality, setMunicipality}} dependant={{setParrish}} enabled={{state}} erase={state}/>
                </Grid>
                <Grid xs={4}>
                <LocationAutocomplete parrish name="Parroquia" url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-parroquias`} data={{pais_id: 232, estado_id: state.estad_id, municipio_id: municipality.municp_id}} update={{parrish, setParrish}} enabled={{municipality}} erase={municipality}/>
                </Grid>
                <Grid xs={4}>
                  <TextField
                    error={!!(formik.touched.street && formik.errors.street)}
                    fullWidth
                    helperText={formik.touched.street && formik.errors.street}
                    label="Avenida/Calle"
                    name="street"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.street}
                  />
                </Grid>
                <Grid xs={12} container columnSpacing={1} sx={{paddingBottom: '4%'}}>
                  <Grid xs={3}>
                    <TextField
                      error={!!(formik.touched.floor && formik.errors.floor)}
                      fullWidth
                      helperText={formik.touched.floor && formik.errors.floor}
                      label="Piso/Nivel"
                      name="floor"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.floor}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <TextField
                      error={!!(formik.touched.office && formik.errors.office)}
                      fullWidth
                      helperText={formik.touched.office && formik.errors.office}
                      label="Oficina/Comercio"
                      name="office"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.office}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Stack>
        {formik.errors.submit && (
          <Typography color="error" sx={{ mt: 3 }} variant="body2">
            {formik.errors.submit}
          </Typography>
        )}
      </form>
      {/*</></Box>
      </Box>*/}
    </>
  );
};

export default LocationForm;
