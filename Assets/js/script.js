var cityInfo = $('#search-cities').val()
var cityNames = JSON.parse(localStorage.getItem('data')) || []
var apiKey = '58139323dd364a950f686c4f302aab39'

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