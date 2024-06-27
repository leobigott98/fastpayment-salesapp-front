import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const fetchData = async(url, body)=> {
    //if (true) {
  if(body){
    console.log(body)
    try{
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          "X-Auth-Token": window.localStorage.getItem("token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const jsonResult = await result.json();
      return jsonResult.result;

    }catch(err){
      console.log(err.message)
    }
  }else{
      try{
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            "X-Auth-Token": window.localStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
        });
        const jsonResult = await result.json();
        if(jsonResult.result[0].cantidad_disponible != null){
          console.log('qty')
          const filtered = jsonResult.result.filter((result)=> result.cantidad_disponible > 0)
          console.log(filtered)
          return filtered
        } 
        return jsonResult.result;

      }catch(err){
        console.log(err.message)
      }
    }  
      }

export default function UserAutocomplete({name, url, isOptionEqualToValue, getOptionLabel, customers, data, setData, disabled, body}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [input, setInput] = React.useState(null);
  const [disableElement, setDisableElement] = React.useState(false)

  React.useEffect(()=>{
    setData(input)
    if(disabled){
      setDisableElement(disabled)
    }    
  },[input, setData, disabled])

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(await fetchData(url, body));
        //console.log(await fetchData())
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, url, body]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: '100%', paddingTop:0, mb: 1}}
      open={open}
      disabled={disabled}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={data!=''?data:input}
      onChange={(event, value)=>{
        setInput(value);
        //setData(value)
      }}
      isOptionEqualToValue={
        //roles? (option, value) => option.rol_desc === value.rol_desc :
        customers? (option, value) => option.cliente === value.cliente :
        isOptionEqualToValue}
        //products? (option, value) => option.modelo === value.modelo :
        //saleProducts? (option, value) => option.name == value.name:
        //payOptions? (option, value) => option.ops_desc === value.ops_desc :
        //banks? (option, value) => option.bank_desc === value.bank_desc :
        //codlocalid? (option, value) => option.cod_value === value.cod_value :
        //serials? (option, value) => option.serial_num === value.serial_num :
        //plans? (option, value) => option.name === value.name :
         //(option, value) => option.usuario === value.usuario}
      getOptionLabel={
        //roles? (option) => option.rol_desc:
        customers? (option) => option.cliente:
        getOptionLabel}
        //products? (option) => option.modelo:
        //saleProducts? (option) => option.name  :
        //payOptions? (option) => option.ops_desc :
        //banks? (option) => option.bank_desc :
        //codlocalid? (option) => option.cod_value :
        //serials? (option) => option.serial_num :
        //plans? (option) => option.name :
        // (option) => option.usuario}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
        sx={{p:0}}
          {...params}
          label={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment >
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