import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import UserAutocomplete from "./user-autocomplete";
import GeneralSuccessModal from "./general-success-modal";
import GeneralErrorModal from "./general-error-modal";
import { useEffect, useState } from "react";
import { PriceTable } from "./price-table";

const AddSaleForm = () => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [plan, setPlan] = useState("");
  const [qty, setQty] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [serie, setSerie] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSerie(serieNumber());
  }, []);

  const handleAdd = () => {
    setItems([...items, { product: product, qty: qty, plan: plan }]);
  };

  const serieNumber = () => {
    const today = new Date();
    const todayObject = {
      yyyy: today.getFullYear(),
      mm: today.getMonth() + 1,
      dd: today.getDate(),
      hh: today.getHours(),
      min: today.getMinutes(),
      ss: today.getSeconds(),
      ms: today.getMilliseconds(),
    };

    if (todayObject.dd < 10) todayObject.dd = "0" + todayObject.dd;
    if (todayObject.mm < 10) todayObject.mm = "0" + todayObject.mm;
    if (todayObject.min < 10) todayObject.min = "0" + todayObject.min;
    if (todayObject.ss < 10) todayObject.ss = "0" + todayObject.ss;
    if (todayObject.ms < 10) todayObject.ms = "00" + todayObject.ms;
    if (todayObject.ms < 100) todayObject.ms = "0" + todayObject.ms;

    const formattedToday =
      todayObject.yyyy +
      todayObject.mm +
      todayObject.dd +
      todayObject.hh +
      todayObject.min +
      todayObject.ss +
      todayObject.ms;

    return formattedToday;
  };

  const handleSale = async (e) => {
    e.preventDefault;
    try {
      const body = {
        v_cusm_id: customer.cusm_id,
        v_sale_serie: serie,
        v_sale_total: total,
      };
      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      }).then(async (result) => {
        const saleInfo = await result.json();
        const sale_id = saleInfo.result[0].sale_id;

        items.forEach(async (item) => {

          const body = {
            v_sale_id: sale_id,
            v_prod_id: item.product.id ,
            v_salesdt_qty: item.qty,
            v_prod_price: item.product.precio,
            v_plan_id: item.plan.id
          };
          
          
          await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/detail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": window.localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
          }).then(async (result) => {
            const json = await result.json();
            setMessage(json.result[0].message);
            if (json.result[0].error_num > 0) {
              setError(true);
            }
            setSuccess(true);
          });
        });

        /* const printDetails = {
          client: customer.cliente,
          type: customer.person_desc,
          items,
          serie          
        } */

        /* await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/print`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": window.localStorage.getItem("token")
          },
          body: JSON.stringify(body)
        }) */

      });
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setError(true);
    }
  };

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
          <GeneralSuccessModal message={message} opened={success} setOpened={setSuccess} />
          <GeneralErrorModal message={message} opened={error} setOpened={setError} />
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Cotización</Typography>
            </Stack>
            <Stack spacing={1} sx={{ width: "30%" }}>

              <TextField
                disabled
                //size="large"
                fullWidth
                //margin="normal"
                sx={{ mb: 1 }}
                id="serie"
                label="Serie"
                inputProps={{ style: { textAlign: "center" } }}
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
                <Stack spacing={1} direction="column">
                <Stack spacing={2} direction="row">
                  <UserAutocomplete
                    url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/products`}
                    products
                    data={product}
                    setData={setProduct}
                    name={"Producto"}
                  />
                  {product?.marca ? (
                    <Stack sx={{ alignItems: "center" }}>
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
                    onChange={(event) => setQty((event.target.value))}
                    sx={{ width: "20%" }}
                  />
                  
                </Stack>
                {product?.marca ? (
                      <Stack spacing={1} direction="row" >
                        <Typography sx={{mt: -2}}>Precio: {product.precio}</Typography>
                        
                      </Stack>
                ) : (
                  ""
                )}
                </Stack>
                <Typography variant="h6">Plan</Typography>
                <Stack spacing={2} direction="row">
                  <UserAutocomplete
                    url={`${process.env.NEXT_PUBLIC_APIURL}/api/v1/tranred/terminal/plans/all`}
                    plans
                    data={plan}
                    setData={setPlan}
                    name={"Plan"}
                  />
                </Stack>
                <Button
                    //size="small"
                    //type="submit"
                    onClick={handleAdd}
                    disabled={!Number(qty) || Number(qty)<1 || !plan || !product}
                    variant="contained"
                    sx={{ position: "relative", left: "75%", width: "25%" }}
                  >
                    Agregar
                  </Button>
              </Stack>
            </Stack>
          </form>
          <Stack spacing={2}>
            <PriceTable items={items} setItems={setItems} total={total} setTotal={setTotal} />
            <Button
              //size="large"
              type="submit"
              onClick={(e) => handleSale(e)}
              disabled={items.length < 1 || !customer}
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
