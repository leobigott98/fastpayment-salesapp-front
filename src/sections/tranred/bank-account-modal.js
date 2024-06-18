import { Box, Button, Modal, Typography, TextField } from "@mui/material"
import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Grid from "@mui/system/Unstable_Grid/Grid";
import AsyncAutocomplete from "src/components/async-autocomplete";

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

const BankAccountModal = ({open, setOpen}) => {
    const [v_bank_id, setBankId] = useState('')
    const [v_acct_number, setVAcctNumber] = useState('')

    const handleClose = () => {
        setOpen(false);
        setVAcctNumber('')
        setBankId('')
      };

  return (
    <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Introduzca los datos de la nueva cuenta bancaria
          </Typography>
          <Grid container spacing={2} direction="column" sx={{alignContent:"center", justifyContent:"center"}}>  
          <Grid xs={12}>
          <AsyncAutocomplete 
            bank 
            name="Banco" 
            url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-bancos`} 
            update={{v_bank_id, setBankId}} 
            /> 
          <TextField
            fullWidth
            required
            label="Número de Cuenta"
            name="v_acct_number"
            onChange={(e)=> setVAcctNumber(e.target.value)}
            value={v_acct_number}
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

export default BankAccountModal
