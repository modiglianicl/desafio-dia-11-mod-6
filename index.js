import axios from 'axios';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';
import moment from 'moment';
import _ from 'lodash';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/',async (req,res) => {
    // Fecth con axios
    const response = await axios.get('https://randomuser.me/api/?results=50');
    const objectData = response.data;
    const dateRegistered = moment()
    let userData = objectData.results;
    // Asignamos ID y Fecha registro para los usuarios
    for (let i = 0; i < userData.length;i++) {
        userData[i]['idUsuario'] = uuidv4().slice(0,6);
        userData[i]['fechaRegistro'] = dateRegistered.format('YYYY-MM-DD');
    }
    // Dividimos en dos elementos que son listados de hombres y mujeres
    res.json(_.partition(userData,(n) => n.gender == 'male'))
    // Imprimimos con colores
    let [hombres,mujeres] = _.partition(userData, (n) => n.gender == 'male'); // Cree una lista para ambos, ya que se hace mas entendible el logeo
    // Imprimiendo hombres
    for(let i = 0; i< hombres.length; i++) {
        console.log(chalk.white.bgWhite(JSON.stringify(hombres[i])))
    }
    // Imprimiendo mujeres
    for(let i = 0; i< mujeres.length; i++) {
        console.log(chalk.white.bgWhite(JSON.stringify(mujeres[i])))
    }
    
})



app.listen(PORT,()=> {
    console.log(`Server UP on : http://localhost:${PORT}`)
})