import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const fetchData = async(url)=> {
    //if (true) {
      try{
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            "X-Auth-Token": window.localStorage.getItem("token")
          }
        });
        const jsonResult = await result.json();
        return jsonResult.result;

      }catch(err){
        console.log(err.message)
      }
          
      }

export default function AsyncAutocomplete({url, name, update, activity, bank}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(await fetchData(url));
        //console.log(await fetchData())
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, url]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth
      id="asynchronous-demo"
      //sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={update.v_actv_id? update.v_actv_id : 
      update.v_bank_id ? update.v_bank_id: null}
      onChange={(event, value)=>{
        update.setActvId? value === null? update.setActvId(''): update.setActvId(value) :
        value === null? update.setBankId(''): update.setBankId(value)
      }}
      isOptionEqualToValue={
        activity? (option, value) => option.actv_desc === value.actv_desc :
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