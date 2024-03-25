import Head from "next/head";
import {useState} from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Box, Container, Stack, Typography, Button, TextField, MenuItem } from "@mui/material";
import UserAutocomplete from "src/components/user-autocomplete";
import GeneralSuccessModal from "src/components/general-success-modal";
import GeneralErrorModal from "src/components/general-error-modal";

const locations = [
  {value:1,
  label: "Región Capital"},
  {value:2,
  label: "Región Central"},
  {value:3,
  label: "Región Occidental"},
  {value:4,
  label: "Región Oriental"}
]

const Page = () => {
    const [role, setRole] = useState('');
    const [user, setUser] = useState('');
    const [location, setLocation] = useState('');
    const [fee, setFee] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

/*     const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();
    let ms = today.getMilliseconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy+mm+dd+hh+min+ss+ms;

    console.log(formattedToday); */

    //console.log();
    const handleSubmit = async (e)=>{
      try{
        e.preventDefault();
        const body = {
          v_user_id_1: user.id,
          v_rol_id: role.rol_id,
          v_sell_fee: fee,
          v_sell_location: location
        }
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/roles/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.sessionStorage.getItem('token')
          },
          body: JSON.stringify(body)
        }).then(async(result)=>{
          const jsonResult = await result.json();
          setData(jsonResult);
          if(jsonResult.result[0].usuario){
            setOpenModal(true);
          } else setError(true)  
        })
      }catch(err){
        console.log(err.message);
      }
    }
    
  return (
    <>
      <Head>
        <title>Usuarios | Ventas FP</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
        <GeneralSuccessModal 
        message={''} 
        data={data} 
        opened={openModal} 
        setOpened={setOpenModal}/>
        <GeneralErrorModal 
        opened={error} 
        setOpened={setError}/>
          <Stack spacing={3}>
            <Stack 
            direction="row" 
            justifyContent="space-between" 
            spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Gestión de Usuarios</Typography>
              </Stack>
            </Stack>
            <form 
            noValidate 
            onSubmit={(e)=>handleSubmit(e)}>
            <Stack spacing={1}>
            <Stack 
            spacing={1} 
            direction="row">
                <UserAutocomplete 
                url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/users`} 
                data={user} 
                setData={setUser} 
                name={"Usuario"}/>
                <UserAutocomplete 
                url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/roles`} 
                roles 
                data={role} 
                setData={setRole} 
                name={"Rol"}/>
            </Stack>
            <Stack 
            spacing={1} 
            direction="row">
                {role?.rol_desc === "Ventas"? 
                <>
                    <TextField
                        fullWidth
                        label="Comisión de Venta"
                        name="v_sell_fee"
                        value={fee}
                        onChange={(event)=>setFee(Number(event.target.value))}
                    />
                    <TextField
                        fullWidth
                        label="Localidad del Vendedor"
                        name="v_sell_location"
                        select
                        value={location}
                        onChange={(event)=>setLocation(event.target.value)}
                    >{locations.map((option) => (
                            <MenuItem 
                            key={option.value} 
                            value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                </>
                 : <></>}
            </Stack>
                <Button
                    size="large"
                    type="submit"
                    //onClick={handleSubmit}
                    //disabled={activeStep === 4}
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                >
                    Enviar
                </Button>
                </Stack>
              </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
