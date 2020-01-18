const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/0bff7e648ad1acc2cff31ad4ec867888/'+longitude+','+latitude+'?units=si'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to find Network',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. There is a '+ response.body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports=forecast
