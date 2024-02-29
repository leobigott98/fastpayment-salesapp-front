import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Tab, Tabs } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ItemsTable } from 'src/sections/items/items-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AddButton } from 'src/components/add-button';
import ImportButton from 'src/components/import-button';
import ExportButton from 'src/components/export-button';
import NotAvailable from 'src/components/not-available-message';
import { SalesTable } from 'src/sections/sales/sales-table';

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
  const [saleType, setSaleType] = useState('available');

  const getData = async ()=>{
    try{
      const response = await fetch('http://localhost:3001/api/v1/sales', {
      headers: {
        "X-Auth-Token": window.sessionStorage.getItem('token')
      }
    })
      const jsonData = await response.json();
      setData(jsonData.result);
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

  const handleSaleTypeChange = useCallback(
    (event, value) => {
      setSaleType(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Ventas | Ventas FP
        </title>
      </Head>
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
                  Ventas
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                  <ImportButton/>
                  
                  <ExportButton selected={salesSelection}/>
                </Stack>
              </Stack>
              <div>
              <AddButton sales/>
                {/* <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Agregar
                </Button> */}
              </div>
            </Stack>
            <CustomersSearch />
            <Tabs
              onChange={handleSaleTypeChange}
              sx={{ mb: 3 }}
              value={saleType}
            >
              <Tab
                label="Disponibles"
                value="available"
              />
              <Tab
                label="Incompletos"
                value="incomplete"
              />
            </Tabs>
            {saleType === 'available' && (
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
            />
            )}
            {saleType === 'incomplete' && (
              <NotAvailable/>
            )}
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
