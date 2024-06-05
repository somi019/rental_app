import React from "react"
import {Card,CardActionArea,Typography,CardContent} from "@mui/material"
import Box from '@mui/material/Box';



function BestRatedCars({cars}){

    return(

    <>

<Typography
    variant="h6"
    display="block"
    >Top 3 automobila:</Typography>

      <Box            
      width={500}
      my={4}
      display="flex"
      alignItems="stretch"
      marginLeft="auto"
      marginRight="auto"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
  

        
        {cars.map((car) => (
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {car.modelVozila}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {car.cena} EUR
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>
          ))}
    </Box>

    </>
    )

}

export default BestRatedCars