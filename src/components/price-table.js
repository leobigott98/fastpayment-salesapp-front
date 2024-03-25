import {
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Scrollbar } from "src/components/scrollbar";
import BackspaceIcon from "@mui/icons-material/Backspace";

export const PriceTable = ({ items, setItems, total, setTotal }) => {

  useEffect(() => {
    const addItems = () => {
      let acumulado = 0
      items.forEach((item) => {
        acumulado = acumulado + (item.product.precio * item.qty);
      });
      return acumulado;
    };
   setTotal(addItems())
  }, [items, addItems, setTotal]);

  return (
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
                  <TableRow key={items.indexOf(item)}>
                    <TableCell>
                      <Typography>{item.product.modelo}</Typography>
                    </TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>${item.product.precio}</TableCell>
                    <TableCell>${item.product.precio * item.qty}</TableCell>
                    <TableCell 
                    size="small" 
                    sx={{ width: 0.1 }}>
                      <Button
                        size="small"
                        onClick={()=>{
                          setItems(items.filter((i) => items.indexOf(i) != items.indexOf(item)))
                          }}
                      >
                        <BackspaceIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
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
  );
};
