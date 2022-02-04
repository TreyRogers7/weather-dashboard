var cityInfo = $('#search-cities').val()
var cityNames = JSON.parse(localStorage.getItem('data')) || []
var apiKey = '58139323dd364a950f686c4f302aab39'

//Format Day
function formatDay(date){
    const date = new Date();
    const month = date.getMonth()++;
    const day = date.getDate();

    const dateOutPut = date.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;
    return dateOutput;
}

Init();

function init(){
    //Get stored cities and parse json string to an object
    const stagedCities = json.parse(localStorage.getItem('cities'));
    if(stagedCities !== null){
        cities = stagedCities
    } 
    renderCities()
}

function stageCities(){
    localStorage.setItem('cities', json.stringify(cities))
}

function rednerCities(){
    cityList.empty()

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        
        const li = $('<li>').text(city)
        li.attr('id', 'listC')
        li.attr('data-city', city)
        li.attr('class', 'list-group-item')

        cityList.prepend(li)
    }
    if(!city){
        return
    } else {
        weatherResponse(city)
    }
}

$('#add-city').on('click', (event)=>{event.preventdefault()

const city = $('city-input').val().trim()

if(city===''){
    return
}
cities.push(city)

renderCities()
stageCities()
});

//get weather response

function weatherResponse(name){
    const query = "https://api.openweathermap.org/data/2.5/weather?q=" +name+ "&appid=" + apiKey;

    $('#today-weather').empty()
    $.ajax({
        url: query,
        method: 'GET'
    })
    .then(function(){
        title = $('<h3>').text(response.name+''+formatDay())
        $('#today-weather').append(cityTitle)

        const tempToNum = parseInt((response.main.temp)*9/5-459)

        const cityTemp = $('<p>').text('Temperature:'+ tempToNum + 'f')
        $('today-weather').append(cityTemp)

        const humidity = $('<p>').text('Humidity:'+ response.main.humidity + '%')
        $('today-weather').append(humidity)

        const windSpeed = $('<p>').text('Wind Speed:' + response.wind.speed + 'mph')
        $('today-weather').append(windSpeed)

        const long = response.coord.lon
        const lat = response.coord.lat

        const queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + lat +"&lon=" + long

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        
        .then(function(resUV){
            const UV = $('<span>').text(resUV.value)
            const UVp = $('<p>').text("UVIndex:")

            UVp.append(UV)

            $('today-weather').append(UVp)

            if(resUV.value > 0 && resUV.value <=2){
                UV.attr('class', 'green')
            }else if (resUV.value > 2 && resUV.value <= 5){
                UV.attr("class","yellow")
            }
            else if (resUV.value >5 && resUV.value <= 7){
                UV.attr("class","orange")
            }
            else if (resUV.value >7 && resUV.value <= 10){
                UV.attr("class","red")
            }
            else{
                UV.attr("class","purple")
            }
        });


    })
}

