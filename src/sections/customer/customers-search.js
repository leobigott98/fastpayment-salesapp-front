import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useState, useEffect } from 'react';

export const CustomersSearch = ({ data, query, setQuery }) => {
  const [search, setSearch] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(search !== ''){
      setQuery(data.filter((element)=> element.cusm_namec === search || `${element.doc_value}-${element.cusm_ndoc}` === search))
    }
    else{
      setQuery([])
    }
  }

  return (
    <Card sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Buscar cliente"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </form>
    </Card>
  );
};
