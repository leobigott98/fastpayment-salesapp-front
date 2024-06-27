import { Box, Button, Modal, Typography, TextField } from "@mui/material"
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
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

const AssignSimcard = ({open, setOpen, terminal, serial}) => {
    const [operadora, setOperadora] = useState('')
    const [serialSim, setSerialSim] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = () => {
        setOpen(false);
        setSerialSim('')
        setOperadora('')
      };

    const handleSubmit = async ()=>{

      const body = {
        status_terminal: terminal.status,
        serial_sim: serialSim,
        operador: operadora.cod_name,
        serial_id: serial.serial_id
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/simcard/`, {
        method: "POST",
        headers: {
          "X-Auth-Token": window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const json = await response.json()
      if(response.ok){
        if(json.result.error_num === 0){
          setMessage(json.result.message)
          setSuccess(true)
        }else{
          setMessage(json.result.message)
          setError(true)
        }
      }else{
        setMessage('Ha ocurrido un error')
        setError(true)
      }
      
        
      } catch (error) {
        setMessage(error.message)
        setError(true)
      }
    } 

  return (
    <>
      <GeneralErrorModal message={message} opened={error} setOpened={setError}/>
      <GeneralSuccessModal message={message} opened={success} setOpened={setSuccess}/>
      <Modal
        open={open}
        onClose={handleClose}>
        
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Introduzca los datos de la Simcard
          </Typography>
          <Grid container spacing={2} direction="column" sx={{alignContent:"center", justifyContent:"center"}}>  
          <Grid xs={12}>
          <UserAutocomplete 
            isOptionEqualToValue={(option, value) => option.cod_name === value.cod_name} 
            getOptionLabel={(option) => option.cod_name}
            name="Operadora" 
            url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/simcard/operadora`} 
            data={operadora}
            setData={setOperadora}
            /> 
          <TextField
            fullWidth
            required
            label="Serial del SIM"
            name="serialSim"
            onChange={(e)=> setSerialSim(e.target.value)}
            value={serialSim}
            sx={{mt: '10px'}}
            />
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
    
  )
}

export default AssignSimcard
