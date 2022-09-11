// Days Array
let week_days = ["sun", "mon", "tus", "wed", "thu", "fri", "sat"];

// Clock variables
let hours = document.getElementById("hrs");
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");
let dayNight = document.getElementById("d-n");

// Alarm variables
let alarmHrs = document.getElementById("alr-hrs");
let alarmMins = document.getElementById("alr-mins");
let alarmSecs = document.getElementById("alr-secs");
let alarmDayNight = document.getElementById("alr-ampm");
let alarmBtn = document.getElementById("set-alarm");

// Current time, alarm time and alarm status 
let currentTime;
let alarmElement;
let activeAlarm = false;

// Sound 
let sound = new Audio("sound/alarm.mp3")
sound.loop = true;


function clock(){
    let now = new Date();
    
    currentTime = now.toLocaleTimeString(); 
    let day = now.getDay();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    let d_n = h < 11 ? "AM" : "PM"; 

    if(activeAlarm === true){ // alarm condition 
        if(h < 10){
            if(alarmElement.startsWith(currentTime, 1)){
                sound.play();
            }
        }else if(currentTime === alarmElement){
            sound.play();
        }   
    }
    
    hours.innerHTML = h;
    mins.innerHTML = m;
    secs.innerHTML = s;
    dayNight.innerHTML = d_n;
    document.getElementById(`${week_days[day]}`).style.color = "black";
}

// Adding minutes and seconds to the drop down menu 
function addMinSec(id){
    let index = id;
    let min = 60;

    for(let i=0;i<min;i++){
        index.options[index.options.length] = new Option(i < 10 ? "0" + i : i)
    }
}

// Adding hours to the drop down menu 
function addHours(id){
    let index = id;
    let min = 13;

    for(let i=0;i<min;i++){
        index.options[index.options.length] = new Option(i < 10 ? "0" + i : i)
    }
}

// Event listener
alarmBtn.onclick = function(){
    if(activeAlarm === false){ 
        // setting alarm 
        alarmHrs.disabled = true;
        alarmMins.disabled = true;
        alarmSecs.disabled = true;
        alarmDayNight.disabled = true;
        
        alarmElement = alarmHrs.value + ":" + alarmMins.value + ":" + alarmSecs.value + " " + alarmDayNight.value;
        this.textContent = "Clear Alarm";
        activeAlarm = true;
    }else{ 
        // disabling alarm
        alarmHrs.disabled = false;
        alarmMins.disabled = false;
        alarmSecs.disabled = false;
        alarmDayNight.disabled = false;

        sound.pause();
        this.textContent = "Set Alarm";
        activeAlarm = false;
    }
}


// Calling Functions
addMinSec(alarmMins);
addMinSec(alarmSecs);
addHours(alarmHrs);
let inter = setInterval(clock,1000);