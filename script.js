document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour le compte à rebours
  function countdown() {
    const countDate = new Date("January 7, 2025 17:15:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // Calcul du temps restant
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    // Mise à jour du DOM
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Rafraîchissement toutes les secondes
    setTimeout(countdown, 1000);
  }

  countdown();

  // Fonction pour récupérer la météo avec tentatives
  function fetchWeather(cityName, attempt = 1) {
    const apiKey = "1611f44da3404cc3bf1132141242110"; // Remplacez par votre clé API WeatherAPI
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&lang=fr`;

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.location && data.current) {
          const city = data.location.name;
          const temperature = data.current.temp_c;
          const description = data.current.condition.text;
          const weatherInfo = `${temperature}°C, ${description}`;
          const lat = data.location.lat;
          const lon = data.location.lon;

          // Mise à jour des informations météo
          document.getElementById("weather-info").innerText = weatherInfo;

          const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
          const cityLinkElement = document.getElementById("city-link");

          if (cityLinkElement) {
            cityLinkElement.setAttribute("href", googleMapsUrl);
            cityLinkElement.innerText = city;
          } else {
            console.error("L'élément city-link est introuvable dans le DOM.");
          }
        } else {
          console.error("Réponse de l'API invalide", data);
        }
      })
      .catch((error) => {
        console.error(
          `Erreur de récupération de la météo (Tentative ${attempt}):`,
          error
        );
        if (attempt < 3) {
          setTimeout(() => fetchWeather(cityName, attempt + 1), 1000); // Nouvelle tentative après 1 seconde
        } else {
          console.error(
            "Échec de la récupération de la météo après 3 tentatives."
          );
        }
      });
  }

  // Récupération d'une ville aléatoire depuis cities.json
  fetch("cities.json")
    .then((response) => response.json())
    .then((cities) => {
      // Sélection d'une ville au hasard
      const randomCityObj = cities[Math.floor(Math.random() * cities.length)];
      const randomCityName = randomCityObj.city; // Utilise "city" du fichier JSON

      // Appel à l'API Météo avec tentatives
      fetchWeather(randomCityName);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du fichier cities.json:", error);
    });
});
