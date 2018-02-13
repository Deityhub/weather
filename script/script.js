$(document).ready(function(){
    
    var showlat;
    var showlon;
    
    function updateWeather(){
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(locateMe, getError);
        }else{
            alert("Try another browser, this one is not supported");
        }
    
        function locateMe(position) {
            showlat = position.coords.latitude;
            showlon = position.coords.longitude;
        
            $.get('https://fcc-weather-api.glitch.me/api/current?lat=' + showlat + '&lon=' + showlon, function(data){
                var obj = data;
                
                $.get('https://api.apixu.com/v1/current.json?key=8fe2b5e3add74f8691d195002171108&q=' + obj["name"], function(show){
                  var showIn = show;
                    
                    $('#celsius').off('click').on('click', function(){
                        $('#showTemp').html(showIn["current"]["temp_c"] + "°C");
                    });
        
                    $('#fahrenheit').off('click').on('click', function(){
                        $('#showTemp').html(showIn["current"]["temp_f"] + "F");
                    });
                    
                    $('#heading').html("<h1>" + "Forcast for " + showIn["location"]["name"] + ", " + showIn["location"]["region"] + ", " + showIn["location"]["country"] + "</h1>");
                    $('#showTemp').html(showIn["current"]["temp_c"] + "°C");
                    $('#showIcon').html("<p>" + "<img src=" + "\"https://" + showIn["current"]["condition"]["icon"] + "\"" + " >" + "</p>");
                    $('#showDes').html(showIn["current"]["condition"]["text"]);
                    $('#updateTime').text(showIn["current"]["last_updated"]);
            });
                
            }); 
        
        };
        
        $('#click').off('click').on('click', searchNew);
        
        function searchNew(){
            var input = $('input:text').val();
            
            $.get('https://api.apixu.com/v1/current.json?key=8fe2b5e3add74f8691d195002171108&q=' + input, function(show){
                  var showIn = show;
                $('#heading').html("<h1>" + "Forcast for " + showIn["location"]["name"] + ", " + showIn["location"]["region"] + ", " + showIn["location"]["country"] + "</h1>");
                $('#showTemp').html(showIn["current"]["temp_c"] + "°C");
                $('#showIcon').html("<p>" + "<img src=" + "\"https://" + showIn["current"]["condition"]["icon"] + "\"" + " >" + "</p>");
                $('#showDes').html(showIn["current"]["condition"]["text"]);
                $('#updateTime').text(showIn["current"]["last_updated"]);
            });
        }
    
        function getError(error) {
            console.log('Error occurred. Error code: ' + error.code);
            /* error.code can be:
                0: unknown error
                1: permission denied
                2: position unavailable (error response from location provider)
                3: timed out*/
        };    
    }
    updateWeather();
});