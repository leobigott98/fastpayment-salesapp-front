import PropTypes from "prop-types";
import {
  Box,
  Card,
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
import DotsMenu from "src/components/dots-menu";

export const SalesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    type
  } = props;

  return (
    <Card
      sx={{
        width:'100%',
        m: 0
      }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serie</TableCell>
                <TableCell>Fecha</TableCell>
                {items[0]?.vendedor ? <TableCell>Vendedor</TableCell> : (<></>)}
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

                return (
                  <TableRow
                    hover
                    key={sale.id}
                    selected={isSelected}
                  >
                    
                    <TableCell>
                      <Stack 
                      alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        <Typography variant="subtitle2">{sale.serie.substring(6)}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{px:0}}>{sale.fecha}</TableCell>
                    {sale?.vendedor ? <TableCell>{sale.vendedor}</TableCell> : <></>}
                    <TableCell>{sale.cliente}</TableCell>
                    <TableCell>{sale.total}</TableCell>
                    <TableCell>{sale.pagado}</TableCell>
                    <TableCell>{sale.balance}</TableCell>
                    <TableCell>{sale.status}</TableCell>
                    <TableCell>
                      <DotsMenu 
                      tranred={sale.trandred}
                      type={type}
                      id={sale.id} 
                      balance={sale.balance}/>
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
