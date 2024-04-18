import { Box, Button, Link, Stack, TextField, MenuItem, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useCallback, useEffect, useMemo, useState } from "react";
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { useFormik } from "formik";
import * as Yup from "yup";
import UserAutocomplete from "./user-autocomplete";
import SuccessModal from "./success-modal";
import GeneralErrorModal from "./general-error-modal";
import GeneralSuccessModal from "./general-success-modal";
import { SerialTranredTable } from "./serial-tranred-table";
import  AsyncAutocomplete  from "./async-autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '40%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccountModal({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('Ha ocurrido un error')
  const [v_bank_id, setBankId] = useState('')
  const [v_acct_number, setVAcctNumber] = useState('')
  

  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

  return (
    <>
    <GeneralSuccessModal 
    message={message} 
    opened={success} 
    setOpened={setSuccess} />
    <GeneralErrorModal 
        opened={error} 
        setOpened={setError}
        message={message}
    />
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style}>
        <Typography 
        id="modal-modal-title" 
        variant="h6" 
        component="h2" 
        sx={{mb: 3}}>
        Indica el Número de Cuenta
        </Typography>

          <AsyncAutocomplete 
            bank 
            name="Banco" 
            url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/listar-bancos`} 
            update={{v_bank_id, setBankId}} 
            /> 
          <TextField
            //error={!!(formik.touched.v_acct_number && formik.errors.v_acct_number)}
            //helperText={formik.touched.v_acct_number && formik.errors.v_acct_number}
            fullWidth
            label="Número de Cuenta"
            name="v_acct_number"
            //onBlur={formik.handleBlur}
            //onChange={formik.handleChange}
            //value={formik.values.v_acct_number}
            value={v_acct_number}
            sx={{mt: '10px'}}
            />
            
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2%" }}>
            <Button 
            onClick={handleModalClose} 
            variant="outlined" 
            sx={{ width: "30%" }}>
              No, Cancelar
            </Button>
            <Button
              variant="contained"
              //color="error"
              sx={{ width: "30%" }}
            >
              Sí, Continuar
            </Button>
          </Box>
        
        
      </Box>
    </Modal>
    </>
  );
}
