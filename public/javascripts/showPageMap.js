mapboxgl.accessToken = mapToken;
const campground = JSON.parse(campgroundData);
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: JSON.parse(campgroundCoordinates),
    zoom: 10
});

new mapboxgl.Marker()
    .setLngLat(JSON.parse(campgroundCoordinates))
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);