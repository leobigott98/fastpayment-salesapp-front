import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LocationForm from "./location-form";
import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import { OpenDialogContext } from "src/contexts/openDialog-context";
import GeneralErrorModal from "./general-error-modal";

const AddLocationForm = ({ handleStep, handleStepBack, activeStep, setOpenedDialog, context}) => {
  const theme = useTheme();
  const {
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
    v_percon_name,
    v_percon_last,
    v_cod_movilid,
    v_percon_movil,
    v_cod_localid,
    v_percon_local,
    v_percon_email,
    v_person_id,  
    v_doc_typeid,  
    v_cusm_ndoc,  
    v_actv_id,  
    v_cusm_namec,  
    v_bank_id,  
    v_acct_number, 
  } = useContext(CustomerContext);

  const {openSuccessModal, setOpenSuccessModal} = useContext(OpenDialogContext);
  const [error, setError] = useState(false);


  const handleSubmit = async ()=>{
    try {
      const customerBody = {
        v_percon_name: v_percon_name,
        v_percon_last: v_percon_last,
        v_cod_movilid: v_cod_movilid,
        v_percon_movil: v_percon_movil,
        v_cod_localid: v_cod_localid.cod_localid,
        v_percon_local: v_percon_local,
        v_percon_email: v_percon_email,
        v_person_id: v_person_id, 
        v_doc_typeid: v_doc_typeid,  
        v_cusm_ndoc: v_cusm_ndoc,  
        v_actv_id: v_actv_id.actv_id,  
        v_cusm_namec: v_cusm_namec,  
        v_bank_id: v_bank_id.bank_id,  
        v_acct_number: v_acct_number
      }

      console.log(customerBody);

      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": window.sessionStorage.getItem('token')
        },
        credentials: "include",
        body: JSON.stringify(customerBody)
      }).then(async(customerResponse)=>{
        const jsonCustomerResponse = await customerResponse.json()
        console.log(jsonCustomerResponse);

        if(jsonCustomerResponse.result[0].error_num){
          setError(true);
          throw new Error('Error al crear el cliente')
        } else{

          const ComAddress = {
            v_add_typeid: 1,
            v_cusm_id: jsonCustomerResponse.result[0].v_cusm_id,
            v_pais_id: v_com_pais_id.pais_id,
            v_estad_id: v_com_estad_id.estad_id,
            v_ciud_id: v_com_ciud_id.ciud_id,
            v_municp_id: v_com_municp_id.municp_id,
            v_parr_id: v_com_parr_id.parr_id,
            v_add_street: v_com_add_street,
            v_add_level: v_com_add_level,
            v_add_ofic: v_com_add_ofic
          }
  
          console.log(ComAddress);
  
          const ComAddResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/new-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(ComAddress)
          })
  
          const POSAddress = {
            v_add_typeid: 2,
            v_cusm_id: jsonCustomerResponse.result[0].v_cusm_id,
            v_pais_id: v_pos_pais_id.pais_id,
            v_estad_id: v_pos_estad_id.estad_id,
            v_ciud_id: v_pos_ciud_id.ciud_id,
            v_municp_id: v_pos_municp_id.municp_id,
            v_parr_id: v_pos_parr_id.parr_id,
            v_add_street: v_pos_add_street,
            v_add_level: v_pos_add_level,
            v_add_ofic: v_pos_add_ofic
          }
  
          console.log(POSAddress);
  
          const POSAddResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/new-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(POSAddress)
          })
  
          const RepAddress = {
            v_add_typeid: 3,
            v_cusm_id: jsonCustomerResponse.result[0].v_cusm_id,
            v_pais_id: v_rep_pais_id.pais_id,
            v_estad_id: v_rep_estad_id.estad_id,
            v_ciud_id: v_rep_ciud_id.ciud_id,
            v_municp_id: v_rep_municp_id.municp_id,
            v_parr_id: v_rep_parr_id.parr_id,
            v_add_street: v_rep_add_street,
            v_add_level: v_rep_add_level,
            v_add_ofic: v_rep_add_ofic
          }
  
          console.log(RepAddress);
  
          const RepAddResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/new-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(RepAddress)
          }) 
          
        }
         
    }).then(()=>{if(!error) setOpenSuccessModal(true)});
        
    } catch (err) {
      console.log(err.message)
      setError(true);
      /* helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false); */ 
    } 
   
  }

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
      <GeneralErrorModal opened={error} setOpened={setError}/>
        <Box
          sx={{
            //maxWidth: 550,
            px: 3,
            pt: "4%",
            //width: "100%",
          }}
        >
          <div>
            <LocationForm
              name = "Comercio"
              context={{
                type: v_com_add_typeid,
                customer: v_com_cusm_id,
                country: v_com_pais_id,
                state: v_com_estad_id,
                city: v_com_ciud_id,
                municipality: v_com_municp_id,
                parrish: v_com_parr_id,
                street: v_com_add_street,
                floor: v_com_add_level,
                office: v_com_add_ofic,
                setType: set_v_com_add_typeid,
                setCustomer: set_v_com_cusm_id,
                setCountry: set_v_com_pais_id,
                setState: set_v_com_estad_id,
                setCity: set_v_com_ciud_id,
                setMunicipality: set_v_com_municp_id,
                setParrish: set_v_com_parr_id,
                setStreet: set_v_com_add_street,
                setFloor: set_v_com_add_level,
                setOffice: set_v_com_add_ofic,
              }}
            />
            <LocationForm 
              name = "POS"
              context={{
                type: v_pos_add_typeid,
                customer: v_pos_cusm_id,
                country: v_pos_pais_id,
                state: v_pos_estad_id,
                city: v_pos_ciud_id,
                municipality: v_pos_municp_id,
                parrish: v_pos_parr_id,
                street: v_pos_add_street,
                floor: v_pos_add_level,
                office: v_pos_add_ofic,
                setType: set_v_pos_add_typeid,
                setCustomer: set_v_pos_cusm_id,
                setCountry: set_v_pos_pais_id,
                setState: set_v_pos_estad_id,
                setCity: set_v_pos_ciud_id,
                setMunicipality: set_v_pos_municp_id,
                setParrish: set_v_pos_parr_id,
                setStreet: set_v_pos_add_street,
                setFloor: set_v_pos_add_level,
                setOffice: set_v_pos_add_ofic,
              }}
            />
            <LocationForm 
              name = "Representante Legal"
              context={{
                type: v_rep_add_typeid,
                customer: v_rep_cusm_id,
                country: v_rep_pais_id,
                state: v_rep_estad_id,
                city: v_rep_ciud_id,
                municipality: v_rep_municp_id,
                parrish: v_rep_parr_id,
                street: v_rep_add_street,
                floor: v_rep_add_level,
                office: v_rep_add_ofic,
                setType: set_v_rep_add_typeid,
                setCustomer: set_v_rep_cusm_id,
                setCountry: set_v_rep_pais_id,
                setState: set_v_rep_estad_id,
                setCity: set_v_rep_ciud_id,
                setMunicipality: set_v_rep_municp_id,
                setParrish: set_v_rep_parr_id,
                setStreet: set_v_rep_add_street,
                setFloor: set_v_rep_add_level,
                setOffice: set_v_rep_add_ofic,
              }}
            />
            <Grid xs={12} container columnSpacing={1} sx={{ marginTop: "-1%" }}>
              <Button size="small" onClick={handleStepBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Anterior
              </Button>

              <Button
                size="small"
                type="submit"
                onClick={handleSubmit}
                //disabled={activeStep === 4}
                variant="contained"
                sx={{ marginLeft: "auto" }}
              >
                Enviar
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AddLocationForm;
