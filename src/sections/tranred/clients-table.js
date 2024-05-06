import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';

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

export const ClientsTable = (props) => {
  const [clientInfo, setClientInfo] = useState({})
  const [terminalInfo, setTerminalInfo] = useState({})
  const [open, setOpen] = useState(false);
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    type
  } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClientInfo = (id)=>{
    return()=>{
      handleOpen()
      fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/customer/rif/${id}`, {
        headers: {
          "X-Auth-Token": window.localStorage.getItem('token'),
        }
      }).then(async(response)=>{
        const json = await response.json();
        if(response.ok){
          console.log(json)
          setClientInfo(json)
  
        }else{
          console.log('something happened')
        }
      })
    }
  }
  const handleTerminalInfo = (id)=>{
    return()=>{
      handleOpen()
      fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/customer/rif/${id}`, {
        headers: {
          "X-Auth-Token": window.localStorage.getItem('token'),
        }
      }).then(async(response)=>{
        const json = await response.json();
        if(response.ok){
          setTerminalInfo(json.terminales)
  
        }else{
          console.log('something happened')
        }
      })
    }
  }

  useEffect(()=>{
    setClientInfo({})
  },[open])

  return (
    <Card
      sx={{
        width:'100%',
        m: 0
      }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {clientInfo?.message}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>RIF:</b> {clientInfo?.comerRif} <br/>
            <b>Email:</b> {clientInfo?.email} <br/>
            <b>fecha:</b> {clientInfo?.fecha} <br/>
            <b>Nombre:</b> {clientInfo?.nombre} <br/>
          </Typography>
        </Box>
      </Modal>
      <Scrollbar>
        <Box sx={{ minWidth: 800}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>RIF</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((commerce) => {

                return (
                  <TableRow
                    hover
                    key={commerce.comerRif}
                  >
                    
                    <TableCell>
                      <Stack 
                      alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        <Typography variant="subtitle2">{commerce.comerRif}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{commerce.comerDesc}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={handleClientInfo(commerce.comerRif)}>
                        Ver Detalle
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={handleClientInfo(commerce.comerRif)}>
                        Ver Terminales
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained">
                        Editar
                      </Button>
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ClientsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
