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
//import { Scrollbar } from "src/components/scrollbar";

export const TerminalsTable = (props) => {
  const { 
    count = 0, 
    items = [], 
    onPageChange = () => {}, 
    page = 0, 
    rowsPerPage = 0 } = props;

  return (
    <>
    {items.length == 0 ? (
      <>
        {" "}
        <Typography >El cliente no tiene terminales creados</Typography>
      </>
    ) : (
      <>
    <Card
      sx={{
        width: "100%",
        m: 0,
      }}
    >
      
          <Box sx={{ minWidth: 150 }}>
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
                    <TableRow hover key={terminal.terminal}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
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

          <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
          />
        
    </Card>
    </>
      )}
    </>
  );
};

TerminalsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
