let listedCities = [];

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
            console.log('data', data);
            const temp = data.list[0].main.temp
            const hum = data.list[0].main.humidity
            const ws = data.list[0].wind.speed
            const lat = data.city.coord.lat
            const lon = data.city.coord.lon
            const incode = data.list[0].weather[0].icon
            const currentDay = moment().startOf('day')
            $('#currentCity').text(City)
            $('#currentDay').text(currentDay.format('MMM Do YYYY'));
            const iconurl = `http://openweathermap.org/img/w/${incode}.png`;
            $('#wicon').attr('src', iconurl);


            $("#Temperature").text(`Temperature: ${temp}F`)
            $("#Humidity").text(`Humidity: ${hum}%`)
            $("#Wind-Speed").text(`Wind-Speed: ${ws} MPH`)

            $("#Temp").text(`Temperature: ${temp}`)
            for (let index = 0; index < 5; index++) {
                const newIndex = index * 8;
                const newtemp = data.list[newIndex].main.temp
                const newhum = data.list[newIndex].main.humidity
                const newicon = data.list[newIndex].weather[0].icon
                getFiveDayCards(index, newtemp, newhum, newicon)

            }
            fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=fe758ed83fb743d4e0e7e10b51103f1d&lat=${lat}&lon=${lon}`)
                .then(function (response) {
                    return response.json()
                }).then(function (data) {
                    console.log('data', data);
                    $('#uv').text(`${data.value}`)
                    if (data.value <=2) {
                        $('#uv').addClass('bg-success');
                    }
                    else if (data.value <=5) {
                        $('#uv').addClass('bg-warning');
                    }    

                    else if (data.value <=7) {
                        $('#uv').addClass('bg-secondary');
                    }
                    else if (data.value <=10) {
                        $('#uv').addClass('bg-danger');
                    }
                    

                    if (!listedCities.includes(City)) {
                        listedCities.push(City);
                        appendCities(City)
                    }
                });
        })

}

function getFiveDayCards(index, newtemp, newhum, newicon) {
    $(`#new-temp-${index}`).text(`Temp: ${newtemp}F`)
    const iconurl = `http://openweathermap.org/img/w/${newicon}.png`;
    $(`#new-icon-${index}`).attr('src', iconurl);
    $(`#new-humidity-${index}`).text(`Humidity: ${newhum}%`)

    const currentDay = moment().startOf('day').add(1 + index, 'days').format('MMM Do YYYY');
    $(`#new-date-${index}`).text(currentDay);



}


function appendCities(city) {
    $("#search").append(`<div class= card <p class="searchedCity" value="${city}">${city}</p>`);
}
function loadPage() {
    let citiesList = JSON.parse(localStorage.getItem('savedCities'));
    if (citiesList && citiesList.length > 0) {
        for (let index = 0; index < citiesList.length; index++) {
            console.log('listedCities', listedCities, listedCities.includes());
            if (!listedCities.includes(citiesList[index])) {
                listedCities.push(citiesList[index]);
                appendCities(citiesList[index])
            }
        }
        getCities(citiesList[0]);
    } else { getCities() }
}
loadPage()

function savedCities() {
   
}

$("#search-button").on('click', () => getCities(getTextValue()));

function handleMenuClick(e) {
    const targetVal = $(e.target).attr("value");
    getCities(targetVal);
}

$('.searchedCity').on('click', handleMenuClick)




