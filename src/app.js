class Weather {
    constructor(props) {
        this.selectCity = props.selectCity;
        this.showWeatherBtn = props.showWeatherBtn;
        this.city = props.city;
        this.temp = props.temp;
        this.pressure = props.pressure;
        this.desc = props.desc;
        this.humidity = props.humidity;
        this.speed = props.speed;
        this.deg = props.deg;
        this.icon = props.icon;
    }

    init() {
        this.getResponse();
    }

    chooseCity() {
        this.selectCity.addEventListener("change", () => {
            this.selectedCity = this.selectCity.value;
            if (this.selectedCity === "") {
                this.showWeatherBtn.setAttribute("disabled", "disabled");
            } else {
                this.showWeatherBtn.removeAttribute("disabled")
            }
        })
    }

    getResponse() {
        this.chooseCity();
        this.showWeatherBtn.addEventListener('click', () => {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.showWeatherData(data);
                })
        })
    }

    showWeatherData(data) {
        this.city.innerText = "City name: " + data.name;
        this.temp.innerText = "Temperature: " + data.main.temp + " ℃";
        this.pressure.innerText = "Pressure: " + data.main.pressure + " hPa";
        this.desc.innerText = "Description: " + data.weather[0].description;
        this.humidity.innerText = "Humidity: " + data.main.humidity + "%";
        this.speed.innerText = "Wind: " + data.wind.speed + "km/h SSE";
        this.deg.innerText = "Wind degree: " + data.wind.deg + "*";
        this.icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    }
}

const weather = new Weather({
    selectCity: document.querySelector(".js--city_selector"),
    showWeatherBtn: document.querySelector(".js--makeRequest"),
    city: document.querySelector(".city"),
    temp: document.querySelector(".temp"),
    pressure: document.querySelector(".pressure"),
    desc: document.querySelector(".description"),
    humidity: document.querySelector(".humidity"),
    speed: document.querySelector(".speed"),
    deg: document.querySelector(".degree"),
    icon: document.querySelector(".icon"),
})
weather.init();