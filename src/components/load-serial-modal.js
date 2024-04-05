import { Box, Button, Link, Stack, TextField, MenuItem, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GeneralSuccessModal from 'src/components/general-success-modal';
import GeneralErrorModal from 'src/components/general-error-modal';
import UserAutocomplete from "./user-autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ubicaciones = [
  {
    id: 1,
    label: "Piso 1",
  },
];

export default function SerialModal({ open, setOpen, id, serial, assign}) {
  const [openModal, setOpenModal] = useState(open);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [assignSerial, setAssignSerial] = useState('');
  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

    const formik = useFormik({
      initialValues: {
        v_serial_num: "",
      },
      validationSchema: Yup.object({
        v_serial_num: Yup.string().required("Obligatorio"),
      }),
      onSubmit: async (values, helpers) => {
        try {
          const body = {
            v_prod_id: id,
            v_serial_num: formik.values.v_serial_num,
          };
  
          await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/seriales`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": window.localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
          }).then(async(result) => {
            const json = await result.json();
            if (json.error){
              setError(true);
            }
            else if (json.result[0].error_num> 0){
              setError(true);
            } else setSuccess(true);
          });
        } catch (err) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
          console.log(err);
          setError(true);
        }
      },
    });
  
    return (
      <>
      <GeneralSuccessModal 
      message={'Serial Cargado con Éxito'} 
      opened={success} 
      setOpened={setSuccess} />
      <GeneralErrorModal 
      opened={error} 
      setOpened={setError}/>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2">
            Cargar Serial
          </Typography>
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
                    <Grid xs={12}>
                      <TextField
                        error={!!(formik.touched.v_serial_num && formik.errors.v_serial_num)}
                        fullWidth
                        helperText={formik.touched.v_serial_num && formik.errors.v_serial_num}
                        label="Serial"
                        name="v_serial_num"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.v_serial_num}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    size="small"
                    type="submit"
                    // onClick={handleSubmit}
                    //disabled={activeStep === 4}
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                  >
                    Enviar
                  </Button>
                </Grid>
              </div>
            </Stack>
          </form>
        </Box>
      </Modal>
      </>
    );

}
