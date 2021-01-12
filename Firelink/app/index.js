import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { me as appbit } from "appbit";

import { goals, today,primaryGoal } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import document from "document";
import { preferences, units } from "user-settings";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element

let myanimation = document.getElementById("myanimation");

myanimation.animate("enable");

////////////////////////////////////////////////////////////
//BATTERY

import { battery } from "power";


let batteryBar = document.getElementById('endurance_bar');


function updateBattery() {
    let batteryPercentage = Math.floor(battery.chargeLevel);
   
   

 

    if (batteryPercentage !== 0) {
        batteryBar.width = (batteryPercentage / 100) * 139;
        
    }
}

updateBattery();
battery.onchange = () => updateBattery();


///////////////////////////////////////////////////////////////
//Heart Rate


  

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



////////////////////
///TIME AND DATE////
////////////////////


// Update the <text> element every tick with the current time


function updateClock(){
  updateGoals();
    let myClock = document.getElementById("time");


    clock.granularity = 'seconds'; // seconds, minutes, hours
        let today = new Date();
        let hours = today.getHours();
        let mins = today.getMinutes();
        let seconds =today.getSeconds();

        if (preferences.clockDisplay === "12h") {
            // 12h format
            hours = hours % 12 || 12;

        } else {
            // 24h format
            hours = util.zeroPad(hours);

        }
      if(mins<10){
        mins = "0"+mins;
      }

    document.getElementById('time').textContent= hours + ":" + mins;



    let currDate = new Date();

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
    let currMonth = month[currDate.getMonth()];

    let day = new Array();
      day[0] = "Sun";
      day[1] = "Mon";
      day[2] = "Tue";
      day[3] = "Wed";
      day[4] = "Thu";
      day[5] = "Fri";
      day[6] = "Sat";
    let currDay = day[currDate.getDay()];


    document.getElementById('date').textContent= currDay + " " +currMonth+ " " + currDate.getDate();  

    }
clock.ontick = () => updateClock();


    

    
///////////////////////////
/////// Primary Goal //////
///////////////////////////



let healthBar = document.getElementById('health_bar');


if (appbit.permissions.granted("access_activity")) {
   let goalPercentage = (today.adjusted[primaryGoal] || 0) * 100 / goals[primaryGoal];
   
  
  if(goalPercentage >= 100){
     displayHealthBar(242);
  }
  else if (goalPercentage !== 0) {
       displayHealthBar((goalPercentage / 100) * 243.6);
    }
}
function displayHealthBar(healthBarWidth){
  document.getElementById('health_bar').width = healthBarWidth;
}
//////////////////////////////////////////




///////////////
/// GOALS /////
///////////////


function updateGoals(){
  if(units.distance=="metric"){
    console.log(units.distance);
     document.getElementById('distUnits').textContent= "km" ;
    document.getElementById('numDist').textContent= (today.adjusted["distance"]/1000).toFixed(2);
       
  }
  else{
     document.getElementById('distUnits').textContent= "mi";
    document.getElementById('numDist').textContent= (today.adjusted["distance"]/5280).toFixed(2);
  }
    document.getElementById('numSteps').textContent= today.adjusted["steps"] ;
    document.getElementById('numCalories').textContent= today.adjusted["calories"] ;
    
    document.getElementById('numElev').textContent= today.adjusted["elevationGain"] ;
    document.getElementById('numMins').textContent= today.adjusted["activeMinutes"] ;
   
  
 
  
}









