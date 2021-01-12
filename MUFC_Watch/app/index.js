import clock from "clock";
import document from "document";
import { preferences,units } from "user-settings";
import * as util from "../common/utils";
import { me as appbit } from "appbit";

import { goals, today,primaryGoal } from "user-activity";
import { HeartRateSensor } from "heart-rate";

// Update the clock every minute
clock.granularity = "minutes";


function updateClock(){
  
  
const Fred = document.getElementById('fred')
    Fred.style.display = "show";
//  updateGoals();
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
  document.getElementById('timeOutline').textContent= hours + ":" + mins;



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
   document.getElementById('dateOutline').textContent= currDay + " " +currMonth+ " " + currDate.getDate();  

    }
clock.ontick = () => updateClock();





