import { Box, Button, Modal, Typography, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
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

const status_options = [
  {
    label: "Activo",
    value: 1,
  },
  {
    label: "Inactivo", 
    value: 0
  }
];

const StatusChangeModal = ({ open, setOpen, terminal }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [succes, setSucces] = useState(false)

  const handleClose = () => {
    setOpen(false);
    setStatus("");
  };

  const handleSubmit = async ()=>{
    const body ={
      status
    }
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/updateStatus/${terminal}`,{
        method: 'PUT',
        headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const json = await response.json()
      if(response.ok){
        setMessage(json.message)
        setSucces(true)
      }else{
        setMessage(json.message)
        setError(true)
      }
  
      }catch (error) {
        setMessage(error.message);
        setError(true);

    }   

  }

  return (
    <>
      <GeneralErrorModal opened={error} setOpened={setError} message={message}/>
      <GeneralSuccessModal opened={succes} setOpened={setSucces} message={message}/>
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Cambio de estatus
        </Typography>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ alignContent: "center", justifyContent: "center" }}
        >
          <Grid xs={12}>
            <TextField
              fullWidth
              select
              label="Estatus"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              {status_options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container spacing={1} xs={12}>
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

export default StatusChangeModal;
