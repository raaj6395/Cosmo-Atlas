let url ='http://api.open-notify.org/iss-now.json';
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");

async function getISS(){
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    lat.textContent = data.iss_position.latitude;
    lon.textContent = data.iss_position.longitude;

}
setInterval (getISS,1000);


