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

export const TerminalsTable = (props) => {
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
                <TableCell>Terminal</TableCell>
                <TableCell>Nro de Cuenta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((terminal) => {

                return (
                  <TableRow
                    hover
                    key={terminal.terminal}
                  >
                    
                    <TableCell>
                      <Stack 
                      alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        <Typography variant="subtitle2">{terminal.terminal}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{terminal.nroCuenta}</TableCell>                    
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
