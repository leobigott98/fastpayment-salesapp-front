import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const fetchData = async(url, data)=> {
    //if (true) {
      try{
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            "X-Auth-Token": window.sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const jsonResult = await result.json();
        return jsonResult.result;

      }catch(err){
        console.log(err.message)
      }
          
      }

export default function Asynchronous({url, data, name, country, state, municipality, city, parrish, update, enabled, erase, dependant}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const onChangeCountry =(value)=>{
    update.setCountry(value);
    dependant.setState('');
    dependant.setMunicipality('');
    dependant.setCity('');
    dependant.setParrish('');
  }

  const onChangeState =(value)=>{
    update.setState(value);
    dependant.setMunicipality('');
    dependant.setCity('');
    dependant.setParrish('');
  }

  const onChangeMunicipality =(value)=>{
    update.setMunicipality(value);
    dependant.setParrish('');
  }

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(await fetchData(url, data));
        //console.log(await fetchData())
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, data, url]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      disabled={
        country? false:
        state? enabled.country === ''? true : false :
        municipality? enabled.state === ''? true : false : 
        city? enabled.state === ''? true : false :
        parrish? enabled.municipality === '' ? true : false : true
      }
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={update.country? update.country : 
      update.state && erase != ''? update.state:
      update.municipality && erase != ''? update.municipality:
      update.city && erase != ''? update.city:
      update.parrish && erase != ''? update.parrish: null}
      onChange={(event, value)=>{
        update.setCountry? value === null? update.setCountry(''): onChangeCountry(value) :
        update.setState? value === null? update.setState(''): onChangeState(value):
        update.setMunicipality? value === null? update.setMunicipality('') : onChangeMunicipality(value):
        update.setCity? value === null? update.setCity('') : update.setCity(value):
        value === null? update.setParrish('') : update.setParrish(value)
      }}
      isOptionEqualToValue={
        country? (option, value) => option.pais_code === value.pais_code :
        state? (option, value) => option.estad_desc === value.estad_desc :
        municipality? (option, value) => option.municp_desc === value.municp_desc :
        city? (option, value) => option.ciud_desc === value.ciud_desc :
        (option, value) => option.parr_desc === value.parr_desc}
      getOptionLabel={
        country? (option) => option.pais_code :
        state? (option) => option.estad_desc :
        municipality? (option) => option.municp_desc :
        city? (option) => option.ciud_desc :
        (option) => option.parr_desc}
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