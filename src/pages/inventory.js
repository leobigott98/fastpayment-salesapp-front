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
import { CategoriesTable } from 'src/sections/categories/categories-table';

const useCategories = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage, data]
  );
};

const useCategoryIds = (categories) => {
  return useMemo(
    () => {
      return categories.map((category) => category.id);
    },
    [categories]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const categories = useCategories(data, page, rowsPerPage);
  const categoriesIds = useCategoryIds(categories);
  const categoriesSelection = useSelection(categoriesIds);
  const [categoryType, setCategoryType] = useState('available');

  const getData = async ()=>{
    try{
      const response = await fetch('http://localhost:3001/api/v1/inventory', {
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

  const handleCategoryTypeChange = useCallback(
    (event, value) => {
      setCategoryType(value);
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
                  Artículos
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                  <ImportButton/>
                  
                  <ExportButton selected={categoriesSelection}/>
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
                </Button> */}
              </div>
            </Stack>
            <CustomersSearch />
            <Tabs
              onChange={handleCategoryTypeChange}
              sx={{ mb: 3 }}
              value={categoryType}
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
            {categoryType === 'available' && (
            <CategoriesTable
              count={data.length}
              items={categories}
              onDeselectAll={categoriesSelection.handleDeselectAll}
              onDeselectOne={categoriesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={categoriesSelection.handleSelectAll}
              onSelectOne={categoriesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={categoriesSelection.selected}
            />
            )}
            {categoryType === 'incomplete' && (
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
