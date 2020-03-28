const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')


const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directiory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Siddhartha Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Siddhartha Jain'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is a help page',
        title: 'Help page',
        name:'Siddhartha Jain'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send('error')
    }

    geocode(req.query.address , (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        
        })
    
    })

   
    
})

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         res.send({
//             error: 'You must provide search query'
//         })
//     }

//     else{
//         console.log(req.query.search)
//         res.send({
//             product:req.query.search
//         })

//     }

// })

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name: 'Siddhartha Jain'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Siddhartha Jain'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)

})

