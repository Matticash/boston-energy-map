// Map skeleton: base map + a circle that follows the mouse and
// highlights any site inside it.

const BOSTON = [42.3601, -71.0589];
const RADIUS_METERS = 4000; // size of the mouse circle

// Study area: Greater Boston, stopping just north of Providence, RI.
// South edge sits above Pawtucket so Providence stays out.
const STUDY_AREA = L.latLngBounds(
  [41.89, -71.65], // southwest corner (above Pawtucket, east of Worcester)
  [42.88, -70.45]  // northeast corner (past Haverhill and Cape Ann)
);

const map = L.map("map", {
  zoomControl: false,
  // Whole-number zoom levels only: in-between levels stretch the map images
  // and make them blurry.
  zoomSnap: 1,
  maxZoom: 16,
  maxBounds: STUDY_AREA.pad(0.05),
  maxBoundsViscosity: 1.0
});
L.control.zoom({ position: "topright" }).addTo(map);
map.fitBounds(STUDY_AREA);
map.setMinZoom(map.getZoom()); // can't zoom out past the whole study area

const ATTRIBUTION = "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors";
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";

// Light grayscale base map with no labels. All place names are drawn by us
// (below) as real text, so they stay sharp at every zoom level.
L.tileLayer(ESRI + "World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
  attribution: ATTRIBUTION,
  maxZoom: 16
}).addTo(map);

// Fade everything outside the study area.
const WORLD = [[-90, -180], [-90, 180], [90, 180], [90, -180]];
const HOLE = [
  STUDY_AREA.getSouthWest(), STUDY_AREA.getNorthWest(),
  STUDY_AREA.getNorthEast(), STUDY_AREA.getSouthEast()
];
L.polygon([WORLD, HOLE], {
  stroke: false,
  fillColor: "#ffffff",
  fillOpacity: 0.75,
  interactive: false
}).addTo(map);
L.rectangle(STUDY_AREA, {
  color: "#9a9a9a",
  weight: 1,
  dashArray: "4 4",
  fill: false,
  interactive: false
}).addTo(map);

// Place names. Each one shows between its minZoom and maxZoom, so the map
// never gets crowded: big towns first, then inner cities, then neighborhoods.
//   tier "major": Boston itself
//   tier "town":  cities and towns
//   tier "hood":  Boston neighborhoods
const PLACES = [
  { name: "Boston", tier: "major", lat: 42.3601, lng: -71.0589, maxZoom: 12 },

  // Regional towns (always shown)
  { name: "Quincy", tier: "town", lat: 42.2529, lng: -71.0023 },
  { name: "Salem", tier: "town", lat: 42.5195, lng: -70.8967 },
  { name: "Gloucester", tier: "town", lat: 42.6159, lng: -70.6620 },
  { name: "Lowell", tier: "town", lat: 42.6334, lng: -71.3162 },
  { name: "Lawrence", tier: "town", lat: 42.7070, lng: -71.1631 },
  { name: "Haverhill", tier: "town", lat: 42.7762, lng: -71.0773 },
  { name: "Framingham", tier: "town", lat: 42.2793, lng: -71.4162 },
  { name: "Marlborough", tier: "town", lat: 42.3459, lng: -71.5523 },
  { name: "Brockton", tier: "town", lat: 42.0834, lng: -71.0184 },
  { name: "Plymouth", tier: "town", lat: 41.9584, lng: -70.6673 },
  { name: "Attleboro", tier: "town", lat: 41.9445, lng: -71.2856 },

  // Close to Boston: appear after one zoom step
  { name: "Cambridge", tier: "town", lat: 42.3736, lng: -71.1097, minZoom: 10 },
  { name: "Newton", tier: "town", lat: 42.3370, lng: -71.2092, minZoom: 10 },
  { name: "Waltham", tier: "town", lat: 42.3765, lng: -71.2356, minZoom: 10 },
  { name: "Woburn", tier: "town", lat: 42.4793, lng: -71.1523, minZoom: 10 },
  { name: "Lynn", tier: "town", lat: 42.4668, lng: -70.9495, minZoom: 10 },

  // Inner ring: appear once zoomed in further
  { name: "Somerville", tier: "town", lat: 42.3876, lng: -71.0995, minZoom: 12 },
  { name: "Brookline", tier: "town", lat: 42.3318, lng: -71.1212, minZoom: 12 },
  { name: "Watertown", tier: "town", lat: 42.3709, lng: -71.1828, minZoom: 12 },
  { name: "Medford", tier: "town", lat: 42.4184, lng: -71.1062, minZoom: 12 },
  { name: "Malden", tier: "town", lat: 42.4251, lng: -71.0662, minZoom: 12 },
  { name: "Everett", tier: "town", lat: 42.4084, lng: -71.0537, minZoom: 12 },
  { name: "Chelsea", tier: "town", lat: 42.3918, lng: -71.0328, minZoom: 12 },
  { name: "Revere", tier: "town", lat: 42.4084, lng: -71.0120, minZoom: 12 },

  // Boston neighborhoods: replace the "Boston" label up close
  { name: "Back Bay", tier: "hood", lat: 42.3503, lng: -71.0810, minZoom: 13 },
  { name: "Beacon Hill", tier: "hood", lat: 42.3588, lng: -71.0707, minZoom: 13 },
  { name: "North End", tier: "hood", lat: 42.3647, lng: -71.0542, minZoom: 13 },
  { name: "Downtown", tier: "hood", lat: 42.3555, lng: -71.0605, minZoom: 13 },
  { name: "South End", tier: "hood", lat: 42.3388, lng: -71.0765, minZoom: 13 },
  { name: "Seaport", tier: "hood", lat: 42.3519, lng: -71.0446, minZoom: 13 },
  { name: "South Boston", tier: "hood", lat: 42.3350, lng: -71.0400, minZoom: 13 },
  { name: "Charlestown", tier: "hood", lat: 42.3782, lng: -71.0602, minZoom: 13 },
  { name: "East Boston", tier: "hood", lat: 42.3702, lng: -71.0389, minZoom: 13 },
  { name: "Fenway", tier: "hood", lat: 42.3429, lng: -71.1003, minZoom: 13 },
  { name: "Roxbury", tier: "hood", lat: 42.3152, lng: -71.0914, minZoom: 13 },
  { name: "Dorchester", tier: "hood", lat: 42.3016, lng: -71.0676, minZoom: 13 },
  { name: "Jamaica Plain", tier: "hood", lat: 42.3097, lng: -71.1151, minZoom: 13 },
  { name: "Allston", tier: "hood", lat: 42.3539, lng: -71.1337, minZoom: 13 },
  { name: "Brighton", tier: "hood", lat: 42.3464, lng: -71.1627, minZoom: 13 },
  { name: "Mattapan", tier: "hood", lat: 42.2771, lng: -71.0914, minZoom: 13 },
  { name: "Roslindale", tier: "hood", lat: 42.2832, lng: -71.1270, minZoom: 13 },
  { name: "West Roxbury", tier: "hood", lat: 42.2793, lng: -71.1595, minZoom: 13 },
  { name: "Hyde Park", tier: "hood", lat: 42.2557, lng: -71.1245, minZoom: 13 }
];

// Fixed-width, centered box keeps text on whole pixels so it renders sharp.
const LABEL_W = 160, LABEL_H = 20;
const placeMarkers = PLACES.map((p) => ({
  place: p,
  marker: L.marker([p.lat, p.lng], {
    interactive: false,
    icon: L.divIcon({
      className: "place-label " + p.tier,
      html: p.name,
      iconSize: [LABEL_W, LABEL_H],
      iconAnchor: [LABEL_W / 2, LABEL_H / 2]
    })
  })
}));
const placeLabels = L.layerGroup().addTo(map);

function updateLabels() {
  const z = map.getZoom();
  placeLabels.clearLayers();
  for (const { place, marker } of placeMarkers) {
    const min = place.minZoom ?? 0;
    const max = place.maxZoom ?? 99;
    if (z >= min && z <= max) placeLabels.addLayer(marker);
  }
}
map.on("zoomend", updateLabels);
updateLabels();

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
