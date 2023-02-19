import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

function ResponsiveDialog({open,setOpen,token,postUserId,id}) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const[msg,setmsg]=React.useState();
 const[issent,setissent]=React.useState(false)
 const handlesubmit = async() => {
    // await newComment(comment);
    const response = await fetch(`http://localhost:3002/posts/hire/${postUserId}/${id}`,{
     method:'POST',
     headers: {
          Authorization:token,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         msg
       }
       )
   });
   const data=await response.json();
    console.log(data);
    if(data){setissent(true)}
 }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Send an email about any oppurtunity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {issent?<div>Message Sent successfully</div>:<TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Enter message" 
         type="text" value={msg} onChange={(e) => { setmsg(e.target.value) }} /> 
  }</DialogContentText>
        </DialogContent>
        <DialogActions>
         <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          {issent?'':<Button onClick={handlesubmit} autoFocus>
            Send
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;
