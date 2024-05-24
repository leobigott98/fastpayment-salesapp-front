import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SalesDetailModal({ open, setOpen, id }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getItems = async (id) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/v1/sales/detail/${id}`, {
        method: "GET",
        headers: {
          "X-Auth-Token": window.localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setItems(json);
      }
    };
    if (open) {
      console.log("opened");
      getItems(id);
    }
  }, [open]);

  useEffect(() => {
    const addItems = () => {
      let acumulado = 0;
      items.forEach((item) => {
        acumulado = acumulado + item.prod_price * item.saledt_qty;
      });
      return acumulado;
    };
    setTotal(addItems());
  }, [items, setTotal]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            <b>Detalle de Venta </b>
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <b>Información del Vendedor</b>
          </Typography>
          <Typography variant="p" component="p">
            <b>Vendedor: </b> {`${items[0]?.user_name} ${items[0]?.user_last}`} <br />
            <b>Correo: </b> {`${items[0]?.user_email}`} <br />
            <b>Comisión: </b> {`${items[0]?.sell_fee}%`} <br />
          </Typography>
          <Card sx={{ mt: 5 }}>
            <Scrollbar>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell size="small"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items?.map((item) => {
                      return (
                        <>
                          <TableRow key={items.indexOf(item)}>
                            <TableCell>
                              <Typography>{item.prod_model}</Typography>
                            </TableCell>
                            <TableCell>{item.saledt_qty}</TableCell>
                            <TableCell>${item.prod_price}</TableCell>
                            <TableCell>${item.prod_price * item.saledt_qty}</TableCell>
                          </TableRow>
                          <TableRow key={items.indexOf(item)}>
                            <TableCell colSpan={5}>
                              {item.plan_desc !== null ? item.plan_desc : "SIN PLAN ASIGNADO"}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell>
                        <Typography variant="h6">Total Cotización</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>${total}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
          </Card>
          <Button
            variant="outlined"
            sx={{ mt: 2, display: "flex", mx: "auto", width: "100%" }}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
