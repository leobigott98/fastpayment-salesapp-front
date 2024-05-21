import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GeneralErrorModal from "src/components/general-error-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomerInfo({ open, setOpen, index, customer }) {
  const [customerInfo, setCustomerInfo] = useState("");
  const [message, setMessage] = useState("Ha ocurrido un error");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers/${customer.cusm_id}`, {
        method: "GET",
        headers: {
          "X-Auth-Token": window.localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const json = await response.json();
        setCustomerInfo(json.result);
      } else {
        setMessage("Ha occurido un error");
        setError(true);
      }
    };
    if(open[index]){
      fetchCustomerData()
    }
  }, [open]);

  const handleModalOpen = ()=>{
    const openArray = open?.map((element, i)=>{
      if(i === index){
        return true
      }else{
        return element
      }
    })
    setOpen(openArray)
  }

  const handleModalClose = () => {
    const openArray = open?.map((element, i)=>{
      if(i === index){
        return false
      }else{
        return element
      }
    })
    setOpen(openArray)
  };

  return (
    <>
      <GeneralErrorModal message={message} opened={error} setOpened={setError} />
      <Modal
        open={open[index]}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Información de {customer.cusm_namec}
          </Typography>
          <Typography variant="p" component="p" sx={{mb: 2}}>
            <b>Persona de Contacto:</b> {customerInfo?.percon_name}{' '}{customerInfo?.percon_last} <br/>
            <b>Teléfono Local: </b>{customerInfo?.codLocal}{'-'}{customerInfo?.percon_local}<br/>
            <b>Celular: </b>{customerInfo?.codMovil}{'-'}{customerInfo?.percon_movil}<br/>
            <b>Correo: </b>{customerInfo?.percon_email}<br/>
            <b>Aprovisionado Tranred: </b>{customerInfo?.cusm_tranred? 'SI' : 'NO'}
          </Typography>
          <Button onClick={handleModalClose} variant="outlined" sx={{ width: "100%" }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleModalOpen}>
        Ver Detalle
      </Button>
    </>
  );
}
