const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { registerPartial } = require('hbs')

//paths for geocode and weather modules
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebard engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vishnuprasad C',

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vishnuprasad C',

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: ' oops this isnt helpful at all',
        title: 'Help',
        name: 'Vishnuprasad C',

    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search code'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_not_found', {
        notFound: "Help page not found",
        name: 'Vishnuprasad C',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404_not_found', {
        title: '404',
        notFound: "Error 404, page not found",
        name: 'Vishnuprasad C'
    })
})

app.listen(port, () => {
    console.log('server up @ port '+port)
})