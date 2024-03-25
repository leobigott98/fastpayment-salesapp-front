import * as dotenv from 'dotenv';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Tab, Tabs, Card } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AddButton } from 'src/components/add-button';
import ImportButton from 'src/components/import-button';
import ExportButton from 'src/components/export-button';
import NotAvailable from 'src/components/not-available-message';

const now = new Date();

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage, data]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.cusm_id);
    },
    [customers]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(data, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [customerType, setCustomerType] = useState('available');

  const getData = async ()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers`, {
      headers: {
        "Access-Control-Request-Headers": ["X-Auth-Token", "Cookie"],
        "X-Auth-Token": window.sessionStorage.getItem('token'),
      },
      mode: "cors",
      credentials: "include",
      referrerPolicy: 'no-referrer-when-downgrade'
    })
      const jsonData = await response.json();
      console.log(jsonData)
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

  const handleCustomerTypeChange = useCallback(
    (event, value) => {
      setCustomerType(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Clientes | Ventas FP
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
                  Clientes
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                   <ImportButton/>
                  
                  <ExportButton selected={customersSelection}/> 
                </Stack>
              </Stack>
              <div>
              <AddButton/> 
                {/* <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Agregar
                </Button>  */}
              </div>
            </Stack>
            <CustomersSearch />
            <Tabs
              onChange={handleCustomerTypeChange}
              sx={{ mb: 3 }}
              value={customerType}
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
            {customerType === 'available' && (
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
            )}
            {customerType === 'incomplete' && (
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
