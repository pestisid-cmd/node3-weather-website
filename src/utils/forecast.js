const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/484dcf7d28ebbaf8f7345a0a7ce3c443/' + longitude + ',' + latitude + '?units=si'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather service',undefined)
        }

        else if(body.error){
            callback('Unable to find location',undefined)
        }

        else{
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
               
        }

    }
    )
    
}

  
module.exports = forecast