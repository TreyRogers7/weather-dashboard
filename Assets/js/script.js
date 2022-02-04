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



// search history storage, keeping previous searches in local storage and on
function storeHistory(event) {
    event.preventDefault()
    var history = $(this).children('input').val()
    cityNames.push(history)
    localStorage.setItem('data', JSON.stringify(cityNames))
    buttonRendor()
}

function buttonRendor() {
    $('#searchHistory').empty()
    cityNames.forEach(function (city) {
        var btnEl = $('<button>')
        btnEl.text(city)
        $('#searchHistory').append(btnEl)
        console.log(btnEl)
    })
}


buttonRendor()

$('#searchForm').submit(storeHistory)