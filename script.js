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
    let searchHistoryDisplay = $("#history")
    let searchHistory = []

    searchHistory = JSON.parse(localStorage.getItem("Searched Cities")) || []
    userCity = localStorage.getItem("City");
    if (userCity) {
        weatherReport(userCity)
    }

    searchHistory.forEach(city => {
        console.log(city)

        //button for each city

        var HistoryBtn = $("<button>")
        HistoryBtn.text(city)

        console.log(HistoryBtn)

        //button click run weather report function

        $(HistoryBtn).on("click", function (event) {
            weatherReport(city)


        })

        //append button to history form
        searchHistoryDisplay.append(HistoryBtn)
    });

    function weatherReport(userCity) {

        // add searched city to the search history variable and store it in local storage

        searchHistory.unshift(userCity)
        localStorage.setItem("Searched Cities", JSON.stringify(searchHistory))



        const apiKey = "a13b176036b4409af8289d9056930795";
        const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                cityName.text(response.name)
                localStorage.setItem("City", response.name)

                todaysDate.text(Date())
                localStorage.setItem("Today's Date", Date())

                temp.text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32) + " F")
                localStorage.setItem("Current Temperature", ("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32) + " F"))

                humidity.text("Humidity: " + response.main.humidity + " %")
                localStorage.setItem("Humidity", "Humidity: " + response.main.humidity + " %")

                wind.text("Wind Speed: " + response.wind.speed + " MPH")
                localStorage.setItem("Wind Speed", "Wind Speed " + response.wind.speed + " MPH")

                let lat = response.coord.lat
                let lon = response.coord.lon
                const queryUVUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1"
                $.ajax({
                    url: queryUVUrl,
                    method: "GET"
                })
                    .then(function (response) {
                        uvIndex.text("UV Index: " + response[0].value)
                        localStorage.setItem("UV Index", "UV Index: " + response[0].value)

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

                localStorage.setItem("Icon", queryIconUrl)

            })


        const queryUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl5day,
            method: "GET"
        })


            .then(function (response) {
                console.log(response)
                var temp = ((response.list[0].main.temp - 273.15) * 1.8 + 32);
                var humid = response.list[0].main.humidity
                var date = new Date(response.list[0].dt_txt).toLocaleDateString()
                var icon = response.list[0].weather[0].icon

                asdf("#one", icon, date, temp, humid)
                temp = ((response.list[8].main.temp - 273.15) * 1.8 + 32)
                humid = response.list[8].main.humidity
                date = new Date(response.list[8].dt_txt).toLocaleDateString()
                icon = response.list[8].weather[0].icon

                asdf("#two", icon, date, temp, humid)
                temp = ((response.list[17].main.temp - 273.15) * 1.8 + 32)
                humid = response.list[17].main.humidity
                date = new Date(response.list[17].dt_txt).toLocaleDateString()
                icon = response.list[17].weather[0].icon


                asdf("#three", icon, date, temp, humid)
                temp = ((response.list[26].main.temp - 273.15) * 1.8 + 32)
                humid = response.list[26].main.humidity
                date = new Date(response.list[26].dt_txt).toLocaleDateString()
                icon = response.list[26].weather[0].icon

                asdf("#four", icon, date, temp, humid)
                temp = ((response.list[35].main.temp - 273.15) * 1.8 + 32)
                humid = response.list[35].main.humidity
                date = new Date(response.list[35].dt_txt).toLocaleDateString()
                icon = response.list[35].weather[0].icon

                asdf("#five", icon, date, temp, humid)
                temp = response.list[35].main.temp
                humid = response.list[35].main.humidity
                date = new Date(response.list[35].dt_txt).toLocaleDateString()
                icon = response.list[35].weather[0].icon

            })







        userInput.val("")

    }



    $("#search-button").on("click", function (event) {

        let userCity = userInput.val()
        weatherReport(userCity)


    })



    $("#clear-button").on("click", function (event) {
        console.log("click");
        searchHistoryDisplay.text = "";
        localStorage.clear();
    })




    // function to display 
    function asdf(day, icon, theDate, temperature, humidity) {

        $(day).text("")
        var h1 = $("<p>")
        var img = $("<img>")
        var p1 = $("<p>")
        var p2 = $("<p>")
        img.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
        h1.addClass("font-weight-bold")

        h1.text(theDate)
        p1.text("Temperature: " + temperature + " F")
        p2.text("Humidity: " + humidity + " %")

        $(day).append(h1, p1, p2, img)

    }


})