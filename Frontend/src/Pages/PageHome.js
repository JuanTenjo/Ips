import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/img-01.jpg";
import img2 from "../assets/img-02.jpg";
import img3 from "../assets/img-03.jpg";
import {
    Grid,
    TextField,
    makeStyles,
    Button,
    InputLabel,
    FormControl,
    Select,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Link
  } from "@material-ui/core";

const PageHome = () => {

    return (
        
       
        <Grid container >
            <Grid item spacing={2}  xs={12} sm={12} md={6}>
                <div class="carousel-wrapper"  style={{transform: 'translate(40%, 20%)'}}>
                    <Carousel infiniteLoop useKeyboardArrows autoPlay>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                        <div>
                            <img src={img3} />
                        </div>
                    </Carousel>   
                </div>
            </Grid> 
        </Grid>
        
     );
}
 
export default PageHome;