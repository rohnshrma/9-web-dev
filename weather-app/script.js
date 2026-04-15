var cityInput = document.querySelector("#city");
var form = document.querySelector("form");
var card = document.querySelector(".weather-card");

const API_KEY = "3ed1a8944ae36bde087adc8f67d0f04a";

function removeOldResult() {
  const old = document.querySelector(".result-panel");
  if (old) old.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    alert("Enter city name");
    return;
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    if (data) {
      console.log(data);
      removeOldResult();
      createWeatherUI(data);
      input.value = "";
    }
  } catch (err) {
    alert("City Not Found");
  }
}

const createWeatherUI = (data) => {
  // main panel
  const panel = document.createElement("section");
  panel.classList.add("result-panel");

  // top
  const top = document.createElement("div");
  top.classList.add("result-top");

  const label = document.createElement("p");
  label.classList.add("result-label");
  label.innerText = "Current Weather";

  const cityName = document.createElement("h2");
  cityName.textContent = data.name;

  top.append(label, cityName);

  // Temperature Block

  const tempBlock = document.createElement("div");
  tempBlock.classList.add("temperature-block");

  const temp = document.createElement("span");
  temp.classList.add("temp-value");
  temp.textContent = `${Math.round(data.main.temp)}℃`;
  const desc = document.createElement("span");
  desc.classList.add("temp-description");
  desc.textContent = data.weather[0].description;

  tempBlock.append(temp, desc);

  const details = document.createElement("div");
  details.classList.add("weather-details");

  function createDetail(title, value) {
    const box = document.createElement("article");
    box.classList.add("detail-box");
    const t = document.createElement("span");
    t.classList.add("detail-title");
    t.textContent = title;
    const v = document.createElement("strong");

    v.textContent = value;

    box.append(t, v);

    return box;
  }
  details.append(
    createDetail("Feels Like", `${Math.round(data.main.feels_like)}℃`),
    createDetail("Description", data.weather[0].description),
    createDetail("CIty", data.name)
  );

  panel.append(top, temp, details);
  card.append(panel);
};
