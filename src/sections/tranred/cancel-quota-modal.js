import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import CancelQuotaConfirmationModal from "./cancel-quota-confirmation-modal";

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

const CancelQuotaModal = ({ open, setOpen, terminal }) => {
  const [value, setValue] = useState(new Date());
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const startDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  const endDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

  const handleClose = () => {
    setOpen(false);
    setStartDate('')

    setValue(new Date());
  };

  const handleDate = ()=>{
    setStartDate((new Date(value[0] - startDateTzoffset)).toISOString().substring(0, 10))
    setEndDate((new Date(value[1] - endDateTzoffset)).toISOString().substring(0, 10))
  }

  return (
    <>{value.length === 2? 
      <CancelQuotaConfirmationModal
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          from={startDate}
          to={endDate}
          terminal={terminal}
        /> :<></>
    }
    
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Introduzca el rango de fecha a anular
        </Typography>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ alignContent: "center", justifyContent: "center" }}
        >
          <Grid xs={12} sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
            <Calendar onChange={setValue} value={value} selectRange />
          </Grid>
          <Grid container spacing={1} xs={12}>
            <Grid container column xs={12}>
              <Grid container row xs={12}>
                <Grid xs={6} md={3} sm={6}>
                  <Typography variant="h6">Terminal:</Typography>
                </Grid>
                <Grid xs={6} md={6} sm={6}>
                  <Typography variant="p">{terminal? terminal : ''}</Typography>
                </Grid>
              </Grid>
              <Grid container row xs={12} >
                <Grid xs={6} md={2} sm={6}>
                  <Typography variant="h6">Desde:</Typography>
                </Grid>
                <Grid xs={6} md={4} sm={6}>
                  <Typography variant="p" >{value.length? `${value[0].toDateString()}` : ''}</Typography>
                </Grid>
                <Grid xs={6} md={2} sm={6}>
                  <Typography variant="h6">Hasta:</Typography>
                </Grid>
                <Grid xs={6} md={4} sm={6}>
                  <Typography variant="p" >{value.length? `${value[1].toDateString()}` : ''}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="contained" onClick={()=>{
                handleDate()
                setOpenConfirmation(true)}} disabled={value.length !== 2? true: false} color="error">
                Anular Cuotas
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    </>
  );
};

export default CancelQuotaModal;