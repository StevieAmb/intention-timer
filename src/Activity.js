class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer(minutes, seconds) {
   setInterval(function () {
     if(seconds > 0) {
       seconds -= 1;
     } else if (minutes > 0) {
       minutes -= 1;
       seconds = 59;
     } else {
       return startTimerButton.innerText = "FINISHED!";
     }
     minutes = minutes.toString().padStart(2, "0");
     seconds = seconds.toString().padStart(2, "0");
     timerDisplay.innerText = `${minutes}:${seconds}`}, 1000
   )
  }
  markComplete() {

  }
  saveToStorage() {

  }
}


module.exports = Activity;
