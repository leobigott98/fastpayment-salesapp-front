import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext } from 'react';
import { CustomerContext } from 'src/contexts/customer-context';
import { OpenDialogContext} from 'src/contexts/openDialog-context';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  textAlign: 'center'
};

export default function SuccessModal({object}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const {
    openDialog,
    setOpenDialog,
    openSuccessModal,
    setOpenSuccessModal
  } = useContext(OpenDialogContext);

  const router = useRouter();

  const handleClose = () => {
    setOpen(false)
    setOpenDialog(false)
    setOpenSuccessModal(false)
    router.reload();
}; 

  useEffect(()=>{
    setOpen(openSuccessModal);
  })

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CheckCircleOutlineIcon fontSize='large' color='success'/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {object} creado con éxito
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: '2%'}}>
          <Button onClick={handleClose} variant='outlined' sx={{width: '100%'}}>Aceptar</Button>
          </Box>
          
        </Box>
      </Modal>
    </div>
  );
}