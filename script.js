$(document).ready(function () {

    //Set variables for the individual 
    const searchBtn = $("#search-button");
    const clearBtn = $("#clear-button");
    let userInput = $("#user-input")
    let cityName = $("#city");
    let temp = $("#temperature");
    let humidity = $("#humidity");
    let wind = $("#wind-speed");
    let uvIndex = $("#UV");
    let todaysDate = $("#date")
    let searchHistory = $("#history")






    function weatherReport() {
        let userCity = userInput.val()

        const apiKey = "a13b176036b4409af8289d9056930795";
        const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                cityName.text(response.name)
                todaysDate.text(Date())
                temp.text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32) + " F")
                humidity.text("Humidity: " + response.main.humidity + " %")
                wind.text("Wind Speed: " + response.wind.speed + " MPH")

                let lat = response.coord.lat
                let lon = response.coord.lon
                const queryUVUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1"
                $.ajax({
                    url: queryUVUrl,
                    method: "GET"
                })
                    .then(function (response) {
                        uvIndex.text("UV Index: " + response[0].value)

                        if (response[0].value > 5) {
                            uvIndex.addClass("bg-danger")
                        }
                        else if (response[0].value < 3) {
                            uvIndex.addClass("bg-success")
                        }
                        else {
                            uvIndex.addClass("bg-warning")
                        }
                    })
            })

        const queryUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey;
          console.log(queryUrl5day)  

          $.ajax({
            url: queryUrl5day,
            method: "GET"
        })
        .then(function (response) {
          console.log(response)


        })  



    }



    $("#search-button").on("click", function (event) {
        weatherReport()



    })



    $("#clear-button").on("click", function (event) {
        console.log("click")
    })


})