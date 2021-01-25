import document from "document"; 
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { me as appbit } from "appbit";
import { goals, today,primaryGoal } from "user-activity";


// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const currTime = document.getElementById("currTime");
const currMonth = document.getElementById("currMonth");
const currDay = document.getElementById("currDay");
const heartRate = document.getElementById("heartRate");

////////////// TIME AND DATE //////////////////////////////
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let secs = util.zeroPad(today.getSeconds());
  let mins = util.zeroPad(today.getMinutes()); 
  currTime.text = `${hours}:${mins}:${secs}`;
}

  let date = new Date(); 
  let month = new Array();
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";
    
       currMonth.textContent = month[date.getMonth()];
       currDay.textContent = date.getDate(); 
//////////////////////////////////////////////////////////////

///////////////////////Heart Rate


  
if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      displayHeartRate(`${hrm.heartRate}`);
    });
    
    hrm.start();
    
  }

function displayHeartRate(heartRate){
  document.getElementById('heartRate').textContent= heartRate;
}



/////////////////////////////////////////////////////////////
//Battery
//////////////////////////////////////////

let batteryBar = document.getElementById('batteryBar');


function updateBattery() {
    let batteryPercentage = Math.floor(battery.chargeLevel);
   
   

 

    if (batteryPercentage !== 0) {
        batteryBar.width = (batteryPercentage / 100)  * 69.5;
        document.getElementById('batteryNumber').textContent=batteryPercentage
    }
  
}

updateBattery();
battery.onchange = () => updateBattery();









/////////////////////////////////////////////////////
//GOAL
/////////////////////////////////////////////////////
if (appbit.permissions.granted("access_activity")) {
   let goalPercentage = (today.adjusted[primaryGoal] || 0) * 100 / goals[primaryGoal];
  
   if(goalPercentage >= 100){
     displayGoalBar(69.5);
  }
  else if (goalPercentage !== 0) {
       displayGoalBar((goalPercentage / 100) * 69.5);
    }
}

document.getElementById("goalNumber").textContent = today.adjusted[primaryGoal]; 

function displayGoalBar(goalBarWidth){
  document.getElementById('goalBar').width = goalBarWidth;
}
 ///////////////////////////////////////////////////
////Img change
///////////////////////////////////////////////////

var image = document.getElementById("img");

let counter = 1; 


image.href = "images/1.png";


  image.onclick = (e) => {
  counter++;
  if(counter>10) {counter =1;}
  
  image.href = "images/" + counter + ".png" ;
}

//<svg>
 // <image id="img" class="img" href="images/1.png" pointer-events="visible" />
 // </svg>
//
