"use strict";

// HTML variables
const elSearchBtn = document.getElementById("search-btn");
const elSearchInput = document.getElementById("search-input");
const elIpAdress = document.getElementById("IPAdress-output");
const elLocation = document.getElementById("Location-output");
const elTimezone = document.getElementById("Timezone-output");
const elISP = document.getElementById("ISP-output");

//Fetches the user's current location and shows the info fetched from the ipfy api
async function GetUserIP() {
  await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => showUserData(data.ip));
}

// Fetch ip info function
async function fetchIPAdressInfo(ipAddress) {
  let data;
  await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_QUWwggAu1RxD88ono9IwPfHgxt6jc&ipAddress=${ipAddress}`
  ).then((response) => {
    data = response.json();
  });
  return data;
}
// show user info
async function showUserData(ipAddress) {
  const data = await fetchIPAdressInfo(ipAddress);
  elIpAdress.textContent = data.ip;
  elLocation.textContent = `${data.location.city},${data.location.country}`;
  elTimezone.textContent = `UTC${data.location.timezone}`;
  elISP.textContent = data.isp;
  //Creating custom icon
  var customIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
  });

  console.log(data.location.lat, data.location.lng);
  var myLatLng = new L.LatLng(data.location.lat, data.location.lng);
  //Creating map
  var map = L.map("map", { zoomControl: false }).setView(
    myLatLng,
    13
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 49,
  }).addTo(map);
  // Adding custom icon to the map
  var marker = L.marker(myLatLng, {
    icon: customIcon,
  }).addTo(map);
}

// Initial Page Load
GetUserIP();

//Fetch API on click event
elSearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (elSearchInput.value) {
    showUserData(elSearchInput.value);
  } else {
    window.alert("IP address field can not be empty");
    window.location.reload();
  }
});

