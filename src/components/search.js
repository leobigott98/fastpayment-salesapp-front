import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AsyncAutocomplete({data, type}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [fields, setFields] = useState('')
  const loading = open && options.length === 0;

  useEffect(() => {
    setOptions(data)
    setFields(type)
  }, [setOptions, data]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={data!=''?data:input}
      onChange={(event, value)=>{
        setInput(value);
      }}
      isOptionEqualToValue={
        fields == 'customers'? (option, value) => option.cusm_namec === value.cusm_namec :
        fields == 'sales'? (option, value) => option.cliente === value.cliente :
        fields == 'products'? (option, value) => option.modelo === value.modelo :
        (option, value) => option.bank_desc === value.bank_desc}
      getOptionLabel={
        activity? (option) => option.actv_desc :
        (option) => option.bank_desc}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? 
                <CircularProgress 
                color="inherit" 
                size={20} /> : 
                null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
