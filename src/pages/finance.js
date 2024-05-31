import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { AddButton } from 'src/components/add-button';
import { SalesTable } from 'src/sections/sales/sales-table';
import { useRouter } from 'next/navigation';
import { useAuth } from "src/hooks/use-auth";
import { SalesSearchAutocomplete } from 'src/sections/sales/sales-search-autocomplete';

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

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState([])
  const sales = useSales(data, page, rowsPerPage);
  const salesIds = useSaleIds(sales);
  const salesSelection = useSelection(salesIds);
  const auth = useAuth();
  const router = useRouter();

  const getData = async ()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales`, {
      headers: {
        "X-Auth-Token": window.localStorage.getItem('token')
      }
    })
    if(response.ok){
      const jsonData = await response.json();
      setData(jsonData.result.filter((sale)=> sale.pagado > 0));
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
          Finanzas | Ventas FP
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
                  Finanzas
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            <SalesSearchAutocomplete data={data} query={query} setQuery={setQuery}/>
              <SalesTable
              count={query.length? query.length : data.length}
              items={query.length? query : sales}
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