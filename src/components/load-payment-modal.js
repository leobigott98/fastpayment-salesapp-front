import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  MenuItem,
  Modal,
  Typography,
  Tooltip,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserAutocomplete from "./user-autocomplete";
import SuccessModal from "./success-modal";
import GeneralErrorModal from "./general-error-modal";
import GeneralSuccessModal from "./general-success-modal";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [v_ops_id, set_v_ops_id] = useState("");
  const [v_bank_id, set_v_bank_id] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/upload`, {
      method: "POST",
      headers: {
        
        "X-Auth-Token": window.localStorage.getItem("token"),
      },
      body: data,
    }).then((response) => {
      const filename = response;
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    });
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  const formik = useFormik({
    initialValues: {
      v_pay_ref: "",
      v_pay_amount: "",
    },
    /*     validationSchema: Yup.object({
      v_reference: Yup.string().required("Obligatorio"),
      v_amount: Yup.number().required("Obligatorio"),
    }), */
    onSubmit: async (values, helpers) => {
      const payRef = () => {
        if ((v_ops_id?.ops_id == 1) | (v_ops_id?.ops_id == 4)) {
          return Date.now();
        } else {
          return formik.values.v_pay_ref;
        }
      };
      try {
        const body = {
          v_sale_id: id,
          v_ops_id: v_ops_id.ops_id,
          v_bank_id: v_bank_id.bank_id,
          v_pay_ref: payRef(),
          v_pay_amount: formik.values.v_pay_amount,
        };
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/payments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(body),
        }).then(async (response) => {
          await response.json().then((result) => {
            setMessage(result.result[0].message);
            if (result.result[0].error_num > 0) {
              setError(true);
            } else {
              setSuccess(true);
            }
          });
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
      <GeneralSuccessModal message={message} opened={success} setOpened={setSuccess} />
      <GeneralErrorModal opened={error} setOpened={setError} message={message} />
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Registrar Pago
          </Typography>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <div>
                <Grid container spacing={2}>
                  <Grid xs={12} container>
                    <Grid xs={12}>
                      <UserAutocomplete
                        name={"Tipo de Operación"}
                        url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/payments/options`}
                        payOptions
                        data={v_ops_id}
                        setData={set_v_ops_id}
                      />
                    </Grid>
                    {(v_ops_id?.ops_id == 2) | (v_ops_id?.ops_id == 3) ? (
                      <Grid xs={12}>
                        <UserAutocomplete
                          name={"Banco"}
                          url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-bancos`}
                          banks
                          data={v_bank_id}
                          setData={set_v_bank_id}
                        />
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    xs={12}
                    container
                    spacing={1}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Grid xs={12} sm={6} md={6}>
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
                    <Grid xs={12} sm={6} md={6}>
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
                    { /*
                    <Grid xs={12}>
                      <Tooltip title="Subir Referencia">
                        <Input type="file" hidden onChange={uploadPhoto}>
                          <Button variant="outlined" fullWidth onClick={uploadPhoto} type="">
                          <AddPhotoAlternateIcon />
                        </Button>
                        </Input>
                      </Tooltip>
                    </Grid>
                    */}
                    <Grid xs={12} md={12} sm={12}>
                      <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        sx={{ display: "block", margin: "auto" }}
                        fullWidth
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
