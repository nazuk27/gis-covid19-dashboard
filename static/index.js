let data;
let uniq_state = [];
let mymap;
$(document).ready(() => {
ajaxGet('/json', {}, geoData);
})

const geoData = (d) => {
    console.log(d);
    data = d;
    uniq_state = [...new Set(data.features.map(x => x.properties.STATE))];
    populate_uniq_states();
    let state = $('.uniq_state').val();
    loadMap(state);
};

const loadMap = (state) => {
	let ceter_corrd = data.features.filter(x => x.properties.STATE === state)[0].geometry.coordinates.reverse()
    mymap = L.map('mapid').setView(ceter_corrd, 7);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
	addaMarkers(mymap, state);
};

const addaMarkers = (mymap, state) => {
	let features = data.features;
	let new_york_data = data.features.filter(x => x.properties.STATE === state);
	$.each(new_york_data, (index, value) => {
		L.marker(value.geometry.coordinates.reverse()).addTo(mymap)
			.bindPopup(`<p id="${value.properties.FID}"><b>Name- ${value.properties.NAME}</b> <br>
				City- ${value.properties.CITY} <br>
				ZIP- ${value.properties.ZIP}</p>`)
			.on('popupopen', function (popup) {
				let dom = new DOMParser().parseFromString(popup.popup._content, 'text/xml');
				let id = +dom.firstChild.id;
				updatePanel(id);
			});
	});
}

const updatePanel = (id) => {
	let filtered_dataPoint = data.features.filter(x => x.properties.FID === id)[0];
	let wrapper = $('#table_prop tbody');
	let name_wrapper = $('.hosp_name');
	name_wrapper.html('');
	name_wrapper.append(filtered_dataPoint.properties.NAME)
	wrapper.html('');
	let html = `<tr><td>Address</td><td>${filtered_dataPoint.properties.ADDRESS}</td></tr>
				<tr><td>City</td><td>${filtered_dataPoint.properties.CITY}</td></tr>
				<tr><td>County</td><td>${filtered_dataPoint.properties.COUNTY}</td></tr>
				<tr><td>Helipad</td><td>${filtered_dataPoint.properties.HELIPAD}</td></tr>				
				<tr><td>Beds</td><td>${filtered_dataPoint.properties.BEDS}</td></tr>
				<tr><td>Population</td><td>${filtered_dataPoint.properties.POPULATION}</td></tr>
				<tr><td>State</td><td>${filtered_dataPoint.properties.STATE}</td></tr>
				<tr><td>Trauma</td><td>${filtered_dataPoint.properties.TRAUMA}</td></tr>
				<tr><td>Type</td><td>${filtered_dataPoint.properties.TYPE}</td></tr>
				<tr><td>Hospital Status</td><td>${filtered_dataPoint.properties.STATUS}</td></tr>`;
	wrapper.append(html);

};

const populate_uniq_states = () => {
	let uniq_state_wrapper = $('.uniq_state');
	uniq_state_wrapper.html('');
	let html = '';
	$.each(uniq_state, (index, value) => {
		if (value === 'NY'){
			html += `<option selected>${value}</option>`
		}else{
			html += `<option>${value}</option>`
		}
	});
	uniq_state_wrapper.append(html);
};

$('.update_map').click(() => {
	update_map();
})
const update_map = () => {
	let state = $('.uniq_state').val();
	console.log('Hello');
	remove_markers(state);
	addaMarkers(mymap,state);
};

const remove_markers = (state) => {
	let all_markers = mymap._layers;
	let all_keys = Object.keys(all_markers);
	$.each(all_keys, (index, value) => {
		if (index != 0){
			mymap._layers[value].remove();
		};
	})
}