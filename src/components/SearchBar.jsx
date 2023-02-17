import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import BasicSelect from './Dropdown';


export default function CustomizedInputBase({query,setquery,postquery,setpostquery,postlength}) {
    const[isuser,setisuser]=useState(true);
     isuser?setpostquery(''):setquery('');
  return (
    <>
    <Paper
      component="form"
      sx={{ p: '10px 20px', display: 'flex', alignItems: 'center', width: 600,margin: 'auto',marginTop:'20px', }}
    >
       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 ,fontSize:'18px'}}
        placeholder="Search By User Name"
        value={isuser?query:postquery}

        onChange={(e)=>{isuser?setquery(e.target.value):setpostquery(e.target.value)}}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <BasicSelect isuser={isuser} setisuser={setisuser}/>
      </Paper>
      {postlength===0||isuser?'':
      <div
      component="form"
      style={{ p: '10px 20px', display: 'flex', flexDirection:'column' ,alignItems: 'center', width: 800,margin: 'auto',marginTop:'20px', }}
    >
      <h1>{isuser?'':`${postquery}`}</h1>
      <h3>{isuser?'':`${postlength} outstanding ${postquery} designs for inspiration`}</h3>
    </div>}
    {postlength===0?
      <div
      component="form"
      style={{ p: '10px 20px', display: 'flex', flexDirection:'column' ,alignItems: 'center', width: 800,margin: 'auto',marginTop:'20px', }}
    >
      <h1>No Results found</h1>
      <h3>It seems we can’t find any results based on your search.</h3>
    </div>:''}
    </>
  );
}
