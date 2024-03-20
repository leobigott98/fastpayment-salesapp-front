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
import UserAutocomplete from "./user-autocomplete";
import GeneralSuccessModal from "./general-success-modal";
import GeneralErrorModal from "./general-error-modal";
import { useEffect, useState } from "react";
import { PriceTable } from "./price-table";
import { style, textAlign } from "@mui/system";

const AddSaleForm = () => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [serie, setSerie] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    setSerie(serieNumber())
  },[])

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

  const handleSale = async(e)=>{
    e.preventDefault;
    try{
        const body = {
            v_cusm_id: customer.cusm_id,
            v_sale_serie: serie,
            "v_sale_total": total 
        }
        await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(body)
        }).then(async(result)=>{
            const saleInfo = await result.json();
            const sale_id = saleInfo.result[0].sale_id;

           items.forEach(async(item)=>{
            const body = {
                v_sale_id: sale_id,
                v_prod_id: item.product.id,
                v_salesdt_qty: item.qty,
                v_prod_price: item.product.precio
            }
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/detail`,{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(body)
           }).then(()=>{
            setSuccess(true);
           })
        })

        })

    }catch(err){
        console.log(err);
        setError(true);
    }
   
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
        <GeneralSuccessModal message={`Cotización creada con éxito`} opened={success} setOpened={setSuccess}/>
        <GeneralErrorModal opened={error} setOpened={setError}/>
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
                sx={{mb: 1}}
                id="serie"
                label="Serie"
                inputProps={{style:{textAlign: 'center'}}}
                value={serie}
                //variant="standard"
              />
            </Stack>
          </Stack>
          <form noValidate>
            <Stack spacing={1}>
              <Stack spacing={2}>
                <UserAutocomplete
                  url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/customers/all`}
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
                    url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/products`}
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
          <PriceTable items={items} setItems={setItems} total={total} setTotal={setTotal}/>
          <Button
                //size="large"
                type="submit"
                onClick={(e)=>handleSale(e)}
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

export default AddSaleForm;
