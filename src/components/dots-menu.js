import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import InventoryModal from "./load-inventory-modal";
import SerialModal from "./load-serial-modal";
import PaymentModal from "./load-payment-modal";
import AssignSerialModal from "./assign-serial-modal";

export default function DotsMenu({ sales, id, balance }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);
  const [serialModalOpen, setSerialModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleSerialModalOpen = () => setSerialModalOpen(true);
  const handleAssignModalOpen = () => setAssignModalOpen(true);
  const handleSerialModalClose = () => setSerialModalOpen(false);
  const handleModalClose = () => setModalOpen(false);
  const handleOptionClick = ()=>{
    handleClose();
  }
  const handleInventoryOptionClick = () => {
    handleClose();
    handleModalOpen();
  };
  const handleAssignmentOptionClick = () => {
    handleClose();
    handleAssignModalOpen();
  };
  const handlePaymentOptionClick = () => {
    handleClose();
    handleModalOpen();
  };
  const handleSerialOptionClick = ()=>{
    handleClose();
    handleSerialModalOpen();
  }
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
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {sales ? (
          <>
            <MenuItem onClick={handleOptionClick}>Modificar</MenuItem>
            <MenuItem onClick={handleOptionClick}>Eliminar</MenuItem>
            {balance==0? 
            <MenuItem onClick={handleAssignmentOptionClick}>Asignar Serial</MenuItem> : 
            <MenuItem onClick={handlePaymentOptionClick}>Registrar Pago</MenuItem>}

          </>
        ) : (
          <>
            <MenuItem onClick={handleOptionClick}>Modificar</MenuItem>
            <MenuItem onClick={handleOptionClick}>Eliminar</MenuItem>
            <MenuItem onClick={handleInventoryOptionClick}>Cargar Inventario</MenuItem>
            <MenuItem onClick={handleSerialOptionClick}>Cargar Serial</MenuItem>
          </>
        )}
      </Menu>
      {sales ? (
        <>
        <PaymentModal 
        open={modalOpen} 
        setOpen={setModalOpen} 
        id={id} />
        <AssignSerialModal 
        open={assignModalOpen} 
        setOpen={setAssignModalOpen} 
        id={id} 
        assign/>
        </>
      ) :  (
        <>
        <InventoryModal 
        open={modalOpen} 
        setOpen={setModalOpen} 
        id={id} />
        <SerialModal 
        open={serialModalOpen} 
        setOpen={setSerialModalOpen} 
        id={id} 
        serial/>
        </>
      )}
    </div>
  );
}
