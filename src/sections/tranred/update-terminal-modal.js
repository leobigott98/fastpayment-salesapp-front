import { Box, Button, Modal, Typography } from "@mui/material"
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Grid from "@mui/system/Unstable_Grid/Grid";

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


const UpdateTerminalModal = ({open, setOpen}) => {
    const [serial, setSerial] = useState('')
    const [model, setModel] = useState('')

    const handleClose = () => {
        setOpen(false);
        setSerial('');
        setModel('')
      };
  return (
    <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Actualizar Serial/Modelo
          </Typography>
          <Grid container spacing={2} direction="column" sx={{alignContent:"center", justifyContent:"center"}}>  
          <Grid xs={12}>
          
          </Grid>
          <Grid container spacing={1} xs={12}>
          <Grid xs={12} sm={6} md={6}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <Button fullWidth variant="contained">
              Procesar
            </Button>
          </Grid>

          </Grid>
          

          </Grid>
          


        </Box>

    </Modal>
  )
}

export default UpdateTerminalModal
