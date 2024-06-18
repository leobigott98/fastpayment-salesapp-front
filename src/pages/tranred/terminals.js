import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import { useRouter } from "next/navigation";
import { useAuth } from "src/hooks/use-auth";
import NotAvailable from "src/components/not-available-message";
import { TerminalsSearch } from "src/sections/tranred/terminals-search-autocomplete";
import Grid from "@mui/system/Unstable_Grid/Grid";
import GeneralErrorModal from "src/components/general-error-modal";
import TerminalHistoryModal from "src/sections/tranred/terminal-history-modal";
import BankAccountModal from "src/sections/tranred/bank-account-modal";
import StatusChangeModal from "src/sections/tranred/status-change-modal";
import UpdateTerminalModal from "src/sections/tranred/update-terminal-modal";


const Page = () => {
  const [data, setData] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState([]);
  const [terminal, setTerminal] = useState();
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [openHistory, setOpenHistory] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/fp/all`,
        {
          headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const terminals = await response.json();
        setData(terminals);
      } else {
        auth.signOut();
        router.push("/auth/login");
      }
    } catch (err) {
      setMessage(err.message)
      setError(true)
    }
  };

  const getTerminalTranred = async(terminalID)=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/${terminalID}`, {
        headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
          },
      })
      const json = await response.json()
      if(response.ok){
        setTerminal(json.data)
      }else {
        setMessage(json.message)
        setError(true)
      }
    }catch(err){
      setMessage(err.message)
      setError(true)

    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    if(query.length){
      getTerminalTranred(query[0].terminal)
    }
    
  },[query])

  return (
    <>
      <Head>
        <title>Terminales Tranred | Ventas FP</title>
      </Head>
      <GeneralErrorModal opened={error} setOpened={setError} message={message}/>
      <TerminalHistoryModal open={openHistory} setOpen={setOpenHistory} terminal={query[0]?.terminal}/>
      <BankAccountModal open={openAccount} setOpen={setOpenAccount}/>
      <StatusChangeModal open={openStatus} setOpen={setOpenStatus} />
      <UpdateTerminalModal open={openUpdate} setOpen={setOpenUpdate} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Terminales Tranred</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
            </Stack>
            <TerminalsSearch data={data} query={query} setQuery={setQuery} />
            {query.length ? (
              <>
                <Card>
                  <CardContent>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Cliente
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Nombre Comercial:</Typography>
                      </Grid>
                      <Grid xs={12} md={3} sm={6}>
                        <Typography variant="p">{query[0].cusm_namec}</Typography>
                      </Grid>
                      <Grid xs={12} md={1} sm={6}>
                        <Typography variant="h6">RIF:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{query[0].comerRif}</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Representante:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">
                          {`${query[0].percon_name} ${query[0].percon_last}`}
                        </Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Correo:</Typography>
                      </Grid>
                      <Grid xs={12} md={3} sm={6}>
                        <Typography variant="p">{query[0].percon_email}</Typography>
                      </Grid>
                      <Grid xs={12} md={1} sm={6}>
                        <Typography variant="h6">Tlf Local:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{query[0].tlf}</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Tlf Móvil:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{query[0].movil}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {terminal? (
                  <Card>
                  <CardContent>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Terminal
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Nro de Terminal:</Typography>
                      </Grid>
                      <Grid xs={12} md={3} sm={6}>
                        <Typography variant="p">{terminal?.terminal}</Typography>
                      </Grid>
                      <Grid xs={12} md={1} sm={6}>
                        <Typography variant="h6">Estatus:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{terminal?.status}</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Serial:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">
                          {terminal?.serial}
                        </Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Modelo:</Typography>
                      </Grid>
                      <Grid xs={12} md={3} sm={6}>
                        <Typography variant="p">{terminal?.modelo}</Typography>
                      </Grid>
                      <Grid xs={12} md={1} sm={6}>
                        <Typography variant="h6">Afiliado:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{terminal?.afiliado}</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Cuenta Bancaria:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{terminal?.bank}</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="h6">Fecha de Creación:</Typography>
                      </Grid>
                      <Grid xs={12} md={2} sm={6}>
                        <Typography variant="p">{terminal?.created}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                ) : (<></>)}
                <Grid container spacing={2}>
                <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth onClick={()=>{setOpenHistory(true)}}>Ver Histórico</Button>
                  </Grid>
                  <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth onClick={()=>{setOpenAccount(true)}}>Modificar Cuenta Banco</Button>
                  </Grid>
                  <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth onClick={()=>{setOpenStatus(true)}}>Cambiar Estatus</Button>
                  </Grid>
                  <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth onClick={()=>{setOpenUpdate(true)}}>Cambiar Serial/Modelo</Button>
                  </Grid>
                  <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth>Consultar Cuotas</Button>
                  </Grid>
                  <Grid sx={12} md={4} sm={6}>
                    <Button variant="contained" fullWidth>Anular Cuotas</Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <NotAvailable />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
