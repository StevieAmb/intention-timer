var activityTitle = document.getElementById('newActivity');
var categoryBox = document.getElementById('categoryBox');
//images
var studyImage = document.querySelector('.study-image');
var meditateImage = document.querySelector('.meditate-image');
var exerciseImage = document.querySelector('.exercise-image');
//buttons
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startActivityButton = document.getElementById('startActivity');
var startTimerButton = document.querySelector('.start');
var logActivityButton = document.querySelector('.log-activity-button');
var createNewActivityButton = document.querySelector('.create-new-activity-button');
//inputs
var userAccomplishInput = document.getElementById('userAccomplish');
var userMinutesInput = document.getElementById('userMinutes');
var userSecondsInput = document.getElementById('userSeconds');
//views
var timerView = document.querySelector('.timer-presenter-view');
var userActivityInputView = document.querySelector('.user-activity-input-view');
var createNewActivityView = document.querySelector('.create-new-activity-view');
//timer
var timerDisplay = document.querySelector('.start-time');
var chosenActivityDisplay = document.querySelector('.chosen-activity');
var circle = document.querySelector('.circle');
//aside
var pastActivitiesText = document.querySelector('.past-activities-paragraphs');
var pastActivitiesBox = document.querySelector('.empty-box');
//errors
var categoryError = document.querySelector('.category');
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');
//data model
var currentActivity = {};
var savedActivities = [];



//functions
const displayLoggedActivity = () => {
  completeActivity();
  pastActivitiesBox.innerHTML = '';
  savedActivities.forEach(savedActivity => {
    pastActivitiesBox.innerHTML += `
    <section class="past-activities-box">
      <section class="past-activities">
        <p class="category-header">${savedActivity.category}</p>
        <p class="logged-timer">${savedActivity.minutes} MIN ${savedActivity.seconds} SECONDS</p>
        <p class="activity-description">${savedActivity.description}</p>
      </section>
      <section class="category-color-box">
        <div class="category-color-bar ${savedActivity.color}"></div>
      </section>
    </section>`;
  });
};

const startActivity = () => {
  if (selectedCategory !== '' && userAccomplishInput.value !== '' && userMinutesInput.value !== '' && userSecondsInput.value !== '') {
    createActivity();
    removeClassTimer();
    refreshTimer();
  } else {
    removeClassErrorMessages();
  }
};

const refreshTimer = () => {
  startTimerButton.disabled = false;
  startTimerButton.innerText = 'START';
  addClass(logActivityButton, 'visibility')
};

const changeColorBar = () => {
  for (var i = 0; i < savedActivities.length; i++) {
    if (savedActivities[i].category === 'Study') {
      savedActivities[i].color = 'green-bar';
    } else if (savedActivities[i].category === 'Meditate') {
      savedActivities[i].color = 'purple-bar';
    } else if (savedActivities[i].category === 'Exercise') {
      savedActivities[i].color = 'red-bar';
    }
  };
};

const beginTimer = () => {
  currentActivity.startTimer(currentActivity.minutes, currentActivity.seconds);
  changeColorBar();
};

const removeClassErrorMessages = () => {
  validateCategory();
  validateAccomplish();
  validateMinutes();
  validatedSeconds();
};

const validateCategory = () => {
  if (selectedCategory === '') {
    removeClass(categoryError, 'visibility');
  };
};

const unhighlightCategory = (element, element2, rule, icon) => {
  element2.src = `./assets/${icon}.svg`;
  element.classList.remove(rule);
};

const createActivity = () => {
  var color = changeColorBar();
  currentActivity = new Activity(selectedCategory, userAccomplishInput.value, userMinutesInput.value, userSecondsInput.value, color);
  savedActivities.unshift(currentActivity);
};

const checkCategory = (event, category, activity) => {
  for (var i = 0; i < category.length; i++) {
    if (category[i] === event.target.id) {
      selectedCategory = activity;
    };
  };
};

const displayUserInput = () => {
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, '0');
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, '0');
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
  chosenActivityDisplay.innerText = `${currentActivity.description}`;
};

const changeCircleColor = (element) => {
  if (currentActivity.category === 'Study') {
    addClass(element, 'green');
  } else if (currentActivity.category === 'Meditate') {
    addClass(element, 'purple');
  } else if (currentActivity.category === 'Exercise') {
    addClass(element, 'red');
  };
};

const highlightCategoryStudy = () => {
  highlightCategory(studyButton, studyImage, 'study-click', 'study');
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

const highlightCategoryMeditate = () => {
  highlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

const highlightCategoryExercise = () => {
  highlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
};

const removeClassTimer = () => {
  removeClass(timerView, 'hidden');
  addClass(userActivityInputView, 'hidden');
  changeActivityTitle();
  displayUserInput();
  changeCircleColor(circle);
};

const changeActivityTitle = () => {
  activityTitle.innerText = 'Current Activity';
};

const highlightCategory = (element, element2, rule, icon) => {
  if (element.classList.contains(rule)) {
    element2.src = `./assets/${icon}.svg`;
    element.classList.remove(rule);
  } else {
    element2.src = `./assets/${icon}-active.svg`;
    element.classList.add(rule);
  };
};

const validateAccomplish = () => {
  if (userAccomplishInput.value === '') {
    removeClass(accomplishError, 'visibility');
  };
};

const validateMinutes = () => {
  if (userMinutesInput.value === '') {
    removeClass(minutesError, 'visibility');
  };
};

const validatedSeconds = () => {
  if (userSecondsInput.value === '') {
    removeClass(secondsError, 'visibility');
  };
};

const displayHomePage = () => {
  activityTitle.innerHTML = 'New Activity';
  clearInput();
  clearButton();
  clearErrorMessage();
  clearCircle();
  addClass(createNewActivityView, 'hidden');
  removeClass(userActivityInputView, 'hidden');
};

const clearInput = () => {
  selectedCategory = '';
  userSecondsInput.value = '';
  userAccomplishInput.value = '';
  userMinutesInput.value = '';
};

const clearButton = () => {
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
};

const clearCircle = () => {
  removeClass(circle, 'green');
  removeClass(circle, 'purple');
  removeClass(circle, 'red');
};

const clearErrorMessage = () => {
  addClass(accomplishError, 'visibility');
  addClass(minutesError, 'visibility');
  addClass(secondsError, 'visibility');
};

const displayCreateNewButton = () => {
  activityTitle.innerText = 'Completed Activity';
  addClass(timerView, 'hidden');
  removeClass(createNewActivityView, 'hidden');
};

const completeActivity = () => {
  currentActivity.markComplete()
};

const disableButton = (element) => {
  element.disabled = true;
  addClass(element, 'disabled');
};

const removeClass = (element, rule) => {
  element.classList.remove(rule);
};

const addClass = (element, rule) => {
  element.classList.add(rule);
};

//event listeners
startTimerButton.addEventListener('click', beginTimer);
startActivityButton.addEventListener('click', startActivity);
studyButton.addEventListener('click', highlightCategoryStudy);
meditateButton.addEventListener('click', highlightCategoryMeditate);
exerciseButton.addEventListener('click', highlightCategoryExercise);
createNewActivityButton.addEventListener('click', displayHomePage);
logActivityButton.addEventListener('click', (event) => {
  addClass(pastActivitiesText, 'hidden');
  removeClass(pastActivitiesBox, 'hidden')
  displayLoggedActivity();
  displayCreateNewButton();
});
userMinutesInput.addEventListener('keydown', (event) => {
  if(keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
userSecondsInput.addEventListener('keydown', (event) => {
  if(keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
categoryBox.addEventListener('click', (event) => {
  checkCategory(event, meditateIds, 'Meditate');
  checkCategory(event, exerciseIds, 'Exercise');
  checkCategory(event, studyIds, 'Study');
});

