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
import { ProductsTable } from 'src/sections/products/products-table'; 

const useProducts = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage, data]
  );
};

const useProductIds = (products) => {
  return useMemo(
    () => {
      return products.map((product) => product.id);
    },
    [products]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const products = useProducts(data, page, rowsPerPage);
  const productsIds = useProductIds(products);
  const productsSelection = useSelection(productsIds);
  const [productType, setProductType] = useState('available');

  const getData = async ()=>{
    try{
      const response = await fetch('http://localhost:3001/api/v1/products', {
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

  const handleProductTypeChange = useCallback(
    (event, value) => {
      setProductType(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Inventario | Ventas FP
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
                  Productos
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                  <ImportButton/>
                  
                  <ExportButton selected={productsSelection}/>
                </Stack>
              </Stack>
              <div>
              <AddButton products/>
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
              onChange={handleProductTypeChange}
              sx={{ mb: 3 }}
              value={productType}
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
            {productType === 'available' && (
            <ProductsTable
              count={data.length}
              items={products}
              onDeselectAll={productsSelection.handleDeselectAll}
              onDeselectOne={productsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={productsSelection.handleSelectAll}
              onSelectOne={productsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={productsSelection.selected}
            />
            )}
            {productType === 'incomplete' && (
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
