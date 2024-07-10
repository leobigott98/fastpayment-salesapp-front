import { Box, Button, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import UserAutocomplete from "src/components/user-autocomplete";
import GeneralErrorModal from "src/components/general-error-modal";
import GeneralSuccessModal from "src/components/general-success-modal";

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

const UpdateTerminalModal = ({ open, setOpen, terminal }) => {
  const [serial, setSerial] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(()=>{
    if(model != null){
      setDisable(false)
    } else if( model == null){
      setDisable(true)
    }
  }, [model])

  const handleClose = () => {
    setOpen(false);
    setSerial("");
    setModel("");
  };

  const handleSubmit = async () => {
    const body = {
      terminal,
      modelo: model.modelo_tr,
      serial: serial.serial_num,
    };
    console.log(body)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/update`,
        {
          method: "POST",
          headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const json = await response.json();
      if (response.ok) {
        setMessage(json.message);
        setSuccess(true);
      } else {
        setMessage(json.message);
        setError(true);
      }
    } catch (err) {
      setMessage(err.message);
      setError(true);
    }
  };

  return (
    <>
      <GeneralErrorModal opened={error} setOpened={setError} message={message} />
      <GeneralSuccessModal opened={success} setOpened={setSuccess} message={message} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Actualizar Serial/Modelo
          </Typography>
          <Grid
            container
            spacing={2}
            direction="column"
            sx={{ alignContent: "center", justifyContent: "center" }}
          >
            <Grid xs={12}></Grid>
            <Grid container spacing={1} xs={12}>
              <UserAutocomplete
                url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/products`}
                isOptionEqualToValue={(option, value) => option.modelo === value.modelo}
                getOptionLabel={(option) => option.modelo}
                data={model}
                setData={setModel}
                name={"Producto"}
              />
              <UserAutocomplete
                url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/seriales/all`}
                isOptionEqualToValue={(option, value) => option.serial_num === value.serial_num}
                getOptionLabel={(option) => option.serial_num}
                data={serial}
                setData={setSerial}
                name={"Serial"}
                body={model == null ? null : { product_id: model.id }}
                disabled={disable}
              />
              <Grid xs={12} sm={6} md={6}>
                <Button fullWidth variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Button fullWidth variant="contained" onClick={handleSubmit}>
                  Procesar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateTerminalModal;
