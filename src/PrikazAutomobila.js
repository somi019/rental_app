import JedanAutomobil from "./JedanAutomobil"
import React from "react"
import { useState } from "react"
import './App.css'
import BestRatedCars from "./BestRatedCars"
import { TableContainer,Table,TableBody,TableHead,Paper,TableRow,TableCell,Typography,Input,FormLabel, Button } from "@mui/material"

function PrikazAutomobila(){
    var [Automobili,setAutomobile] = useState([
        {
            id:1,
            modelVozila: "Audi A1",
            godiste: 2002,
            cena: 60,
            klima: true,
            rezervacija: true,
            ocene:[1,2,3,4]
        },
        {
            id:4,
            modelVozila: "Ford Fiesta",
            godiste: 2004,
            cena: 25,
            klima: false,
            rezervacija: true,
            ocene:[4,5,5,5]

        },
        {
            id:2,
            modelVozila: "BMW I3",
            godiste: 2005,
            cena: 200,
            klima: true,
            rezervacija: true,
            ocene:[2,2,1,3]
        },
        {
            id:3,
            modelVozila: "Fiat Punto",
            godiste: 2000,
            cena: 40,
            klima: false,
            rezervacija: true,
            ocene:[5,5,5,5]
        },
       
    ])

    Automobili.sort((a, b) =>{

const nameA = a.modelVozila.toUpperCase(); 
const nameB = b.modelVozila.toUpperCase(); 
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
    })

    var [automobil,setAutomobil] = useState({})

    const obrisiAutomobil=(id)=>{
        Automobili=Automobili.filter(a=>a.id!==id)
        setAutomobile(Automobili)
        handleChangeOcena()
    }

    const snimiIzmene = (id,automobil) =>{
        var index=Automobili.findIndex(a=>a.id==id)
        automobil.id=id
        Automobili[index]=automobil
        setAutomobile(Automobili)
        handleChangeOcena()
    }


const [isChecked,setIsCheked] = useState(false)
    const handleradiochange = (e) =>{
        setIsCheked(e.target.value === 'true')
    }
   

    const snimiAutomobil = (e) =>{
        e.preventDefault()
        var id=1
        if(Automobili.length>0){
            id=Automobili.sort((a,b)=>{return (b.id-a.id)})[0].id+1
        }
        if(e.target[0].value !== '' && e.target[1].value && e.target[2].value ){
        var automobil = {
            id:id,
            modelVozila: e.target[0].value,
            godiste: e.target[1].value,
            cena: e.target[2].value,
            klima: isChecked,
            rezervacija: true,
            ocene : []
        }
        Automobili.push(automobil)
        setAutomobile(Automobili)
        handleChangeOcena()
        e.target[0].value = ''
        e.target[1].value = undefined
        e.target[2].value = undefined
        e.target[3].value = undefined

    }
    }


    const getAverageRating = (ocene) => {
        if(ocene.length>0){
        const sum = ocene.reduce((acc, curr) => acc + curr, 0);
        return sum / ocene.length;
        }
        return 0;
      };
      
      const findTop3RatedCars = () => {
        const carsWithAverageRating = Automobili.map((car) => {
          const averageRating = getAverageRating(car.ocene);
          return { ...car, averageRating };
        });
      
        carsWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
        
        return carsWithAverageRating.slice(0, 3);
      };
      
      const top3RatedCars = findTop3RatedCars()
      var [topCars,setTopCars] = useState([...top3RatedCars]);

      const handleChangeOcena = () =>{            
            let top3 = findTop3RatedCars()  
            setTopCars(top3)      
      }

    return(<>
    <div className="container">
        <div>
    <div className="forma_za_unos">
        <form onSubmit={snimiAutomobil}>
            <Typography variant="h3">Dodaj vozilo</Typography>
            <FormLabel htmlFor="txtModel">Model vozila</FormLabel>
            <br/>

            <Input id ="txtModel" onChange={event=>{
                automobil.modelVozila = event.target.value
            }}/> 
            <br/>

            <FormLabel htmlFor="numGodiste">Godiste vozila</FormLabel>
            <br/>
            
            <Input id="numGodiste" type="number" inputProps={{ min: 1900, max: new Date().getFullYear() }}  onChange={event=>{
                automobil.godiste = parseInt(event.target.value)
            }}/>
            <br/>

            <FormLabel htmlFor="numCena">Cena vozila</FormLabel>
            <br/>
            
            <Input id="numCena" type="number" inputProps={{ min: 0 }}  onChange={event=>{
                automobil.cena = parseInt(event.target.value)
            }}/>

            <br />
            
            <br/>

            <FormLabel>Da li vozilo ima klimu</FormLabel>
            <br/>
            
            <Input type="radio" name="klima_vozila" value='true' checked={isChecked===true}   onChange={handleradiochange}/><label>Da</label>
            <Input type="radio" name="klima_vozila"  value='false' checked={isChecked===false} onChange={handleradiochange}/><label>Ne</label>
            
            <br/>

            <Button type="submit" variant="contained">Snimi</Button>
            <br />
        
        </form>
    </div>

    <BestRatedCars cars = {topCars} />
        
    </div>

        <TableContainer>
      <Table sx={{ width: '70%' }}>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h5">Model Vozila</Typography></TableCell>
            <TableCell><Typography variant="h5">Godiste</Typography></TableCell>
            <TableCell><Typography variant="h5">Cena</Typography></TableCell>
            <TableCell><Typography variant="h5">Klima</Typography></TableCell>
            <TableCell><Typography variant="h5">Dostupnost</Typography></TableCell>
            <TableCell><Typography variant="h5">Ocena</Typography></TableCell>
            <TableCell colSpan="3"><Typography variant="h5">Akcije</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Automobili.map(a=>{
                return(<JedanAutomobil key={a.id} automobil={a} obrisiAutomobil={obrisiAutomobil} snimiIzmene={snimiIzmene} onOcena={handleChangeOcena} />)
            })}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
    <div className="containerBestRated">
    </div>
    </>)
}

export default PrikazAutomobila