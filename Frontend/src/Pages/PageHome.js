import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../assets/img-01.jpg";
import img2 from "../assets/img-02.jpg";
import img3 from "../assets/img-03.jpg";
import audiologia from "../assets/audiologia.jpg";
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
    Radio,   createStyles,
    Link,Paper
  } from "@material-ui/core";
  const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    root: {
      flexGrow: 1,
    },
  }),
);
const PageHome = () => {
    const classes = useStyles();
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
            <Grid container justifyContent="center" spacing={1}>
                <hr
                    style={{
                        color: 'blue',
                        backgroundColor: 'blue',
                        height:'5%',
                        width:'100%',
                        marginTop:'6%',
                    }}  />
                <Grid item xs={6}>
                    <Paper className={classes.paper}> <img  src={img2}   style={{width: "60%"}} class=""/></Paper>
                </Grid>
                <Grid item  xs={6}>
                   
                    <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-2">Misión</h1>
                    <div class="mbr-section-text mbr-white pb-3 ">
                        <p class="mbr-text mbr-fonts-style display-7">
                            Brindar Atención Integral de Calidad en Salud, que garantice la seguridad del paciente llevando a cabo buenas prácticas en cada uno de los procedimientos realizados;  desde una perspectiva de derechos que responda a las necesidades de los usuarios  generando un impacto en el mejoramiento de su calidad de vida.<br/>
                        </p>
                    </div>
                </Grid>
                <hr
                    style={{
                        color: 'blue',
                        backgroundColor: 'blue',
                        height:'5%',
                        width:'100%',
                        marginTop:'1%',
                    }}  /> 
                <Grid item xs={6}>
                    <h1 class="mbr-section-title mbr-white pb-3 mbr-fonts-style display-2">Visión</h1>
                        <div class="mbr-section-text mbr-white pb-3 ">
                            <p class="mbr-text mbr-fonts-style display-7">
                            Ser reconocida por nuestros usuarios como una IPS que brinda servicios de forma adecuada, oportuna y suficiente a toda la comunidad sin ninguna discriminación; convirtiéndonos en una Institución referente por nuestros modelos de atención.<br/>
                            </p>
                        </div>
                </Grid>
                <Grid item  xs={6}>
                     <Paper className={classes.paper}> <img  src={audiologia}   style={{width: "60%"}} class=""/></Paper>
                </Grid>
                <hr
                    style={{
                        color: 'blue',
                        backgroundColor: 'blue',
                        height:'5%',
                        width:'100%',
                        marginTop:'1%',
                    }}  /> 
            </Grid> 
        </Grid>
        
     );
}
 
export default PageHome;