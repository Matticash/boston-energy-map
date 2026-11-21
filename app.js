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
  zoomSnap: 0.25, // lets the study area fill the screen more tightly
  maxZoom: 16,
  maxBounds: STUDY_AREA.pad(0.05),
  maxBoundsViscosity: 1.0
});
L.control.zoom({ position: "topright" }).addTo(map);
map.fitBounds(STUDY_AREA);
map.setMinZoom(map.getZoom()); // can't zoom out past the whole study area

const ATTRIBUTION = "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors";
const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/";

// Light grayscale base map with no labels, so we control which names show.
L.tileLayer(ESRI + "World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
  attribution: ATTRIBUTION,
  maxZoom: 16
}).addTo(map);

// Detailed street and neighborhood labels, only once zoomed in.
const DETAIL_ZOOM = 12;
const detailLabels = L.tileLayer(ESRI + "World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 16,
  pane: "shadowPane" // draws above the mask and the data dots
});

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

// Big towns, labeled at the regional zoom levels.
const TOWNS = [
  { name: "Boston", lat: 42.3601, lng: -71.0589, major: true },
  { name: "Cambridge", lat: 42.3736, lng: -71.1097 },
  { name: "Quincy", lat: 42.2529, lng: -71.0023 },
  { name: "Newton", lat: 42.3370, lng: -71.2092 },
  { name: "Waltham", lat: 42.3765, lng: -71.2356 },
  { name: "Woburn", lat: 42.4793, lng: -71.1523 },
  { name: "Lynn", lat: 42.4668, lng: -70.9495 },
  { name: "Salem", lat: 42.5195, lng: -70.8967 },
  { name: "Gloucester", lat: 42.6159, lng: -70.6620 },
  { name: "Lowell", lat: 42.6334, lng: -71.3162 },
  { name: "Lawrence", lat: 42.7070, lng: -71.1631 },
  { name: "Haverhill", lat: 42.7762, lng: -71.0773 },
  { name: "Framingham", lat: 42.2793, lng: -71.4162 },
  { name: "Marlborough", lat: 42.3459, lng: -71.5523 },
  { name: "Brockton", lat: 42.0834, lng: -71.0184 },
  { name: "Plymouth", lat: 41.9584, lng: -70.6673 },
  { name: "Attleboro", lat: 41.9445, lng: -71.2856 }
];

const townLabels = L.layerGroup(
  TOWNS.map((t) =>
    L.marker([t.lat, t.lng], {
      interactive: false,
      icon: L.divIcon({
        className: "town-label" + (t.major ? " major" : ""),
        html: `<span>${t.name}</span>`,
        iconSize: null
      })
    })
  )
);

// Swap between big-town labels (zoomed out) and detailed labels (zoomed in).
function updateLabels() {
  if (map.getZoom() >= DETAIL_ZOOM) {
    map.removeLayer(townLabels);
    detailLabels.addTo(map);
  } else {
    map.removeLayer(detailLabels);
    townLabels.addTo(map);
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
