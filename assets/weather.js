function getTextValue() {
    return $('#city-search').val();
};

function getCities(City) {
    let citiesList = JSON.parse(localStorage.getItem('savedCities'));
    if (!citiesList) {
        citiesList = [];
    }
    citiesList.push(City);
    localStorage.setItem('savedCities', JSON.stringify(citiesList));
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=fe758ed83fb743d4e0e7e10b51103f1d&units=imperial`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            const temp = data.list[0].main.temp
            const hum = data.list[0].main.humidity
            const ws = data.list[0].wind.speed
            const lat = data.city.coord.lat
            const lon = data.city.coord.lon
            const incode = data.list[0].weather[0].icon
            const currentDay = moment().startOf('day')
            $('#currentDay').text(currentDay.format('MMM Do YYYY'));
            const iconurl = `http://openweathermap.org/img/w/${incode}.png`;
            $('#wicon').attr('src', iconurl);


            $("#Temperature").text(`Temperature: ${temp}`)
            $("#Humidity").text(`Humidity: ${hum}`)
            $("#Wind-Speed").text(`Wind-Speed: ${ws}`)

            $("#Temp").text(`Temperature: ${temp}`)
            for (let index = 1; index < 6; index++) {
                const newtemp= data.list[index*8].main.temp
                const newhum= data.list[index*8].main.humidity
                const newicon=data.list[inex*8].weather[0].icon
            getFiveDayCards (index,newtemp,newhum,newicon)
            
            }
            fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=fe758ed83fb743d4e0e7e10b51103f1d&lat=${lat}&lon=${lon}`)
                .then(function (response) {
                    return response.json()
                }).then(function (data) {
                    console.log('data', data);
                    $('#uv').text(`UV Index ${data.value}`)
                });
        })

}

function getFiveDayCards(index,newtemp,newhum,newicon) {
    $(`#new-temp-${index}`)
    $(`#new-hum-${index}`)
    $(`#new-icon-${index}`)
    const iconurl = `http://openweathermap.org/img/w/${newicon}.png`;
    $('#wicon').attr('src', iconurl);

    const currentDay = moment().startOf('day')

        
        
    }
}

function appendCities(city) {
    $("#search").append(`<p class="searchedCity" value="${city}">${city}</p>`);
}
function loadPage() {
    let citiesList = JSON.parse(localStorage.getItem('savedCities'));
    for (let index = 0; index < citiesList.length; index++) {
        appendCities(citiesList[index])
    }
    getCities(citiesList[0] || 'New York');
}
loadPage()

$("#search-button").on('click', () => getCities(getTextValue()));

function handleMenuClick(e) {
    const targetVal = $(e.target).attr("value");
    getCities(targetVal);
    console.log('tv', targetVal);
}

$('.searchedCity').on('click', handleMenuClick)




