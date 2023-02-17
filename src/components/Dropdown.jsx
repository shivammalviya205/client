import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({isuser,setisuser}) {
  
  const handleChange = (event) => {
    setisuser(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} id="remove">
      <FormControl fullWidth >
        {/* <InputLabel id="demo-simple-select-label">{isuser?'UserName':'PostDesc'}</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isuser}
          onChange={handleChange}
          
        >
          <MenuItem value={true}>UserName</MenuItem>
          <MenuItem value={false}>PostDesc</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
