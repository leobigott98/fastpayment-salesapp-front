import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import UserAutocomplete from "src/components/user-autocomplete";
import GeneralSuccessModal from "src/components/general-success-modal";
import GeneralErrorModal from "src/components/general-error-modal";
import { useEffect, useState } from "react";
import { PriceTable } from "src/components/price-table";
import { style, textAlign } from "@mui/system";

const Page = () => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [items, setItems] = useState([]);
  const handleAdd = ()=>{
    setItems([
        ...items,
        {product: product, qty: qty}
    ])
  }

  const serieNumber = ()=>{
    const today = new Date();
    const todayObject = {
        yyyy: today.getFullYear(),
        mm: today.getMonth() + 1,
        dd: today.getDate(),
        hh: today.getHours(),
        min: today.getMinutes(),
        ss: today.getSeconds(),
        ms: today.getMilliseconds()
    }

    if (todayObject.dd < 10) todayObject.dd = '0' + todayObject.dd;
    if (todayObject.mm < 10) todayObject.mm = '0' + todayObject.mm;

    const formattedToday = todayObject.yyyy+todayObject.mm+todayObject.dd+todayObject.hh+todayObject.min+todayObject.ss+todayObject.ms;

    return formattedToday;

  }

  return (
    <>
      <Head>
        <title>Ventas | Ventas FP</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Cotización</Typography>
            </Stack>
            <Stack spacing={1} sx={{ width: "30%" }}>
              {/* <Card  sx={{minWidth:275}}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{textAlign: 'center'}}>
                        Test
                    </Typography>
                </CardContent>
              </Card> */}

              <TextField
                disabled
                //size="large"
                fullWidth
                //margin="normal"
                //sx={{textAlign: 'center'}}
                id="serie"
                label="Serie"
                inputProps={{style:{textAlign: 'center'}}}
                value={serieNumber()}
                //variant="standard"
              />
            </Stack>
          </Stack>
          <form noValidate>
            <Stack spacing={1}>
              <Stack spacing={2}>
                <UserAutocomplete
                  url={"http://localhost:3001/api/v1/customers/all"}
                  customers
                  data={customer}
                  setData={setCustomer}
                  name={"Cliente"}
                />
                {customer?.cliente ? (
                  <Stack spacing={2}>
                    <Typography variant="h6">Datos del Cliente</Typography>
                    <Stack spacing={5} direction="row">
                      <Stack spacing={1} direction="row">
                        <Typography>Tipo de Persona:</Typography>
                        <Typography>{customer.person_desc}</Typography>
                      </Stack>
                      <Stack spacing={1} direction="row">
                        <Typography>Nombre y RIF:</Typography>
                        <Typography>{customer.cliente}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ) : (
                  ""
                )}
                <Typography variant="h6">Datos del Producto</Typography>
                <Stack spacing={2} direction="row" >
                  <UserAutocomplete
                    url={"http://localhost:3001/api/v1/products"}
                    products
                    data={product}
                    setData={setProduct}
                    name={"Producto"}
                  />
                  {product?.marca ? (
                    <Stack sx={{alignItems:'center'}}>
                      <Typography>Cantidad Disp.:</Typography>
                      <Typography>{product.cantidad_disponible}</Typography>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  <TextField
                        fullWidth
                        label="Cantidad"
                        name="qty"
                        value={qty}
                        onChange={(event)=>setQty(Number(event.target.value))}
                        sx={{width: "20%"}}
                    />
                    <Button
                    //size="large"
                    //type="submit"
                    onClick={handleAdd}
                    //disabled={activeStep === 4}
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                >
                    Agregar
                </Button>
                </Stack>
                {product?.marca ? (
                  <Stack spacing={2}>
                    <Stack spacing={5} direction="row">
                      <Stack spacing={1} direction="row">
                        <Typography>Precio:</Typography>
                        <Typography>{product.precio}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ) : (
                  ""
                )}
              </Stack>

              {/* <Button
                    size="large"
                    type="submit"
                    //onClick={handleSubmit}
                    //disabled={activeStep === 4}
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                >
                    Enviar
                </Button> */}
            </Stack>
          </form>
          <Stack spacing={2}>
          <PriceTable items={items}/>
          <Button
                //size="large"
                //type="submit"
                //onClick={handleAdd}
                //disabled={activeStep === 4}
                variant="contained"
                sx={{ marginLeft: "auto" }}
                >
                    Generar Cotización
            </Button>

          </Stack>
          
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
