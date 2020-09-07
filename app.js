// Allows for DOM access - variables declared with 'let' allows for block scope (can be accessed outside of block).

window.addEventListener("load", () => {
    let long;
    let lat;

    // Declaring variables for DOM classes.

    const cityName = document.querySelector(".city-name");
    const degreeSection = document.querySelector(".temperature");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const temperatureSpan = document.querySelector(".temperature span");
    const temperatureDescription = document.querySelector(".temperature-description");

    // Used to ask user permision for location access.

    if(navigator.geolocation) {

        // Gives access to users current location.

        navigator.geolocation.getCurrentPosition(position => {

            // Variables assigned value from the Geolocation API - returns the users lattitude and longitude.

            long = position.coords.longitude;
            lat = position.coords.latitude;
           
            /* 
            
            The 'api' variable is set to 'const' to allow the variable to be used with block scope properties, 
            but remain strongly-typed (unchangable).
           
            The Weatherstack API uses {fetch:ip} parameter to display the current weather for the users location.
            
            */
           
            const api = 'https://api.weatherstack.com/current?access_key=7020f37602440165ea716e8ef1272ccf&query=fetch:ip';
            
            // The 'fetch' function with the 'api' variable passed to retrieve data in json format.

            fetch(api)
                .then(response => {
                return response.json();

                })

                /* 
                   Here, the data is logged to the browser console from the API. This is used to ensure it works, 
                   and to retrieve parameter data. 
                */
               
                .then(data => {
                console.log(data);
                
                // Declaring API parameter variables with API data point type. The shorthand syntax reduces from 'data.current'.

                const { temperature, weather_descriptions } = data.current;
                const { name, region } = data.location;
                
                // Setting/Appending DOM HTML elements to API parameters to display retrieved data in the DOM

                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = weather_descriptions;
                cityName.textContent = name;
                
                // Formula for Fahrenheit.

                const fahrenheit = (temperature * 9/5 + 32)

                // To change temperature from Celsius to Fahrenheit by mouse click.

                degreeSection.addEventListener("click", () => {
                    
                    if(temperatureSpan.textContent === "°C") {

                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(fahrenheit);

                    }else{

                        temperatureSpan.textContent = "°C"
                        temperatureDegree.textContent = temperature;
                        
                    }  
                });
           });
        } 
    )}; 
})
