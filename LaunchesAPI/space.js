const url = "";

window.addEventListener("load", () => fetchSpace("SpaceX"));

function reload() {
    window.location.reload();
}

async function fetchSpace(stringg) {
    const res = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/?search=${stringg}`, {
        method : 'GET',
        header : {
            'accept' : 'application/json'
        }
    });
    //const res = await fetch('./api.json');
    
    const data = await res.json();
    console.dir(data.results);
    bindData(data.results);
   
}

function bindData(objects) {
    const cardsContainer = document.querySelector(".container");
    const newsCardTemplate = document.querySelector("#template-space");

    cardsContainer.innerHTML = "";

    console.log(newsCardTemplate);
    objects.forEach((object) => {
        if (!object.image) return;
        if(object.status.abbrev == 'Success') return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, object);
        cardsContainer.appendChild(cardClone);
    });

    const infoLinks = document.querySelectorAll('.info');
  const descriptions = document.querySelectorAll('.description');

  infoLinks.forEach(function (infoLink, index) {
    infoLink.addEventListener('click', function (event) {
      event.preventDefault();
      // Toggle the 'visible' class on the corresponding description
      descriptions[index].classList.toggle('visible');
    });
  });

    
    Time();    

    setInterval(Time, 1000);   

}



function Time() {
    const timeElements = document.querySelectorAll('.time');
    timeElements.forEach(function (timeElement) {
        const DD = parseInt(timeElement.querySelector('.DD').innerHTML, 10);
        const HH = parseInt(timeElement.querySelector('.HH').innerHTML, 10);
        const MM = parseInt(timeElement.querySelector('.MM').innerHTML, 10);
        const SS = parseInt(timeElement.querySelector('.SS').innerHTML, 10);

        Clock(timeElement, DD, HH, MM, SS);
    });
}

function Clock(obj,days,hours,minutes,seconds) {
    // API returned string
    //const apiTimeString = obj.innerHTML;
  
    // Convert API time string to JavaScript Date object
    console.log("I am Called...");
    console.log(obj.querySelector('.DD').innerHTML);
    // //Convert UTC time to IST by adding 5 hours and 30 minutes
    // const DD = parseInt(obj.querySelector('.DD').innerHTML, 10);
    // const HH = parseInt(obj.querySelector('.HH').innerHTML, 10);
    // const MM = parseInt(obj.querySelector('.MM').innerHTML, 10);
    // const SS = parseInt(obj.querySelector('.SS').innerHTML, 10);

    // // Convert extracted values to milliseconds and create a new Date object
    // const apiTimeIST = new Date(`2023-11-${DD}T${HH}:${MM}:${SS}.000+05:30`);
    //const apiTimeIST =  new Date(`2023-11-${obj.querySelector('.DD').innerHTML}T${obj.querySelector('.HH').innerHTML}:${obj.querySelector('.MM').innerHTML}:${obj.querySelector('.SS').innerHTML}.000+05:30}`);
    // Get the current time
    
   // console.log(apiTimeIST);
  
    // Calculate time left by subtracting API time from current time
    const timeLeftMilliseconds = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds) * 1000 -1000;
  
    // Calculate days, hours, minutes, and seconds
    const Days = Math.floor(timeLeftMilliseconds / (1000 * 60 * 60 * 24));
    const Hours = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const Minutes = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const Seconds = Math.floor((timeLeftMilliseconds % (1000 * 60)) / 1000);
  
    // Display or update the clock on the website
    
   
   

    obj.innerHTML = `<div><h2>T-</h2></div>
                        <div><h2 class="DD">${Days}</h2><p>Days</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="HH">${(Hours)}</h2><p>Hours</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="MM">${(Minutes)}</h2><p>Mins</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="SS">${(Seconds)}</h2><p>Secs</p></div>`;

    

  }


  function updateClock(cardClone,object) {
    // API returned string
    const apiTimeString = object.net;
    //console.log(object.name);
    // Convert API time string to JavaScript Date object
    const apiTimeIST = new Date(apiTimeString);
    //console.log('api time is ', apiTimeUTC)
    // Convert UTC time to IST by adding 5 hours and 30 minutes
    //const apiTimeIST = new Date(apiTimeUTC.getTime() + (5 * 60 + 30) * 60000);
    //console.log('ist time ',apiTimeIST);
    // Get the current time
    const currentTime = new Date();
    
  
    // Calculate time left by subtracting API time from current time
    const timeLeftMilliseconds = apiTimeIST.getTime() - currentTime.getTime();
    console.log(apiTimeIST.getTime(), ' ',currentTime.getTime());
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeftMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeftMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeftMilliseconds % (1000 * 60)) / 1000);
  
    // Display or update the clock on the website
    const Time = cardClone.querySelector(".time");
    const Launch_time = cardClone.querySelector(".launch-date-time");
   
    const date = apiTimeIST.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        
        month : 'long',
        day : "numeric",
        year : 'numeric',
        hour : "numeric",
        minute : "numeric",
        second: "numeric"

    });
    Launch_time.innerHTML = date;

    Time.innerHTML = `<div><h2>T-</h2></div>
                        <div><h2 class="DD">${days}</h2><p>Days</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="HH">${(hours)}</h2><p>Hours</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="MM">${(minutes)}</h2><p>Mins</p></div>
                        <div><h2>:</h2></div>
                        <div><h2 class="SS">${(seconds)}</h2><p>Secs</p></div>`;


  }

  

function fillDataInCard(cardClone, object) {
    console.log(object);
    const Title = cardClone.querySelector(".title h3");
    const Image = cardClone.querySelector(".image-s");
    const placeOrganisationagency = cardClone.querySelector(".place-organisation #agency");
    const placeOrganisationplace = cardClone.querySelector(".place-organisation #place");
    const description = cardClone.querySelector('.description');

    
    const Status = cardClone.querySelector(".status");
    const LinksWatch = cardClone.querySelector(".watch-link");
    const LinksInfo = cardClone.querySelector(".info");
    const LinksShare = cardClone.querySelector(".share")
    console.log(Title);
    Image.src = object.image;
    Title.innerHTML = object.name;
    placeOrganisationagency.innerHTML = object.launch_service_provider.name;
    placeOrganisationplace.innerHTML = object.pad.location.name;
    
    updateClock(cardClone,object);

    Status.innerHTML = object.status.abbrev;
    console.log(object.status.abbrev != 'Go');
    console.log(Status);
    if(object.status.abbrev != 'Go' && object.status.abbrev!='In Flight')
    {
        Status.classList.add('notGo');
    }
    else if(object.status.abbrev == 'In Flight'){
            Status.classList.add('inFlight');
    }

    LinksWatch.href = object.pad.map_url;
    description.innerHTML = object.mission.description ;
    

    
}

document.addEventListener('load', function () {
    const watchLinks = document.querySelectorAll('.info');
    console.log(watchLinks);
    const description = document.querySelector('.description');
  
    watchLinks.forEach(function (watchLink) {
      watchLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
  
        // Toggle the 'visible' class on the description
        description.classList.toggle('visible');
      });
    });
  });
  
 
