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
        if (event.keyCode == 13)
        {
            getResults(inputCity.value);
            console.log(inputCity.value);
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
        let city = document.querySelector(".city");
        city.innerText = data.name+", "+data.sys.country;
        let temperature = document.querySelector(".temperature");
        temperature.innerText = Math.round(data.main.temp) + "\u00B0"+"C";
        let state = document.querySelector(".state");
        state.innerText = data.weather[0].main;
        let range = document.querySelector(".range");
        range.innerText = Math.round(data.main.temp_min) + "\u00B0"+"C / " + Math.round(data.main.temp_max) + "\u00B0"+"C";
       
        let date = document.querySelector(".date");
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getUTCFullYear();

        date.innerText = day + "/" + month + "/" + year;
    }
}


