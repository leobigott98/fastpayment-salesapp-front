import PropTypes from "prop-types";
import { format } from "date-fns";
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
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";
import DotsMenu from "src/components/dots-menu";

export const SalesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const router = useRouter();

  /*   const handleClick = (categoryId)=>{
    router.push(`/inventory/${categoryId}`)
  } */

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Serie</TableCell>
                {items[0]?.vendedor ? <TableCell>Vendedor</TableCell> : <></>}
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Pagado</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((sale) => {
                const isSelected = selected.includes(sale.id);
                {
                  /* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */
                }

                return (
                  <TableRow
                    hover
                    key={sale.id}
                    selected={isSelected}
                    //onClick={(e) => handleClick(product.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(sale.id);
                          } else {
                            onDeselectOne?.(sale.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack 
                      alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">{sale.serie}</Typography>
                      </Stack>
                    </TableCell>
                    {sale?.vendedor ? <TableCell>{sale.vendedor}</TableCell> : <></>}
                    <TableCell>{sale.cliente}</TableCell>
                    <TableCell>{sale.total}</TableCell>
                    <TableCell>{sale.pagado}</TableCell>
                    <TableCell>{sale.balance}</TableCell>
                    <TableCell>{sale.status}</TableCell>
                    <TableCell>
                      <DotsMenu 
                      sales 
                      id={sale.id} 
                      balance={sale.balance}/>
                    </TableCell>
                    {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
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

SalesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
