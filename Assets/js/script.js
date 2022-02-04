var cityInfo = $('#search-cities')
var cities = []
var apiKey = '58139323dd364a950f686c4f302aab39'

//Format Day
function formatDay(date){
    var date = new Date();
    var month = date.getMonth()++;
    var day = date.getDate();

    var dateOut = date.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;
    return dateOut;
}

init();

function init(){
    //Get stored cities and parse json string to an object
    var stagedCities = JSON.parse(localStorage.getItem('cities'));
    if(stagedCities !== null){
        cities = stagedCities
    } 
    renderCities()
}

function stageCities(){
    localStorage.setItem('cities', json.stringify(cities))
}

cityInfo.empty();
function renderCities(){

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        
        var li = $('<li>').text(city)
        li.attr('id', 'listC')
        li.attr('data-city', city)
        li.attr('class', 'list-group-item')

        cityInfo.prepend(li)
    }
    if(!city){
        return
    } else {
        weatherResponse(city)
    }
}

$('#add-city').on('click', (event)=>{event.preventdefault()

var city = $('city-input').val().trim()

if(city===''){
    return
}
cities.push(city)

renderCities()
stageCities()
});

//get weather response

function weatherResponse(name){
    var query = "https://api.openweathermap.org/data/2.5/weather?q=" +name+ "&appid=" + apiKey;

    $('#today-weather').empty()
    $.ajax({
        url: query,
        method: 'GET'
    })
    .then(function(){
        title = $('<h3>').text(response.name+''+formatDay())
        $('#today-weather').append(cityTitle)

        var tempToNum = parseInt((response.main.temp)*9/5-459)

        var cityTemp = $('<p>').text('Temperature:'+ tempToNum + 'f')
        $('today-weather').append(cityTemp)

        var humidity = $('<p>').text('Humidity:'+ response.main.humidity + '%')
        $('today-weather').append(humidity)

        var windSpeed = $('<p>').text('Wind Speed:' + response.wind.speed + 'mph')
        $('today-weather').append(windSpeed)

        var long = response.coord.lon
        var lat = response.coord.lat

        var query2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+ "&lat=" + lat +"&lon=" + long

        $.ajax({
            url: query2,
            method: 'GET'
        })
        
        .then(function(resUV){
            var UV = $('<span>').text(resUV.value)
            var UVp = $('<p>').text("UVIndex:")

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

        var query3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=" + apiKey;
        $.ajax({
            url: queryURL3,
            method: "GET"
        })

        .then(function(res5day){
            $('#5Forecast').empty()

            for (var i = 0, j = 0; j < 5; i=i+6) {
                var read = res5day.list[i].dt;

                if(res5day.list[i].dt != res5day.list[i+1].dt){
                    var div = $('<div>')
                    div.attr('class','col-3 m-2 bg-primary')

                    var d = new Date(0)
                    d.setUTCSeconds(read)

                    var date = d
                    var month = date.getMonth()++
                    var day = date.getDate()
                    var dayOutPut = date.getFullYear() + "/" + (month<10 ? '0' : '') + month + '/' +
                    (day<10 ? '0' : '') + day

                    var h6 = $('<h6>').text('dayOutPut')

                    var image = $('<img>')
                    var sky = res5day.list[i].weather[0].main
                    if(sky==="Clouds"){
                        image.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if(sky==="Clear"){
                        image.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    }else if(sky==="Rain"){
                        image.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                    var pTempK = res5day.list[i].main.temp
                    var tempToNum = parseInt((pTempK)*9/5-459)
                    var pTemp = $('<p>').text('Temperature:'+ tempToNum + 'F')
                    var pHumidity = $('<p>').text('Humidity:' + res5day.list[i].main.humidity + '%')
                    div.append(h6)
                    div.append(image)
                    div.append(pTemp)
                    div.append(pHumidity)
                    $('#5Forecast').append(div)
                    j++
                }
                
            }
        })
    })
}

$(document).on('click', '#listC', function(){
    var thisCity = $(this).attr('data-city')
    weatherResponse(thisCity)
})