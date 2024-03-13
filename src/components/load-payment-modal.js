import { Box, Button, Link, Stack, TextField, MenuItem, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserAutocomplete from "./user-autocomplete";
import SuccessModal from "./success-modal";
import GeneralErrorModal from "./general-error-modal";
import GeneralSuccessModal from "./general-success-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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

export default function PaymentModal({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [v_ops_id, set_v_ops_id] = useState("");
  const [v_bank_id, set_v_bank_id] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      v_pay_ref: "",
      v_pay_amount: '',
    },
/*     validationSchema: Yup.object({
      v_reference: Yup.string().required("Obligatorio"),
      v_amount: Yup.number().required("Obligatorio"),
    }), */
    onSubmit: async (values, helpers) => {
      console.log('submitted')
      try {
        const body = {
          v_sale_id: id,
          v_ops_id: v_ops_id.ops_id,
          v_bank_id: v_bank_id.bank_id,
          v_pay_ref: formik.values.v_pay_ref,
          v_pay_amount: formik.values.v_pay_amount,
        };
        console.log(body)

        await fetch("http://localhost:3001/api/v1/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }).then(async(response)=>{
          await response.json().then((result)=>{
            if(result.result[0].error_num> 0){
              setError(true);
              console.log(result)
            }else{
              setSuccess(true)
            }
          })
            
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        setError(true);
      }
    },
  });

  return (
    <>
    <GeneralSuccessModal message={'Pago Registrado con éxito'} opened={success} setOpened={setSuccess} />
    <GeneralErrorModal opened={error} setOpened={setError}/>
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 3}}>
          Registrar Pago
        </Typography>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} container columnSpacing={1}>
                  
                    <UserAutocomplete
                      name={"Tipo de Operación"}
                      url={"http://localhost:3001/api/v1/payments/options"}
                      payOptions
                      data={v_ops_id}
                      setData={set_v_ops_id}
                    />
                  
                    <UserAutocomplete
                      name={"Banco"}
                      url={"http://localhost:3001/api/v1/listar-bancos"}
                      banks
                      data={v_bank_id}
                      setData={set_v_bank_id}
                    />
                  
                </Grid>
                <Grid xs={12} container columnSpacing={1}>
                  <Grid xs={6}>
                    <TextField
                      error={!!(formik.touched.v_pay_ref && formik.errors.v_pay_ref)}
                      fullWidth
                      helperText={formik.touched.v_pay_ref && formik.errors.v_pay_ref}
                      label="Referencia"
                      name="v_pay_ref"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.v_pay_ref}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <TextField
                      error={!!(formik.touched.v_pay_amount && formik.errors.v_pay_amount)}
                      fullWidth
                      helperText={formik.touched.v_pay_amount && formik.errors.v_pay_amount}
                      label="Monto"
                      name="v_pay_amount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.v_pay_amount}
                    />
                  </Grid>
                </Grid>
                <Button
                  size="small"
                  type="submit"
                  //onClick={()=>{console.log('clicked!')}}
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
