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

export default function AlertModal({opened, setOpened}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const {
    setPersonId,  
    setDocTypeId,  
    setCusmNdOC,  
    setActvId,  
    setCusmNameC,  
    setBankId,  
    setAcctNumber,
    setPerconName,
    setPerconLast,
    setCodMovilId,
    setPerconMovil,
    setCodLocalId,
    setPerconLocal,
    setPerconEmail,
    set_v_com_add_typeid,
    set_v_com_cusm_id,
    set_v_com_pais_id,
    set_v_com_estad_id,
    set_v_com_ciud_id,
    set_v_com_municp_id,
    set_v_com_parr_id,
    set_v_com_add_street,
    set_v_com_add_level,
    set_v_com_add_ofic,
    set_v_pos_add_typeid,
    set_v_pos_cusm_id,
    set_v_pos_pais_id,
    set_v_pos_estad_id,
    set_v_pos_ciud_id,
    set_v_pos_municp_id,
    set_v_pos_parr_id,
    set_v_pos_add_street,
    set_v_pos_add_level,
    set_v_pos_add_ofic,
    set_v_rep_add_typeid,
    set_v_rep_cusm_id,
    set_v_rep_pais_id,
    set_v_rep_estad_id,
    set_v_rep_ciud_id,
    set_v_rep_municp_id,
    set_v_rep_parr_id,
    set_v_rep_add_street,
    set_v_rep_add_level,
    set_v_rep_add_ofic,
  } = useContext(CustomerContext);
  const {
    openDialog,
    setOpenDialog
  } = useContext(OpenDialogContext);

  const eraseContext = ()=>{
    setPersonId('');  
    setDocTypeId('');  
    setCusmNdOC('');  
    setActvId('');
    setCusmNameC(''); 
    setBankId('');
    setAcctNumber('');
    setPerconName('');
    setPerconLast('');
    setCodMovilId('');
    setPerconMovil('');
    setCodLocalId('');
    setPerconLocal('');
    setPerconEmail('');
    set_v_com_add_typeid('');
    set_v_com_cusm_id('');
    set_v_com_pais_id('');
    set_v_com_estad_id('');
    set_v_com_ciud_id('');
    set_v_com_municp_id('');
    set_v_com_parr_id('');
    set_v_com_add_street('');
    set_v_com_add_level('');
    set_v_com_add_ofic('');
    set_v_pos_add_typeid('');
    set_v_pos_cusm_id('');
    set_v_pos_pais_id('');
    set_v_pos_estad_id('');
    set_v_pos_ciud_id('');
    set_v_pos_municp_id('');
    set_v_pos_parr_id('');
    set_v_pos_add_street('');
    set_v_pos_add_level('');
    set_v_pos_add_ofic('');
    set_v_rep_add_typeid('');
    set_v_rep_cusm_id('');
    set_v_rep_pais_id('');
    set_v_rep_estad_id('');
    set_v_rep_ciud_id('');
    set_v_rep_municp_id('');
    set_v_rep_parr_id('');
    set_v_rep_add_street('');
    set_v_rep_add_level('');
    set_v_rep_add_ofic('');
  }

  const handleClose = () => {
    setOpen(false)
    setOpened(false)
}; 
  const handleDialogClose = ()=>{
    setOpen(false);
    setOpened(false);
    setOpenDialog(false);
    eraseContext();
  }

  useEffect(()=>{
    setOpen(opened);
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
        <WarningIcon fontSize='large' color='error'/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Seguro quieres cerrar?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Al cerrar esta pestaña perderás toda la información que has introducido.
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'space-between', mt: '2%'}}>
          <Button onClick={handleClose} variant='outlined' sx={{width: '30%'}}>No, Cancelar</Button>
          <Button  onClick={handleDialogClose} variant='contained' color='error' sx={{width: '30%'}}>Sí, Borrar</Button>
          </Box>
          
        </Box>
      </Modal>
    </div>
  );
}