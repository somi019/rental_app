import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating,} from '@mui/material';
import { useState } from 'react';

function VracanjeAuta({automobil,onRezervacija,onOcena}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    

    const handleClose = () => {
        setOpen(false);
      };

      const handleClickOpen = () => {
        setOpen(true);
      };

    const handleConfirm = () => {

        if(value != null ){
          automobil.ocene.push(value)
          onOcena(automobil.ocene);  
        }
      
        
        onRezervacija();
        handleClose();
      };

      


return(<>
 <Button variant="outlined" onClick={handleClickOpen}>
        Vrati vozilo
      </Button>

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ocenite vozilo</DialogTitle>
        <DialogContent>
      
        
        
           <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
         
        </DialogContent>
        <DialogActions>

          
          <Button onClick={handleConfirm} >
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>

      </>
    )
}

export default VracanjeAuta;