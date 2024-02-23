import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Box, Container, Stack, Typography } from "@mui/material";
import UserAutocomplete from "src/components/user-autocomplete";

const Page = () => {
  return (
    <>
      <Head>
        <title>Usuarios | Ventas FP</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Gestión de Usuarios</Typography>
              </Stack>
            </Stack>
                <UserAutocomplete url={'http://localhost:3001/api/v1/users'}/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
