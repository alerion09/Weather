document.addEventListener("DOMContentLoaded", appStart)
//FUNKCJA STARTOWA ................................................................................
function appStart()
{   
    const myApiKey = config.MY_KEY;
    const weatherApi =
        {
            key: myApiKey,
            url: "https://api.openweathermap.org/data/2.5/"
        }
    const inputCity = document.querySelector(".input-city");
    inputCity.addEventListener('keypress', runQuery);
    function runQuery(event)
    {
        if (event.keyCode === 13)
        {
            getResults(inputCity.value);
        }
    }
    function getResults(text)
    {
        fetch(weatherApi.url+"weather?q="+text+"&units=metric&APPID="+weatherApi.key)
        .then(data =>
            {
                return data.json();
            }).then(displayResults);
    }
    function displayResults(data)
    {
        console.log(data);
        const city = document.querySelector(".city");
        const temperature = document.querySelector(".temperature");
        const state = document.querySelector(".state");
        const range = document.querySelector(".range");
        city.innerText = data.name+", "+data.sys.country;
        temperature.innerText = Math.round(data.main.temp) + "\u00B0"+"C";
        state.innerText = data.weather[0].main;
        range.innerText = Math.round(data.main.temp_min) + "\u00B0"+"C / " + Math.round(data.main.temp_max) + "\u00B0"+"C";
       
        const date = document.querySelector(".date");
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth()+1;
        let year = currentDate.getUTCFullYear();

        if (day < 10)
        {
            date.innerText = "0" + day + "/" + month + "/" + year;
        }else
        {
            date.innerText = day + "/" + month + "/" + year;
        }
    }
}


