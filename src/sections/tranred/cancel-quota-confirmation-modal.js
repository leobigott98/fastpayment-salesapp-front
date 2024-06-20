import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useState } from "react";
import GeneralErrorModal from "src/components/general-error-modal";
import GeneralSuccessModal from "src/components/general-success-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  blockSize: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CancelQuotaConfirmationModal = ({ open, setOpen, cuota, from, to, terminal }) => {
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const startDate = from;
    const endDate = to;

    const terminalToDelete = terminal? terminal : cuota.TERMINAL

    const body = {
      terminal: terminalToDelete,
      startDate,
      endDate,
      planId: "1",
      personResponsible: "Leonardo Bigott",
      comments: motivo,
    };

     try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/anularCuotas`,
        {
          method: "POST",
          headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const json = await response.json()
      if(response.ok){
        setMessage(json.message)
        setSucces(true)
      }else{
        setMessage(json.message)
        setError(true)
      }
    } catch (error) {
      setMessage(error.message);
      setError(true);
    } 
  };

  return (
    <>
    <GeneralErrorModal opened={error} setOpened={setError} message={message}/>
    <GeneralSuccessModal opened={succes} setOpened={setSucces} message={message}/>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2} direction="column">
          <Typography id="modal-modal-title" variant="h6">
            Anulación de Cuota para terminal: {cuota? cuota?.TERMINAL : terminal}
          </Typography>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} md={3}>
              <Typography id="modal-modal-title" variant="h6">
                Desde:
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Typography id="modal-modal-title" variant="p">
                {from?.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Typography id="modal-modal-title" variant="h6">
                Hasta:
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Typography id="modal-modal-title" variant="p">
                {to?.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Typography id="modal-modal-title" variant="h6">
                Motivo de Anulación
              </Typography>
            </Grid>
            <Grid xs={12}>
              <TextField
                multiline
                label="Motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    </>
  );
};

export default CancelQuotaConfirmationModal;
