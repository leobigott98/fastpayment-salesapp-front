import * as dotenv from 'dotenv';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { CustomersSearchAutocomplete } from 'src/sections/customer/customer-search-autocomplete';
import { applyPagination } from 'src/utils/apply-pagination';
import { AddButton } from 'src/components/add-button';
import { useAuth } from "src/hooks/use-auth";
import { useRouter } from 'next/navigation';
import GeneralErrorModal from 'src/components/general-error-modal';

const now = new Date();

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage, data]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState([])
  const customers = useCustomers(data, page, rowsPerPage)
  const [loading, setLoading] = useState(true)
  const auth = useAuth();
  const router = useRouter();

  const getData = async ()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers`, {
      headers: {
        "Access-Control-Request-Headers": ["X-Auth-Token", "Cookie"],
        "X-Auth-Token": window.localStorage.getItem('token'),
      },
      mode: "cors",
      credentials: "include",
      referrerPolicy: 'no-referrer-when-downgrade'
    })
    if(response.ok){
      setLoading(false)
      const jsonData = await response.json();
      setData(jsonData.result);

    }else{
      setMessage('No Autorizado. Redirigiendo...')
      setError(true);
      setTimeout(()=>{
        auth.signOut();
        router.push('/auth/login');
      }, 2000)
      
    }
    }catch(err){
      console.log(err);
      auth.signOut()
    
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
  if(loading){
    return (<Typography>Loading...</Typography>)
  }

  return (
    <>
      <Head>
        <title>
          Clientes | Ventas FP
        </title>
      </Head>
      <GeneralErrorModal setOpened={setError} opened={error} message={message}/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
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
                  Clientes
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              <div>
              <AddButton/> 
              </div>
            </Stack>
            {/* <CustomersSearch data={data} query={query} setQuery={setQuery}/>  */}
            <CustomersSearchAutocomplete data={data} query={query} setQuery={setQuery}/>   
            <CustomersTable
              count={query.length? query.length : data.length}
              items={query.length? query : customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
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
