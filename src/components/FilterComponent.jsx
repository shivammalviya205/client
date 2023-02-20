import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function FilterComponent({filterterm,setfilterterm}) {
  

  const handleChange = (event) => {
    setfilterterm(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 150,marginLeft:'30px',borderRadius:3 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterterm}
          sx={{maxHeight:'40px'}}
          onChange={handleChange}
          
        >
          <MenuItem value={'Following'} sx={{color:'red'}}>Following</MenuItem>
          <MenuItem value={'Popular'}>Popular</MenuItem>
          <MenuItem value={'Latest'}>Latest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
