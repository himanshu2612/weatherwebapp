const express=require('express')
const path=require('path')

const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
// define paths for Express config
const viewPath=path.join(__dirname,'../templates/views')
const pubPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')


// setup handlebars engines and views location
hbs.registerPartials(partialsPath)
app.use(express.static(pubPath))
app.use(express.static(path.join(__dirname, 'css')))
app.set("views", viewPath)
app.set('view engine','hbs')



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Himanshu Chauhan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,data={})=>{
        if(error){
            return res.send({error})
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help!',
        name: 'Himanshu Chauhan'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Himanshu Chauhan',
        title: 'About Me'
    })
})

app.get('/help*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Help page not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Page not found!'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})