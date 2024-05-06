import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProgressMobileStepper from "./add-customer-stepper";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AsyncAutocomplete from "./async-autocomplete";
import { useContext } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import { OpenDialogContext } from "src/contexts/openDialog-context";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import GeneralErrorModal from "./general-error-modal";
import GeneralSuccessModal from "./general-success-modal";

const ProductForm = () => {
  const theme = useTheme();
  const { openSuccessModal, setOpenSuccessModal } = useContext(OpenDialogContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      v_prod_brand: "",
      v_prod_model: "",
      v_prod_spec: "",
      v_prod_price: "",
      v_prod_serial: false,
    },
    validationSchema: Yup.object({
      v_prod_brand: Yup.string().required("Obligatorio"),
      v_prod_model: Yup.string().required("Obligatorio"),
      v_prod_spec: Yup.string().required("Obligatorio"),
      v_prod_price: Yup.number().required("Obligatorio"),
      v_prod_serial: Yup.boolean().required("Obligatorio"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(values),
        }).then(async (result) => {
          if (result.ok) {
            const json = await result.json();
            //console.log(json.result.messge)
            setMessage(json.result[0].messge);
            if (json.error_num > 5000) {
              setError(true);
            } else {
              setSuccess(true);
            }
          }
          //setOpenSuccessModal(true)
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setMessage(err.message);
        setError(true);
      }
    },
  });

  return (
    <>
      <GeneralErrorModal opened={error} setOpened={setError} message={message} />
      <GeneralSuccessModal opened={success} setOpened={setSuccess} message={message} />
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          //display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          m: "auto",
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
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Nuevo Producto</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <div>
                  <Grid container spacing={3}>
                    <Grid xs={12} container columnSpacing={1}>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_prod_brand && formik.errors.v_prod_brand)}
                          fullWidth
                          helperText={formik.touched.v_prod_brand && formik.errors.v_prod_brand}
                          label="Marca"
                          name="v_prod_brand"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_prod_brand}
                        />
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_prod_model && formik.errors.v_prod_model)}
                          fullWidth
                          helperText={formik.touched.v_prod_model && formik.errors.v_prod_model}
                          label="Modelo"
                          name="v_prod_model"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_prod_model}
                        />
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          error={!!(formik.touched.v_prod_price && formik.errors.v_prod_price)}
                          fullWidth
                          helperText={formik.touched.v_prod_price && formik.errors.v_prod_price}
                          label="Precio"
                          name="v_prod_price"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="email"
                          value={formik.values.v_prod_price}
                        />
                      </Grid>
                    </Grid>
                    <Grid xs={12} container columnSpacing={1}>
                      <Grid xs={12}>
                        <TextField
                          error={!!(formik.touched.v_prod_spec && formik.errors.v_prod_spec)}
                          fullWidth
                          multiline
                          rows={4}
                          helperText={formik.touched.v_prod_spec && formik.errors.v_prod_spec}
                          label="Especificaciones"
                          name="v_prod_spec"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_prod_spec}
                        />
                      </Grid>
                    </Grid>
                    <Grid xs={12} container columnSpacing={1}>
                      <Grid xs={12} md={6} lg={4}>
                        <FormControlLabel
                          required
                          control={<Checkbox />}
                          //error={!!(formik.touched.v_prod_serial && formik.errors.v_prod_serial)}
                          //fullWidth
                          //helperText={formik.touched.v_prod_serial && formik.errors.v_prod_serial}
                          label="¿El producto tiene seriales?"
                          name="v_prod_serial"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.v_prod_serial}
                        />
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

              <Button fullWidth size="medium" sx={{ mt: 3 }} type="submit" variant="contained">
                Guardar
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ProductForm;
