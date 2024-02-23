import Head from "next/head";
import {useState} from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Box, Container, Stack, Typography, Button, TextField } from "@mui/material";
import UserAutocomplete from "src/components/user-autocomplete";

const Page = () => {
    const [role, setRole] = useState('')
    
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
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Gestión de Usuarios</Typography>
              </Stack>
            </Stack>
            <Stack spacing={1} direction="row">
                <UserAutocomplete url={'http://localhost:3001/api/v1/users'}/>
                <UserAutocomplete url={'http://localhost:3001/api/v1/roles'} roles role={role} setRole={setRole}/>
            </Stack>
            <Stack spacing={1} direction="row">
                {role?.rol_desc === "Ventas"? 
                <>
                    <TextField
                        fullWidth
                        label="Comisión de Venta"
                        name="fee"
                    />
                    <TextField
                        fullWidth
                        label="Localidad del Vendedor"
                        name="fee"
                    />
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
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
