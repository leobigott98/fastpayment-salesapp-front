import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { useRouter } from 'next/navigation';
import { useAuth } from "src/hooks/use-auth";
import { ClientsTable } from 'src/sections/tranred/clients-table';

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const auth = useAuth();
  const router = useRouter();

  const getData = async ()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/customer/all`, {
        method: 'POST',
        headers: {
        "X-Auth-Token": window.localStorage.getItem('token')
      }
    })
    if(response.ok){
      const json = await response.json();
      setData(json);
    }else{
      auth.signOut();
      router.push('/auth/login');
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
            <CustomersSearch />
            <ClientsTable
              count={data.length}
              items={data}
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
