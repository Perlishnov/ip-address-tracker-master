"use strict";

// HTML variables
const elSearchBtn = document.getElementById("search-btn");
const elSearchInput = document.getElementById("search-input");
const elIpAdress = document.getElementById("IPAdress-output");
const elLocation = document.getElementById("Location-output");
const elTimezone = document.getElementById("Timezone-output");
const elISP = document.getElementById("ISP-output");

var map = L.map("map", { zoomControl: false }).setView([0, 0], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 49,
}).addTo(map);
//Creating custom icon
var customIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
// Adding custom icon to the map
var marker = L.marker([0, 0], {
  icon: customIcon,
}).addTo(map);

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
  elIpAdress.textContent = data.ip ? data.ip : "Not Found";
  elLocation.textContent = `${
    data.location.country || data.location.city
      ? `${data.location.city},${data.location.country}`
      : "Not found"
  }`;
  elTimezone.textContent = `UTC${
    data.location.timezone ? data.location.timezone : "Not found"
  }`;
  elISP.textContent = data.isp ? data.isp : "Not found";

  var myLatLng = new L.LatLng(data.location.lat, data.location.lng);
  //Setting the map and marker to the fetched location
  map.setView(myLatLng, 13);
  marker.setLatLng(myLatLng);
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
