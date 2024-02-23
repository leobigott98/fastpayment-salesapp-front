import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const locations = [
    {id:1,
    label: "Región Capital"},
    {id:2,
    label: "Región Central"},
    {id:3,
    label: "Región Occidental"},
    {id:4,
    label: "Región Oriental"}
]

const fetchData = async(url)=> {
    //if (true) {
      try{
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            "X-Auth-Token": window.sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
          },
        });
        const jsonResult = await result.json();
        return jsonResult.result;

      }catch(err){
        console.log(err.message)
      }
          
      }

export default function UserAutocomplete({url, roles, role, setRole}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [user, setUser] = React.useState(null);
  React.useEffect(()=>{
    if(roles) {setRole(user)}
  },[user])

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
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: '50%', paddingTop:0 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={user}
      onChange={(event, value)=>{
        setUser(value);
      }}
      isOptionEqualToValue={
        roles? (option, value) => option.rol_desc === value.rol_desc :
         (option, value) => option.usuario === value.usuario}
      getOptionLabel={
        roles? (option) => option.rol_desc:
         (option) => option.usuario}
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
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}