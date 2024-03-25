import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { FullScreenDialog } from "./fullscreen-dialog";
import { OpenDialogContext } from "src/contexts/openDialog-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddButton = ({ products, sales }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  const value = { openDialog, setOpenDialog, openSuccessModal, setOpenSuccessModal };

  return (
    <div>
      <Button
        startIcon={
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        }
        variant="contained"
        onClick={handleOpen}
      >
        Agregar
      </Button>
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

      {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal> */}
    </div>
  );
};
