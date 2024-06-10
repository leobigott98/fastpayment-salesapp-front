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
import AccountModal from "./account-modal";
import { useAuth } from "src/hooks/use-auth";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useSales = (data, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage, data]
    );
  };
  
  const useSaleIds = (sales) => {
    return useMemo(
      () => {
        return sales.map((sale) => sale.id);
      },
      [sales]
    );
  };

export default function SerialTranredModal({ open, setOpen, id }) {
  const [openModal, setOpenModal] = useState(open);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('Ha ocurrido un error')
  const [customer, setCustomer] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const sales = useSales(data, page, rowsPerPage);
  const salesIds = useSaleIds(sales);
  const salesSelection = useSelection(salesIds);
  const auth = useAuth();
  const router = useRouter();

  const getData = async ()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/serials/${id}`, {
      headers: {
        "X-Auth-Token": window.localStorage.getItem('token')
      }
    })
    if(response.ok){
      const jsonData = await response.json();
      setData(jsonData.result);
    }else{
      console.log('something happended')
      /* auth.signOut();
      router.push('/auth/login'); */
    }
    }catch(err){
      console.log(err)
    }  
  }

  useEffect(()=>{
    getData();
  },[]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  
  const handleModalClose = () => {
    //console.log(data)
    setOpenModal(false);
    setOpen(false);
  };

  const handleTerminalCreation = async ()=>{

    try{
      const result = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/create/${id}`, {
        method: 'POST',
        headers: {
          'X-Auth-Token': window.localStorage.getItem('token'),
        }
      })
      const json = await result.json()
      const responseArray = json.responseArray
      if(result.ok){
        setMessage(responseArray[responseArray.length -1].response.message)
        setSuccess(true)
      }else{
        setMessage(responseArray[responseArray.length -1].response.message)
        setError(true)
      }

    }catch(err){
      console.log(err)
      setMessage(err.message)
      setError(true)
    }
      /* try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/create`, {
          method: 'POST',
          headers: {
            "X-Auth-Token": window.localStorage.getItem('token'),
          },
          body: JSON.stringify(body)
        })
        const json = await result.json()
        if(result.ok){
          setMessage(json.message)
          setSuccess(true)
        }else{
          setMessage(json.message)
          setError(true)
        }
  
      }catch(err){
        console.log(err)
        setMessage(err.message)
        setError(true)
      }

    }) */
    
    handleModalClose(); 
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
          APROVISIONAR SERIALES
        </Typography>
            <SerialTranredTable
              count={data.length}
              items={sales}
              onDeselectAll={salesSelection.handleDeselectAll}
              onDeselectOne={salesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={salesSelection.handleSelectAll}
              onSelectOne={salesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={salesSelection.selected}
              type={'sales'}
              sale_id={id}
            />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2%" }}>
            <Button 
            onClick={handleModalClose} 
            variant="outlined" 
            sx={{ width: "30%" }}>
              No, Cancelar
            </Button>
            <Button
              onClick={handleTerminalCreation}
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
