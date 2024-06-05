import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function RezervacijaAuta({price,onRezervacija}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const calculatePrice = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const dayDifference = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const basePrice = price; 
    const totalPrice = basePrice * (dayDifference+1);

    alert(`Ukupna cena: €${totalPrice}`); 
  };


  const handleConfirm = () => {
   
    onRezervacija();
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Rezervisi
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Izračunavanje cene iznajmljivanja</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Molimo Vas da izaberete datume preuzimanja i vraćanja vozila kako bi se izračunala cena iznajmljivanja.
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DialogContent>
              <DatePicker
                label="Datum preuzimanja"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Datum vraćanja"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </DialogContent>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={calculatePrice}>Izračunaj cenu </Button>
          <Button onClick={handleConfirm} disabled={!startDate || !endDate}>
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default RezervacijaAuta;
