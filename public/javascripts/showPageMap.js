mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: JSON.parse(campground),
    zoom: 10
});

new mapboxgl.Marker()
    .setLngLat(JSON.parse(campground))
    .addTo(map);