import PropTypes from "prop-types";
import {
  Box,
  Button,
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
import CancelQuotaConfirmationModal from "./cancel-quota-confirmation-modal";
import { useState } from "react";

export const CuotasTable = (props) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState("");
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card
      sx={{
        width: "100%",
        m: 0,
      }}
    >
      {selectedQuota ? (
        <CancelQuotaConfirmationModal
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          cuota={selectedQuota}
          from={selectedQuota?.FECHA_PROCESO.substr(0,10)}
          to={selectedQuota?.FECHA_PROCESO.substr(0,10)}
        />
      ) : (
        <></>
      )}

      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((cuota) => {
                return (
                  <TableRow hover key={cuota.FECHA_PROCESO}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {cuota.FECHA_PROCESO.substr(0, 10)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{cuota.ESTATUS}</TableCell>
                    <TableCell>{cuota.MONTOTOTAL}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setOpenConfirmation(true);
                          setSelectedQuota(cuota);
                        }}
                      >
                        Anular Cuota
                      </Button>
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
        rowsPerPageOptions={[5]}
      />
    </Card>
  );
};

CuotasTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
