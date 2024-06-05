import React, { useState } from "react"
import './App.css';
import RezervacijaAuta from "./RezervacijaAuta";
import VracanjeAuta from "./VracanjeAuta";
import { TableRow,TableCell,Button,TextField,Select,MenuItem } from "@mui/material";


function JedanAutomobil({automobil,obrisiAutomobil,snimiIzmene,onOcena}){

    var [izmena,setIzmena]=useState(false)
    var[modelVozila,setmodelVozila] = useState(automobil.modelVozila)
    var[godiste,setGodiste] = useState(automobil.godiste)
    var[cena,setCena] = useState(automobil.cena)
    var[klima,setKlima] = useState(automobil.klima)
    var[rezervacija,setRezervacija] = useState(automobil.rezervacija)
    var[ocene,setOcene] = useState(automobil.ocene)


    function dodavanjeOcene(noveOcene){
        setOcene(noveOcene);
        onOcena()
      };

    
    function promenaKlime(e){
            setKlima(e.target.value == "true")

    }

    function rezervisiVozilo(){
        setRezervacija(!rezervacija)
       
}



    function prosecnaOcena(ocene){
        if (!Array.isArray(ocene) || ocene.length === 0) {
            return 0; 
          }
          const sum = ocene.reduce((acc, cur) => acc + cur, 0);

          return sum / ocene.length;

    }


    return(<>
   
        
   
    <TableRow>
        <TableCell>
            {
            
            izmena

            ?
            <TextField value={modelVozila} onChange={e=>{
                setmodelVozila(e.target.value)

            }} />
            
            :

            modelVozila
            
            }
        </TableCell>
        <TableCell>
            {
                izmena 

                ?
                <TextField  type="number" value={godiste} inputProps={{ min: 1900, max: new Date().getFullYear() }} onChange={e=>{
                    setGodiste(e.target.value)
                

                }} /> 
                
                :

            godiste
            
            }
        </TableCell>
        <TableCell>
            {
            izmena

            ?

            <TextField type="number" value={cena} style={{width:"80px"}} onChange={e=>{
                if(e.target.value>=0){
                setCena(e.target.value)
                }
                else{
                    setCena(0)
                }
            }} />
            
            :

            cena + " EUR"
            
            }
            </TableCell>
            <TableCell>
                {
                    izmena
                    ?

                    <Select value={klima} onChange={promenaKlime}>
                        <MenuItem value="true">Da</MenuItem>
                        <MenuItem value="false">Ne</MenuItem>
                    </Select>
                    :

                klima?"Da":"Ne"
                
                }
            </TableCell>
            <TableCell>
                {
                    rezervacija?"Da":"Ne"
                }
            </TableCell>
            <TableCell>
                {prosecnaOcena(ocene).toFixed(1)}
            </TableCell>
            <TableCell>
           {rezervacija?

          
            <RezervacijaAuta price={automobil.cena} onRezervacija={rezervisiVozilo} />
        
            :
        
            <VracanjeAuta automobil={automobil} onRezervacija={rezervisiVozilo} onOcena={dodavanjeOcene} />
        
        }
            </TableCell>
           
            <TableCell>{
            !izmena?
            <Button variant="contained" onClick={(e)=>{setIzmena(!izmena)}}>Izmeni</Button>
            :<Button variant="contained" type="submit" onClick={(e)=>{
                e.preventDefault()
                    snimiIzmene(automobil.id,{
                        modelVozila:modelVozila,
                        godiste:godiste,
                        cena:cena,
                        klima:klima,
                        ocene : ocene
                    })
                    setIzmena(!izmena)}}>Snimi</Button>}
                    
                    </TableCell>
            <TableCell>
                <Button
                variant="contained"
                onClick={e=>{
                    obrisiAutomobil(automobil.id)
                }}>Obrisi</Button>
            </TableCell>
        </TableRow>
        </>)
}
export default JedanAutomobil