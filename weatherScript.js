API_key = ""
var city_name

const succesfullLookup = (position => {
  const { latitude, longitude} = position.coords
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=`)
    .then(response => response.json())
    .then(json => {
      try {
        city_name = json.results[0].components.city_district
      } catch (error) {
        console.log(error)
        city_name = json.results[0].components.county
      }
      
      document.querySelector('#city').innerHTML = city_name
      console.log(json)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_key}`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        var temp = json.main.temp
        document.getElementById("temp").innerHTML = "Temperature: " + Math.round(temp) + "°C"

        var feelsLike= json.main.feels_like
        document.getElementById("feels-like").innerHTML = "Feels like: " + Math.round(feelsLike) + "°C"

        var wind = json.wind.speed * 3.6
        document.getElementById("wind").innerHTML = "Wind Speed: " + Math.round(wind) + "km/h"

        
        var weather = json.weather[0].description
        document.getElementById("state").innerHTML = "Weather: " + weather
        console.log(weather)

        var icon = json.weather[0].icon
        console.log(icon)
        document.getElementById("icon-weather").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        
      })
      .catch((err) => {
        console.log(err)
      })
    })
})



navigator.geolocation.getCurrentPosition(succesfullLookup, console.log)



