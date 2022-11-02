class Forecast {
    constructor(){
        this.key = "uwQJO1cOuIWvRGSKL5cmdGRz8scdcx0Z";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI =  "http://dataservice.accuweather.com/locations/v1/cities/search";
    }

    async updateCity (city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
 
        return {
         cityDetails,
         weather,
        }
    }

    async getCity (city){
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return(data[0]);
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }


}


//get weather information


// new Forecast.getWeather("4607");




//get city information

// getCity("lagos").then(data => {
//     return getWeather(data.Key);
// }).then(data => console.log(data)).catch(err => console.log(err));