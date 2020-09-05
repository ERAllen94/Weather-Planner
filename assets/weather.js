function getCities (City) { 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=fe758ed83fb743d4e0e7e10b51103f1d&units=imperial`)
        .then(function(response){
            return response.json()
        }).then(function(data){
            console.log('data', data);
            const temp = data.list[0].main.temp
            console.log("hello",temp)
            const hum = data.list[0].main.humidity
            console.log
            $("#Temperature").text (`Temperature: ${temp}`)
            $("#Humidity").text (`Humidity: ${hum}`)
            // $("#Wind-Speed").text(`${Wind-Speed}`)
            return data;
        })
}

getCities("honolulu")

let textValue = $('#city-search').val()

$("#search-button").on('click', () => getCities(textValue));