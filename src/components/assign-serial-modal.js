import { Box, Button, Link, Stack, TextField, MenuItem, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GeneralSuccessModal from "src/components/general-success-modal";
import GeneralErrorModal from "src/components/general-error-modal";
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

export default function AssignSerialModal({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [assignSerial, setAssignSerial] = useState("");
  const [product, setProduct] = useState(null);
  const [disable, setDisable] = useState(true)
  const [message, setMessage] = useState('')
  //const [selectedProduct, setSelectedProduct] = useState('')
  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

  useEffect(()=>{
    if(product != null){
      setDisable(false)
    }   
  }, [product, setProduct])

  const formik = useFormik({
    initialValues: {
      v_sale_id: "",
      v_serial_num: "",
    },
    /*  validationSchema: Yup.object({
        v_serial_num: Yup.string().required("Obligatorio"),
      }), */
    onSubmit: async (values, helpers) => {
      try {
        const body = {
          v_sale_id: id,
          v_serial_num: assignSerial.serial_num,
          v_prod_id: product.prod_id
        };
        console.log(body);
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/seriales/asignar-serial`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }).then(async (response) => {
          await response.json().then((result) => {
            if (result.result[0].error_num == 0) {
              setSuccess(true);
            } else {
              setError(true);
              setMessage(result.result[0].message)
              console.log(result);
              throw new Error("error!");
            }
          });
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
        message={"Serial Cargado con Éxito"}
        opened={success}
        setOpened={setSuccess}
      />
      <GeneralErrorModal opened={error} setOpened={setError} message={message} />
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Asignar Serial
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div>
              <Grid container spacing={3} columnSpacing={1}>
                <Grid xs={12} columnSpacing={1}>
                  <UserAutocomplete
                    url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/products/sale`}
                    saleProducts
                    data={product}
                    setData={setProduct}
                    name={"Producto"}
                    body={{ sale_id: id }}
                  />
                  </Grid>
                  <Grid xs={12} columnSpacing={1}>
                    <UserAutocomplete
                      url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/seriales/all`}
                      serials
                      data={assignSerial}
                      setData={setAssignSerial}
                      name={"Serial"}
                      body={product == null ? null : { product_id: product.prod_id }}
                      disabled={disable}
                    />
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
          </form>
        </Box>
      </Modal>
    </>
  );
}
