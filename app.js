// Map skeleton: base map + a circle that follows the mouse and
// highlights any site inside it.

const BOSTON = [42.3601, -71.0589];
const RADIUS_METERS = 2000; // size of the mouse circle

const map = L.map("map", { zoomControl: false }).setView(BOSTON, 12);
L.control.zoom({ position: "topright" }).addTo(map);

// Light grayscale base map so the energy data stands out later.
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19
}).addTo(map);

const STYLE_IDLE = { radius: 6, color: "#555", weight: 1, fillColor: "#999", fillOpacity: 0.8 };
const STYLE_HOT = { radius: 9, color: "#1f8a5b", weight: 2, fillColor: "#2ecc71", fillOpacity: 1 };

// Draw each site as a dot.
const markers = (window.SITES || []).map((site) => {
  const marker = L.circleMarker([site.lat, site.lng], STYLE_IDLE).addTo(map);
  return { site, marker };
});

// The circle that follows the mouse.
const cursor = L.circle(BOSTON, {
  radius: RADIUS_METERS,
  color: "#1f8a5b",
  weight: 1,
  fillColor: "#1f8a5b",
  fillOpacity: 0.08,
  interactive: false
});

const nearbyEl = document.getElementById("nearby");

function update(latlng) {
  cursor.setLatLng(latlng);
  if (!map.hasLayer(cursor)) cursor.addTo(map);

  const inRange = [];
  for (const { site, marker } of markers) {
    const hit = map.distance(latlng, [site.lat, site.lng]) <= RADIUS_METERS;
    marker.setStyle(hit ? STYLE_HOT : STYLE_IDLE);
    if (hit) inRange.push(site);
  }
  renderPanel(inRange);
}

function renderPanel(sites) {
  if (sites.length === 0) {
    nearbyEl.innerHTML = '<p class="empty">Nothing in range.</p>';
    return;
  }
  nearbyEl.innerHTML = sites
    .map((s) => `<div class="site"><div class="name">${s.name}</div><div class="meta">${s.type}</div></div>`)
    .join("");
}

map.on("mousemove", (e) => update(e.latlng));
map.on("mouseout", () => {
  map.removeLayer(cursor);
  markers.forEach(({ marker }) => marker.setStyle(STYLE_IDLE));
  renderPanel([]);
});
// Tap support for phones.
map.on("click", (e) => update(e.latlng));
