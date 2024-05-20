import PropTypes from "prop-types";
import { format } from "date-fns";
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
import { Scrollbar } from "src/components/scrollbar";
import CustomerInfo from "./customer-info-modal";
import { useState, useEffect } from "react";

export const CustomersTable = (props) => {
  const [open, setOpen] = useState([])
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  useEffect(()=>{
    setOpen(items?.map(()=> false))
  },[items])


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>RIF/Cédula</TableCell>
                <TableCell>Nombre de Empresa</TableCell>
                <TableCell>Tipo de Persona</TableCell>
                <TableCell>Actividad Comercial</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                return (
                    <TableRow hover key={customer.cusm_id} >
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Typography variant="subtitle2">
                            {customer.doc_value}-{customer.cusm_ndoc}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.cusm_namec}</TableCell>
                      <TableCell>{customer.person_desc}</TableCell>
                      <TableCell>{customer.actv_desc}</TableCell>
                      <TableCell>
                        <CustomerInfo open={open} index={items.indexOf(customer)} setOpen={setOpen} customer={customer} />
                      </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
