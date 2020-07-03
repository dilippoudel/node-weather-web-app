const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Defne path for express config
const publicDiretoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// set up handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDiretoryPath))

app.get('',(req,res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Dilip'
    })
})
app.get('/about',(req,res)=> {
    res.render('about', {
        title: 'About',
        name: 'Dilip'
    })
})
app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Help Page',
        name: 'Dilip'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {lat, lon, location} = {})=> {
        if(error){
           return res.send({error})
        }
        forecast(lat, lon, (error, forecastData) => {
            if(error) return res.send({error})
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*',(req,res)=> {
    res.render('pageNotFound',{
        title: '404',
        errorMessage: 'Help article not found'
    })
})
app.get('*',(req, res)=>{
    res.render('pageNotFound',{
        title: '404',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000...')
})