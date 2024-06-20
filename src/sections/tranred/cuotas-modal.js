import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { CuotasTable } from "./cuotas-table";
import { useState, useCallback, useMemo } from "react";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  blockSize: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useCuotas = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);
};

const useCuotaIds = (cuotas) => {
  return useMemo(() => {
    return cuotas.map((cuota) => cuota.FECHA_PROCESO);
  }, [cuotas]);
};

const CuotasModal = ({ data, open, setOpen }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const cuotas = useCuotas(data, page, rowsPerPage);
  const cuotasIds = useCuotaIds(cuotas);
  const cuotasSelection = useSelection(cuotasIds);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {cuotas.length ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
              {`Cuotas terminal: ${cuotas[0].TERMINAL}`}
            </Typography>
            <CuotasTable
              count={data.length}
              items={cuotas}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </>
        ) : (
          `El terminal no posee cuotas pendientes en el rango de fecha consultado`
        )}
      </Box>
    </Modal>
  );
};

export default CuotasModal;
