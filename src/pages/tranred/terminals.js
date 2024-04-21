import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AddButton } from 'src/components/add-button';
import { SalesTable } from 'src/sections/sales/sales-table';
import { useRouter } from 'next/navigation';
import { useAuth } from "src/hooks/use-auth";

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
      const json = await response.json();
      const sales = json.result;
      const filtered = sales.filter((sale)=> sale.status_id === 3011)
      setData(filtered);
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
          Terminales Tranred | Ventas FP
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
                Terminales Tranred
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
            <SalesTable
              count={data.length}
              items={sales}
              onDeselectAll={salesSelection.handleDeselectAll}
              onDeselectOne={salesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={salesSelection.handleSelectAll}
              onSelectOne={salesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={salesSelection.selected}
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
