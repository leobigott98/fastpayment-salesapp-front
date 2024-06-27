import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import CustomerInfo from "./customer-info-modal";
import { FullScreenDialog } from "src/components/fullscreen-dialog";
import { OpenDialogContext } from "src/contexts/openDialog-context";

export default function DotsMenu({ open, index, setOpen, customer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const value = { openDialog, setOpenDialog, openSuccessModal, setOpenSuccessModal };
  const products = false
  const sales = false

  const handleDialogOpen = ()=>{
    setOpenDialog(true);
  }

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
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Tooltip title="Opciones">
        <Button
          id="basic-button"
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
            <MenuItem key={'edit'} onClick={handleModalOpen}>Ver Detalle</MenuItem>
            <MenuItem key={'edit'} onClick={handleDialogOpen}>Modificar</MenuItem>
      </Menu>
        <>
        <CustomerInfo open={open} index={index} handleModalClose={handleModalClose} customer={customer} />
        <OpenDialogContext.Provider 
        value={value}>
        {products ? (
          <FullScreenDialog 
          products 
          title={"Producto"} />
        ) : sales ? (
          <FullScreenDialog 
          sales 
          title={"Cotización"} />
        ) : (
          <FullScreenDialog 
          title={"Cliente"} />
        )}
      </OpenDialogContext.Provider>
        </>
    </div>
  );
}
