

let url1 ='https://api.wheretheiss.at/v1/satellites/25544';
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");
let alt = document.getElementById("alt");
let vel = document.getElementById("vel");



let check = true;async function getISS(){
      try{
      let response = await fetch(url1);
      let data = await response.json();
      console.log(data);
      lat.textContent = data.latitude;
      lon.textContent = data.longitude;
      alt.textContent = data.altitude;
      vel.textContent = data.velocity;
      }
      catch(error){
            console.error(error);
            lat.textContent= "ERROR"
            lon.textContent= "ERROR"
            alt.textContent= "ERROR"
            vel.textContent= "ERROR"     
      }
      
}
setInterval(getISS,1200);

