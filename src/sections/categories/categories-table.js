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

export const CategoriesTable = (props) => {
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

  const handleClick = (categoryId)=>{
    router.push(`/inventory/${categoryId}`)
  }

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
                  Nombre
                </TableCell>
                <TableCell>
                  Descripción
                </TableCell>
                {/* <TableCell>
                  Ubicación
                </TableCell> */}
                {/* <TableCell>
                  Teléfono
                </TableCell> */}
                {/* <TableCell>
                  Agregado
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((category) => {
                const isSelected = selected.includes(category.id);
                {/* const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */}

                return (
                  <TableRow
                    hover
                    key={category.id}
                    selected={isSelected}
                    onClick={(e) => handleClick(category.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(category.id);
                          } else {
                            onDeselectOne?.(category.id);
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
                          {category.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {category.description}
                    </TableCell>
                    {/* <TableCell>
                      {customer.address.city}, {customer.address.state}, {customer.address.country}
                    </TableCell> */}
                    {/* <TableCell>
                      {customer.telefono_fijo? customer.telefono_fijo : customer.description}
                    </TableCell> */}
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

CategoriesTable.propTypes = {
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
