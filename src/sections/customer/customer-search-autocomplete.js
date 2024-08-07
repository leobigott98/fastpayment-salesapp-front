import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, SvgIcon, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';

export const CustomersSearchAutocomplete = ({ data, query, setQuery }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [input, setInput] = useState(null);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(data.map((element)=>{
            return element = `${element.doc_value}-${element.cusm_ndoc} ${element.cusm_namec}`
        }));
        //console.log(await fetchData())
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(()=>{
    if(input !== ''){
        setQuery(data.filter((element)=> `${element.doc_value}-${element.cusm_ndoc} ${element.cusm_namec}` === input))
      }
      else{
        setQuery([])
      }
  },[input])

  return (
    <Card sx={{ p: 2 }}>
    <Autocomplete
      id="asynchronous-demo"
      sx={{ maxWidth: 500 }}
      open={open}
      placeholder="Buscar cliente"
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={input}
      onChange={(event, value)=>{
        setInput(value);
        //setData(value)
      }}
      
      options={options}
      loading={loading}
      fullWidth
     
      renderInput={(params) => (
        <TextField
        sx={{p:0}}
          {...params}
          label={'Buscar Cliente'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? 
                <CircularProgress 
                color="inherit" 
                size={20} /> : 
                null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
    </Card>
  );
};
