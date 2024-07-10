import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
//import ProgressMobileStepper from "./add-customer-stepper";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import { OpenDialogContext } from "src/contexts/openDialog-context";
import { useContext } from "react";
import AlertModal from "./alert-modal";
import ProductForm from "./add-product-form";
import SuccessModal from "./success-modal";
import AddSaleForm from "./add-sale-form";
import GeneralErrorModal from "./general-error-modal";
import NewCustomerStepper from "./new-customer-stepper";
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide 
  direction="up" 
  ref={ref} 
  {...props} />;
});

export function FullScreenDialog({products, title, sales, existingValue, loading}) {
  const [v_person_id, setPersonId] = useState("");
  const [v_doc_typeid, setDocTypeId] = useState("");
  const [v_cusm_ndoc, setCusmNdOC] = useState("");
  const [v_actv_id, setActvId] = useState("");
  const [v_cusm_namec, setCusmNameC] = useState("");
  const [v_bank_id, setBankId] = useState("");
  const [v_acct_number, setAcctNumber] = useState("");
  const [v_percon_name, setPerconName] = useState("");
  const [v_percon_last, setPerconLast] = useState("");
  const [v_cod_movilid, setCodMovilId] = useState("");
  const [v_percon_movil, setPerconMovil] = useState("");
  const [v_cod_localid, setCodLocalId] = useState("");
  const [v_percon_local, setPerconLocal] = useState("");
  const [v_percon_email, setPerconEmail] = useState("");
  const [cod_localid_data, setCodLocalIdData] = useState("");
  const [v_com_add_typeid, set_v_com_add_typeid] = useState("");
  const [v_com_cusm_id, set_v_com_cusm_id] = useState("");
  const [v_com_pais_id, set_v_com_pais_id] = useState("");
  const [v_com_estad_id, set_v_com_estad_id] = useState("");
  const [v_com_ciud_id, set_v_com_ciud_id] = useState("");
  const [v_com_municp_id, set_v_com_municp_id] = useState("");
  const [v_com_parr_id, set_v_com_parr_id] = useState("");
  const [v_com_add_street, set_v_com_add_street] = useState("");
  const [v_com_add_level, set_v_com_add_level] = useState("");
  const [v_com_add_ofic, set_v_com_add_ofic] = useState("");
  const [v_pos_add_typeid, set_v_pos_add_typeid] = useState("");
  const [v_pos_cusm_id, set_v_pos_cusm_id] = useState("");
  const [v_pos_pais_id, set_v_pos_pais_id] = useState("");
  const [v_pos_estad_id, set_v_pos_estad_id] = useState("");
  const [v_pos_ciud_id, set_v_pos_ciud_id] = useState("");
  const [v_pos_municp_id, set_v_pos_municp_id] = useState("");
  const [v_pos_parr_id, set_v_pos_parr_id] = useState("");
  const [v_pos_add_street, set_v_pos_add_street] = useState("");
  const [v_pos_add_level, set_v_pos_add_level] = useState("");
  const [v_pos_add_ofic, set_v_pos_add_ofic] = useState("");
  const [v_rep_add_typeid, set_v_rep_add_typeid] = useState("");
  const [v_rep_cusm_id, set_v_rep_cusm_id] = useState("");
  const [v_rep_pais_id, set_v_rep_pais_id] = useState("");
  const [v_rep_estad_id, set_v_rep_estad_id] = useState("");
  const [v_rep_ciud_id, set_v_rep_ciud_id] = useState("");
  const [v_rep_municp_id, set_v_rep_municp_id] = useState("");
  const [v_rep_parr_id, set_v_rep_parr_id] = useState("");
  const [v_rep_add_street, set_v_rep_add_street] = useState("");
  const [v_rep_add_level, set_v_rep_add_level] = useState("");
  const [v_rep_add_ofic, set_v_rep_add_ofic] = useState("");
  const [countryData, setCountryData] = useState("");
  const [stateData, setStateData] = useState("");
  const [municipalityData, setMunicipalityData] = useState("");
  const [parrishData, setParrishData] = useState("");

  const value = {
    v_person_id,
    v_doc_typeid,
    v_cusm_ndoc,
    v_actv_id,
    v_cusm_namec,
    v_bank_id,
    v_acct_number,
    v_percon_name,
    v_percon_last,
    v_cod_movilid,
    v_percon_movil,
    v_cod_localid,
    v_percon_local,
    v_percon_email,
    cod_localid_data,
    v_com_add_typeid,
    v_com_cusm_id,
    v_com_pais_id,
    v_com_estad_id,
    v_com_ciud_id,
    v_com_municp_id,
    v_com_parr_id,
    v_com_add_street,
    v_com_add_level,
    v_com_add_ofic,
    v_pos_add_typeid,
    v_pos_cusm_id,
    v_pos_pais_id,
    v_pos_estad_id,
    v_pos_ciud_id,
    v_pos_municp_id,
    v_pos_parr_id,
    v_pos_add_street,
    v_pos_add_level,
    v_pos_add_ofic,
    v_rep_add_typeid,
    v_rep_cusm_id,
    v_rep_pais_id,
    v_rep_estad_id,
    v_rep_ciud_id,
    v_rep_municp_id,
    v_rep_parr_id,
    v_rep_add_street,
    v_rep_add_level,
    v_rep_add_ofic,
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
    setCodLocalIdData,
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
    countryData,
    stateData,
    municipalityData,
    parrishData, 
    setCountryData,
    setStateData, 
    setMunicipalityData,
    setParrishData
  };
  const [open, setOpen] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
   const {
    openDialog,
    setOpenDialog,
    openSuccessModal,
    setOpenSuccessModal
  } = useContext(OpenDialogContext);
  const router = useRouter();

  useEffect(() => {
    setOpen(openDialog);
    
  }, [openDialog]);

  useEffect(()=>{
    if(!loading && existingValue){
      console.log(existingValue)
      setPersonId(existingValue.v_person_id)
      setDocTypeId(existingValue.v_doc_typeid)
      setCusmNdOC(existingValue.v_cusm_ndoc)
      setActvId(existingValue.v_actv_id)
      setCusmNameC(existingValue.v_cusm_namec)
      setBankId(existingValue.v_bank_id)
      setAcctNumber(existingValue.v_acct_number)
      setPerconName(existingValue.v_percon_name)
      setPerconLast(existingValue.v_percon_last)
      setCodMovilId(existingValue.v_cod_movilid)
      setPerconMovil(existingValue.v_percon_movil)
      setCodLocalId(existingValue.v_cod_localid)
      setPerconLocal(existingValue.v_percon_local)
      setPerconEmail(existingValue.v_percon_email)
      setCodLocalIdData(existingValue.cod_localid_data)
      set_v_com_add_typeid(existingValue.v_com_add_typeid)
      set_v_com_cusm_id(existingValue.v_com_cusm_id)
      set_v_com_pais_id(existingValue.v_com_pais_id)
      set_v_com_estad_id(existingValue.v_com_estad_id)
      set_v_com_ciud_id(existingValue.v_com_ciud_id)
      set_v_com_municp_id(existingValue.v_com_municp_id)
      set_v_com_parr_id(existingValue.v_com_parr_id)
      set_v_com_add_street(existingValue.v_com_add_street)
      set_v_com_add_level(existingValue.v_com_add_level)
      set_v_com_add_ofic(existingValue.v_com_add_ofic)
      set_v_pos_add_typeid(existingValue.v_pos_add_typeid)
      set_v_pos_cusm_id(existingValue.v_pos_cusm_id)
      set_v_pos_pais_id(existingValue.v_pos_pais_id)
      set_v_pos_estad_id(existingValue.v_pos_estad_id)
      set_v_pos_ciud_id(existingValue.v_pos_ciud_id)
      set_v_pos_municp_id(existingValue.v_pos_municp_id)
      set_v_pos_parr_id(existingValue.v_pos_parr_id)
      set_v_pos_add_street(existingValue.v_pos_add_street)
      set_v_pos_add_level(existingValue.v_pos_add_level)
      set_v_pos_add_ofic(existingValue.v_pos_add_ofic)
      set_v_rep_add_typeid(existingValue.v_rep_add_typeid)
      set_v_rep_cusm_id(existingValue.v_rep_cusm_id)
      set_v_rep_pais_id(existingValue.v_rep_pais_id)
      set_v_rep_estad_id(existingValue.v_rep_estad_id)
      set_v_rep_ciud_id(existingValue.v_rep_ciud_id)
      set_v_rep_municp_id(existingValue.v_rep_municp_id)
      set_v_rep_parr_id(existingValue.v_rep_parr_id)
      set_v_rep_add_street(existingValue.v_rep_add_street)
      set_v_rep_add_level(existingValue.v_rep_add_level)
      set_v_rep_add_ofic(existingValue.v_rep_add_ofic)
    }
  },[loading, existingValue])

/*   useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://localhost:3001/api/v1/get-codlocalid", {
        headers: {
          "X-Auth-Token": window.sessionStorage.getItem("token"),
        },
      });
      const jsonData = await result.json();
      setCodLocalIdData(jsonData.result);
    }
    fetchData();
  }, []); */

  /* const handleClickOpen = () => {
    setOpen(true);
  }; */

  const handleDialogClose = () => {
    setOpenAlertModal(true);
    //setOpened(false)
    //router.refresh();
  };

  return (
    <Dialog 
    fullScreen 
    open={open} 
    onClose={handleDialogClose} 
    TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton 
          edge="start" 
          color="inherit" 
          onClick={handleDialogClose} 
          aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography 
          sx={{ ml: 2, flex: 1 }} 
          variant="h6" 
          component="div">
            {products? "Agregar Nuevo Producto" : sales? "Agregar Nueva Cotización" : "Agregar Nuevo Cliente" }
          </Typography>
          <Button 
          autoFocus 
          color="inherit" 
          onClick={handleDialogClose}>
            Cerrar
          </Button>
        </Toolbar>
      </AppBar>
      {
        loading && existingValue? 
        <>
        <CircularProgress 
          color="inherit" 
          size={50}/>
        </> :
        !loading && existingValue?
        <CustomerContext.Provider value={existingValue}>
      <AlertModal
        opened={openAlertModal}
        setOpened={setOpenAlertModal}
      />
      <SuccessModal title={title}/>
      {
        products? 
        <ProductForm/> : 
        sales? <AddSaleForm/>:
        <NewCustomerStepper/>
      }  
      </CustomerContext.Provider> :
      !loading && !existingValue? 
      <CustomerContext.Provider value={value}>
      <AlertModal
        opened={openAlertModal}
        setOpened={setOpenAlertModal}
      />
      <SuccessModal title={title}/>
      {
        products? 
        <ProductForm/> : 
        sales? <AddSaleForm/>:
        <NewCustomerStepper/>
      }  
      </CustomerContext.Provider> : 
      <></>
      }
      
      
    </Dialog>
  );
}
