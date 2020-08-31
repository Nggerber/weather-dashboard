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

                let iconCode = response.weather[0].icon
                const queryIconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                $("#weather-icon").attr("src", queryIconUrl)

            })


        const queryUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl5day,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
                var temp = response.list[0].main.temp
                var humid = response.list[0].main.humidity
                var date = new Date(response.list[0].dt_txt).toLocaleDateString()
                var icon = response.list[0].weather[0].icon
                asdf("#one", icon, date, temp, humid)
                temp = response.list[8].main.temp
                humid = response.list[8].main.humidity
                date = new Date(response.list[8].dt_txt).toLocaleDateString()
                icon = response.list[8].weather[0].icon
                asdf("#two", icon, date, temp, humid)
                



            })



    }



    $("#search-button").on("click", function (event) {
        weatherReport()
        // asdf("#one", "https://cdn2.apstatic.com/photos/climb/109280084_sqsmall_1494345229_topo.jpg", "dhbdh", "100", "25")
        // asdf("#two", "https://cdn2.apstatic.com/photos/climb/108294767_smallMed_1494274510.jpg", "ublivyvyv", "75", "15")



    })



    $("#clear-button").on("click", function (event) {
        console.log("click")
    })

    function asdf(day, icon, theDate, temperature, humidity) {
        $(day).text("")
        var h1 = $("<h1>")
        var img = $("<img>")
        var p1 = $("<p>")
        var p2 = $("<p>")
        img.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
        h1.text(theDate)
        p1.text(temperature)
        p2.text(humidity)





        $(day).append(h1, p1, p2, img)
        

    }


})