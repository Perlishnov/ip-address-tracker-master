"use strict";

var map = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 49,
}).addTo(map);

