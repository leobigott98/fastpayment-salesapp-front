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
import DotsMenu from "src/components/dots-menu";
import { useState } from "react";
import AccountModal from "./account-modal";

export const SerialTranredTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    open,
    setOpen
  } = props;

const handleModalOpen = ()=>{
  setOpen(true);
}

  return (
    <Card
      sx={{
        width:'100%',
        m: 0
      }}>
      <AccountModal open={open} setOpen={setOpen}/>
      <Scrollbar>
        <Box sx={{ minWidth: 800}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((serial) => {
                return (
                  <TableRow
                    hover
                    key={serial.serial}
                  >
                    
                    <TableCell>
                      <Stack 
                      alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        <Typography variant="subtitle2">{serial.serial}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{serial.marca}</TableCell>
                    <TableCell>{serial.modelo}</TableCell>
                    <TableCell>
                      <Button onClick={handleModalOpen}>
                        ¿Desea Asignar Cuenta?
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

SerialTranredTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};