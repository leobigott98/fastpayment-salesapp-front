import { Box, Button, Link, Stack, TextField, MenuItem, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserAutocomplete from "./user-autocomplete";
import SuccessModal from "./success-modal";
import GeneralErrorModal from "./general-error-modal";
import GeneralSuccessModal from "./general-success-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TranredConfirmation({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [v_ops_id, set_v_ops_id] = useState('');
  const [v_bank_id, set_v_bank_id] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('Ha ocurrido un error')
  const [customer, setCustomer] = useState({});
  const [commerceAddress, setCommerceAddress] = useState({});
  const [POSAddress, setPOSAddress] = useState({});
  const [contactAddress, setContactAddress] = useState({});
  const [contacto, setContacto] = useState({});
  const [sale_id, setSale_id] = useState(null)

  useEffect(()=>{
    setSale_id(id)
      const getCustomer = async ()=>{
        try{
          fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/customer/${sale_id}`, {
            headers: {
              "X-Auth-Token": window.localStorage.getItem('token')
            }
          })
          .then(async(response)=>{
            const json = await response.json()
            if(response.ok){
              if(json.result[0].error_num){
                setMessage(json.result[0].message)
                setError(true)
              }else{
                setCustomer(json.result[0][0])
                setCommerceAddress(json.result[1][0])
                setPOSAddress(json.result[1][1])
                setContactAddress(json.result[1][2])
                setContacto(json.result[2][0])
              }  
            }else{
              setMessage('Ha ocurrido un error')
              setError(true)
            }
          })
        }catch(err){
          console.log('catched')
          setMessage(err.message)
          setError(true)
        }
      }
      if(sale_id != null && open)  getCustomer();
      
    
  },[open, setSale_id, setMessage, setError, setCustomer, setCommerceAddress, setPOSAddress, setContactAddress, setContacto, id])


  const handleModalClose = () => {
    setOpenModal(false);
    setOpen(false);
  };

  
  
/*   const tranredLogin = async()=>{
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/auth/login`,{
        headers: {
          "X-Auth-Token": window.localStorage.getItem('token')
        }
      })
        .then(async(response)=>{
          const json = await response.json()
          if(response.ok){
            window.localStorage.setItem('tranred-token', json.access_token)
            console.log('logged in!')
          }else{
            if(json.message) setMessage(json.message)
            else setMessage(json.error)
          setError(true)
          }
        })
    } catch (error) {
      setMessage(error.message)
      setError(true)
    }

  } */

  const createCommerce = async(commerce, commerceAddress, POSAddress, contactAddress, contacto)=>{
    const body={
      commerce: commerce,
      commerceAddress: commerceAddress,
      POSAddress: POSAddress,
      contactAddress: contactAddress,
      contacto: contacto
    }
    console.log(body)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/customer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-Auth-Token": window.localStorage.getItem('token')
        },
        body: JSON.stringify(body)
      })
        .then(async(response)=>{
          const json = await response.json()
          if(response.ok){
            setMessage(json.message)
            setSuccess(true)
            console.log('created!')
          }else{
            setMessage(json.message)
            setError(true)
            console.log('did not work')
          }
        })
    } catch (error) {
      setMessage(error.message)
      setError(true)
    }
  }


  const handleCreateComerce = async ()=>{
    handleModalClose()
    createCommerce(customer, commerceAddress, POSAddress, contactAddress, contacto)
  }

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
          Aprovisionamiento con Tranred
        </Typography>
        <Typography 
        id="modal-modal-body" 
        //variant="h7" 
        component="p" 
        sx={{mb: 3}}>
          Revise la información del Cliente antes de continuar:
        </Typography>
        <Typography 
        id="modal-modal-body" 
        //variant="h7" 
        component="p" 
        sx={{mb: 3}}>
          <b>Nombre:</b> {customer.comerDesc} <br/> <b>RIF:</b> {customer.comerRif} <br/><b>Cuenta:</b> {customer.comerCuentaBanco}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2%" }}>
            <Button 
            onClick={handleModalClose} 
            variant="outlined" 
            sx={{ width: "30%" }}>
              No, Cancelar
            </Button>
            <Button
              onClick={handleCreateComerce}
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
