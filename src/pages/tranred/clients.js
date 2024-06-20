import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import { useRouter } from 'next/navigation';
import { useAuth } from "src/hooks/use-auth";
import { ClientsTable } from 'src/sections/tranred/clients-table';
import { ClientSearchAutocomplete } from 'src/sections/tranred/client-search-autocomplete';

const useClients = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useClientIds = (clients) => {
  return useMemo(() => {
    return clients.map((client) => client.comerRif);
  }, [clients]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState([])
  const clients = useClients(data, page, rowsPerPage);
  const clientsIds = useClientIds(clients);
  const clientsSelection = useSelection(clientsIds);
  const auth = useAuth();
  const router = useRouter();


   const getData = async ()=>{
    /* const body = {
      token: window.localStorage.getItem('tranred-token')
    } */
      /* if(!body.token){
        tranredLogin()
        return getData()
      } else{ */
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/customer/all`, {
            headers: {
            "X-Auth-Token": window.localStorage.getItem('token'),
          },
          //body: JSON.stringify(body)
        })     
        const json = await response.json(); 
        if(response.ok){ 
          setData(json.comercios);
        }else {
          console.log('not 401')
          /* auth.signOut();
          router.push('/auth/login'); */
          //return
        }
        }catch(err){
          console.log(err)
        }  
      //}   
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

  return (
    <>
      <Head>
        <title>
          Clientes Tranred | Ventas FP
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          width: '100%'
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Clientes Tranred
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            <ClientSearchAutocomplete data={data} query={query} setQuery={setQuery}/>
            <ClientsTable
              count={query.length? query.length : data.length}
              items={query.length? query : clients}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              type='tranred'
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
