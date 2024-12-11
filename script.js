document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour le compte à rebours
  function countdown() {
    const countDate = new Date("December 19, 2024 17:15:00").getTime();
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
});
