import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import { Scrollbar } from 'src/components/scrollbar';
import { useRouter } from 'next/router';
import DotsMenu from 'src/components/menu';

export const ProductsTable = (props) => {
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
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

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
                <TableCell>
                  Marca
                </TableCell>
                <TableCell>
                  Modelo
                </TableCell>
                <TableCell>
                  Especificaciones
                </TableCell>
                <TableCell>
                  Precio
                </TableCell>
                <TableCell>
                  
                </TableCell>
                {/* <TableCell>
                  Agregado
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product) => {
                const isSelected = selected.includes(product.id);
                {/* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */}

                return (
                  <TableRow
                    hover
                    key={product.id}
                    selected={isSelected}
                    //onClick={(e) => handleClick(product.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(product.id);
                          } else {
                            onDeselectOne?.(product.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {product.marca}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {product.modelo}
                    </TableCell>
                    <TableCell>
                      {product.especificacion}
                    </TableCell>
                    <TableCell>
                      {product.precio}
                    </TableCell>
                    <TableCell>
                      <DotsMenu/>
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

ProductsTable.propTypes = {
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
  selected: PropTypes.array
};