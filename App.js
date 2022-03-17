// weather API

let weather = {
  fetchWeather: function (city) {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=f7218eb0888d13cec2fdb1c5693b9dbb'
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/h';
    document.querySelector('.country').innerText = country;
    document.querySelector('.weather').classList.remove('.loading');

    //background images
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/1200x600/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

weather.fetchWeather('Warsaw');

//Advice API

fetch('https://api.adviceslip.com/advice')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response error');
    }
  })
  .then((data) => {
    displayAdvice(data);
  })
  .catch((error) => console.error('fetch error:', error));

function displayAdvice(data) {
  const { id, advice } = data.slip;
  document.querySelector('.advice').innerText = 'Advice #' + id + ': ' + advice;
}
