import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import CustomerInfo from "./customer-info-modal";
import { FullScreenDialog } from "src/components/fullscreen-dialog";
import { OpenDialogContext } from "src/contexts/openDialog-context";
import GeneralErrorModal from "src/components/general-error-modal";

export default function DotsMenu({ open, index, setOpen, customer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const value = { openDialog, setOpenDialog, openSuccessModal, setOpenSuccessModal };
  const products = false;
  const sales = false;
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  let isLoading = openDialog && !customerData

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers/info/${customer.cusm_id}`,
          {
            method: "GET",
            headers: {
              "X-Auth-Token": window.localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        if(response.ok){
          console.log(json) 
          setCustomerData({
            v_person_id: json.result[0][0].person_id,
          setPersonId,
          v_doc_typeid: json.result[0][0].doc_typeid,
          setDocTypeId,
          v_cusm_ndoc: json.result[0][0].cusm_ndoc,
          setCusmNdOC,
          v_actv_id: {
            actv_id: json.result[0][0].actv_id,
            actv_desc: json.result[0][0].actv_desc},
          setActvId,
          v_cusm_namec: json.result[0][0].cusm_namec,
          setCusmNameC,
          v_bank_id: {
            bank_id: json.result[0][0].bank_id,
            bank_desc: json.result[0][0].bank_desc},
          setBankId,
          v_acct_number: json.result[0][0].acct_number,
          setAcctNumber,
          v_percon_name: json.result[1][0].percon_name,
          setPerconName,
          v_percon_last: json.result[1][0].percon_last,
          setPerconLast,
          v_cod_movilid: json.result[1][0].cod_movilid,
          setCodMovilId,
          v_percon_movil: json.result[1][0].percon_movil,
          setPerconMovil,
          v_cod_localid: {
            cod_localid: json.result[1][0].cod_localid,
            cod_value: json.result[1][0].cod_value},
          setCodLocalId,
          v_percon_local: json.result[1][0].percon_local,
          setPerconLocal,
          v_percon_email: json.result[1][0].percon_email,
          setPerconEmail,
          cod_localid_data,
          setCodLocalIdData,
          v_com_add_typeid: json.result[2][0].add_typeid,
          v_com_cusm_id,
          v_com_pais_id: {
            pais_id: json.result[2][0].pais_id,
            pais_code: json.result[2][0].pais_code
          },
          v_com_estad_id: {
            estad_id: json.result[2][0].estad_id,
            estad_desc: json.result[2][0].estad_desc
          },
          v_com_ciud_id:  {
            ciud_id: json.result[2][0].ciud_id,
            ciud_desc: json.result[2][0].ciud_desc
          },
          v_com_municp_id: {
            municp_id: json.result[2][0].municp_id,
            municp_desc: json.result[2][0].municp_desc
          },
          v_com_parr_id: {
            parr_id: json.result[2][0].parr_id,
            parr_desc: json.result[2][0].parr_desc
          },
          v_com_add_street: json.result[2][0].add_street,
          v_com_add_level: json.result[2][0].add_level,
          v_com_add_ofic: json.result[2][0].add_ofic,
          v_pos_add_typeid: json.result[2][1].add_typeid,
          v_pos_cusm_id,
          v_pos_pais_id: {
            pais_id: json.result[2][1].pais_id,
            pais_code: json.result[2][1].pais_code
          },
          v_pos_estad_id: {
            estad_id: json.result[2][1].estad_id,
            estad_desc: json.result[2][1].estad_desc
          },
          v_pos_ciud_id:  {
            ciud_id: json.result[2][1].ciud_id,
            ciud_desc: json.result[2][1].ciud_desc
          },
          v_pos_municp_id: {
            municp_id: json.result[2][1].municp_id,
            municp_desc: json.result[2][1].municp_desc
          },
          v_pos_parr_id: {
            parr_id: json.result[2][1].parr_id,
            parr_desc: json.result[2][1].parr_desc
          },
          v_pos_add_street: json.result[2][1].add_street,
          v_pos_add_level: json.result[2][1].add_level,
          v_pos_add_ofic: json.result[2][1].add_ofic,
          v_rep_add_typeid: json.result[2][2].add_typeid,
          v_rep_cusm_id,
          v_rep_pais_id: {
            pais_id: json.result[2][2].pais_id,
            pais_code: json.result[2][2].pais_code
          },
          v_rep_estad_id: {
            estad_id: json.result[2][2].estad_id,
            estad_desc: json.result[2][2].estad_desc
          },
          v_rep_ciud_id:  {
            ciud_id: json.result[2][2].ciud_id,
            ciud_desc: json.result[2][2].ciud_desc
          },
          v_rep_municp_id: {
            municp_id: json.result[2][2].municp_id,
            municp_desc: json.result[2][2].municp_desc
          },
          v_rep_parr_id: {
            parr_id: json.result[2][2].parr_id,
            parr_desc: json.result[2][2].parr_desc
          },
          v_rep_add_street: json.result[2][2].add_street,
          v_rep_add_level: json.result[2][2].add_level,
          v_rep_add_ofic: json.result[2][2].add_ofic,
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
          })
        }else{
          setMessage('Ha ocurrido un error')
          setError(true)
        }
      } catch (error) {
        console.log('error while updating customerData')
        setMessage(error.message);
        setError(true);
      }
  
    }

    if(openDialog){
      fetchData()
    }    
  }, [openDialog]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    console.log(isLoading)
  };

  const handleModalOpen = () => {
    const openArray = open?.map((element, i) => {
      if (i === index) {
        return true;
      } else {
        return element;
      }
    });
    setOpen(openArray);
  };

  const handleModalClose = () => {
    const openArray = open?.map((element, i) => {
      if (i === index) {
        return false;
      } else {
        return element;
      }
    });
    setOpen(openArray);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <GeneralErrorModal message={message} opened={error} setOpened={setError}/>
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
        <MenuItem key={"detail"} onClick={handleModalOpen}>
          Ver Detalle
        </MenuItem>
        <MenuItem key={"edit"} onClick={handleDialogOpen}>
          Modificar
        </MenuItem>
      </Menu>
      <>
        <CustomerInfo
          open={open}
          index={index}
          handleModalClose={handleModalClose}
          customer={customer}
        />
          <OpenDialogContext.Provider value={value}>
            <FullScreenDialog title={"Cliente"} existingValue={customerData} loading={isLoading}/>
        </OpenDialogContext.Provider> 
        
      </>
    </div>
  );
}
