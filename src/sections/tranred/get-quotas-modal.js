import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Grid from "@mui/system/Unstable_Grid/Grid";
import CuotasModal from "./cuotas-modal";
import GeneralErrorModal from "src/components/general-error-modal";

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

const GetQuotasModal = ({ open, setOpen, terminal }) => {
  const [value, setValue] = useState();
  const [openCuotas, setOpenCuotas] = useState(false)
  const [cuotas, setCuotas] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const today = new Date()

  const handleClose = () => {
    setOpen(false);
    setValue();
  };

  const handleSubmit = async ()=>{
    const startDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const startDate = (new Date(value - startDateTzoffset)).toISOString().substring(0, 10);
    const endDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const endDate = (new Date(new Date(value.getFullYear(), value.getMonth() +1, 0) - endDateTzoffset)).toISOString().substring(0, 10);
    /* const startDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const startDate = (new Date(value[0] - startDateTzoffset)).toISOString().substring(0, 10);
    const endDateTzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const endDate = (new Date(value[1] - endDateTzoffset)).toISOString().substring(0, 10); */
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/getCuotasPendientes/${terminal}/1/${startDate}/${endDate}`, {
        method: 'GET',
        headers: {
          "X-Auth-Token": window.localStorage.getItem("token"),
        }
      })
      const json = await response.json()
      if(response.ok){
        setCuotas(json.data)
        setOpenCuotas(true)
      }else{
        setMessage(json.message)
        setError(true)
      }

    }catch(err){
      setMessage(err.message)
      setError(true)
    }
    
    
  }

  return (
    <>
    <GeneralErrorModal message={message} opened={error} setOpened={setError} />
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
      <CuotasModal data={cuotas} open={openCuotas} setOpen={setOpenCuotas}/>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Introduzca el rango de fecha a consultar
        </Typography>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ alignContent: "center", justifyContent: "center" }}
        >
          <Grid xs={12} sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
            <Calendar onChange={setValue} value={value} defaultView="year" maxDetail="year" activeStartDate={new Date(today.getFullYear(), today.getMonth(), 1 )} defaultValue={new Date(today.getFullYear(), today.getMonth(), 1 )}
              //selectRange
            />
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
                  <Typography variant="p" >{value? `${value.toDateString()}` : ''}</Typography>
                </Grid>
                <Grid xs={6} md={2} sm={6}>
                  <Typography variant="h6">Hasta:</Typography>
                </Grid>
                <Grid xs={6} md={4} sm={6}>
                  <Typography variant="p" >{value? `${new Date(value.getFullYear(), value.getMonth() +1, 0).toDateString()}` : ''}</Typography>
                </Grid>
              </Grid>
              {/* <Grid container row xs={12} >
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
              </Grid> */}
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <Button fullWidth variant="contained" onClick={handleSubmit} 
             //disabled={value.length !== 2? true :  false} 
              disabled={value? false: true}> 
                Consultar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    </>
  );
};

export default GetQuotasModal;
