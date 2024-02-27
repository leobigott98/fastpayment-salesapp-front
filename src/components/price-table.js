import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Scrollbar } from 'src/components/scrollbar';

export const PriceTable = ({items}) => {
    const [total, setTotal] = useState(0);

    const addItems = ()=>{
        items.forEach((item)=>{
            setTotal(total + (item.product.precio * item.qty))
        })
    }

    useEffect(()=>{
        addItems()
    }, [items]);

  return (
    <Card sx={{mt: 5}}>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Cantidad
                </TableCell>
                <TableCell>
                  Precio Unitario
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item) => {
                return (
                  <TableRow
                    key={items.indexOf(item)}
                  >
                    <TableCell>
                    <Typography >
                        {item.product.modelo} 
                    </Typography>
                    </TableCell>
                    <TableCell>
                      {item.qty}
                    </TableCell>
                    <TableCell>
                      ${item.product.precio}
                    </TableCell>
                    <TableCell>
                      ${item.product.precio * item.qty}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow >
              <TableCell colSpan={2}/>
                <TableCell >
                    <Typography variant='h6'>
                        Total Cotización
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>
                        ${total}
                    </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};
