// Allows for DOM access - variables declared with 'let' allows for block scope (can be accessed outside of block).

window.addEventListener("load", () => {
    let lon;
    let lat;

    // Declaring variables for DOM classes.

    let cityName = document.querySelector(".city-name");
    let degreeSection = document.querySelector(".temperature");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSpan = document.querySelector(".temperature span");
    let temperatureDescription = document.querySelector(".temperature-description");

    // Used to ask user permision for location access.

    if(navigator.geolocation) {

        // Gives access to users current location.

        navigator.geolocation.getCurrentPosition(position => {

            // Variables assigned value from the Geolocation API - returns the users lattitude and longitude.

            lon = position.coords.longitude;
            lat = position.coords.latitude;
           
            /* 
            
            The 'api' variable is set to 'const' to allow the variable to be used with block scope properties, 
            but remain strongly-typed (unchangable).

            The API is from Open Weather Map. 
            
            */
           
            const api = 'https://api.openweathermap.org/data/2.5/weather?zip=27616,us&units=metric&appid=304e06fc96fd015ae8beec97315f12e2';

        
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

                const { temp } = data.main;
                const { name } = data;
                const { description } = data.weather[0];
                
                
                // Setting/Appending DOM HTML elements to API parameters to display retrieved data in the DOM

                temperatureDegree.textContent = temp;
                cityName.textContent = name;
                temperatureDescription.textContent = description;

                
                // Formula for Fahrenheit.

                const fahrenheit = (temp * 9/5 + 32)

                // To change temperature from Celsius to Fahrenheit by mouse click.

                degreeSection.addEventListener("click", () => {
                    
                    if(temperatureSpan.textContent === "°C") {

                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(fahrenheit);

                    }else{

                        temperatureSpan.textContent = "°C"
                        temperatureDegree.textContent = temp;
                        
                    }  
                });
           });
        } 
    )}; 
})

