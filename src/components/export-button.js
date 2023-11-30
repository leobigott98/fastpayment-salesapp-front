import {useState, useEffect} from 'react';
import { Button, SvgIcon, Modal, Box, Typography } from "@mui/material";
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ExportButton = ({selected})=>{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [select, setSelect] = useState(['']);

    useEffect(()=>{
        setSelect(selected.selected)
    }, [selected])

    return(
        <>
        <Button
            disabled={select.length === 0? true : false }
            color="inherit"
            onClick={handleOpen}
            startIcon={(
                <SvgIcon fontSize="small">
                <ArrowUpOnSquareIcon />
                </SvgIcon>
            )}
            >
                Exportar
        </Button>
        <Modal
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
            </Modal>
            </>
    )
};

export default ExportButton;

