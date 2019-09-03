const container = document.querySelector('.grid-container');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const notiContainer = document.getElementById('noti-container');
const notiCircle = document.querySelector('.noti-circle-small');
const traffic = document.querySelector('.traffic');
const trafficNav = document.querySelectorAll('.traffic-nav-link');
const alertM = document.getElementById('alert');
const chartNav = document.getElementById('traffic-nav');
const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById('daily-traffic-chart');
const mobileCanvas = document.getElementById('mobile-chart');
const messageForm = document.querySelector('.message-forms');
const userInput = document.getElementById('userField');
const autocompleteList = document.getElementById('result');
const message = document.getElementById('messageField');
const send = document.getElementById('send');
const settings = document.getElementById('settings');
const emailSetting = document.getElementById('email-settings-input');
const profileSetting = document.getElementById('profile-settings-input');
const timeZone = document.getElementById('timezone');
const ul = document.createElement('ul');
const members = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];
let notifications = ['You have 6 unread messages', 'You have 3 new followers', 'Your password expires in 7 days'];
let emailValue;
let bell = false;

function clearNotiLists() {
  ul.innerHTML = "";
  notiContainer.innerHTML = "";
}

// Notifications Bell
container.addEventListener('click', (e) => {
  if (e.target.id === 'bell' && bell === false) {
    if (notifications.length > 0) {
      bell = !bell;
      // notiCircle.style.fill = 'transparent';
      ul.setAttribute('class', 'notifications');
      notiContainer.appendChild(ul);
      for (let i = 0; i < notifications.length; i++) {
        const li = document.createElement('li');
        li.classList.add('notification-list');
        li.innerHTML = notifications[i] + `<span class="close-button">&#10005;</span>`;
        ul.appendChild(li);
  	  }
    } else if (notifications.length <= 0 && bell === false) {
      bell = !bell;
      const li = document.createElement('li');
      li.classList.add('notification-list');
      ul.setAttribute('class', 'notifications');
      li.textContent = 'You have no messages at the moment.';
      ul.appendChild(li);
      notiContainer.appendChild(ul);
    }
  } else if (e.target.className === 'close-button' && notifications.length <= 1) {
    notiCircle.style.fill = 'transparent';
    let child = e.target;
    let parentElement = e.target.parentElement;
    e.target.parentElement.removeChild(child);
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i] === parentElement.textContent) {
        notifications.splice(i, 1);
        parentElement.style.display = 'none';
      }
    }
    bell = !bell;
  } else if (e.target.className === 'close-button') {
    let child = e.target;
    let parentElement = e.target.parentElement;
    e.target.parentElement.removeChild(child);
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i] === parentElement.textContent) {
        notifications.splice(i, 1);
        parentElement.style.display = 'none';
      }
    }
  } else if (bell === true && notifications.length === 0) {
    notiCircle.style.fill = 'transparent';
    clearNotiLists();
    bell = !bell;
  } else if (e.target.id === 'bell' && bell === true) {
    notiCircle.style.fill = 'rgba(129, 201, 143, 1)';
  	clearNotiLists();
    bell = !bell;
  }
});

container.addEventListener('click', (e) => {
  if (e.target.id !== 'bell' && e.target.className !== 'close-button' && e.target.className !== 'notification-list' & notifications.length > 0) {
    notiCircle.style.fill = 'rgba(129, 201, 143, 1)';
    clearNotiLists();
    bell = !bell;
  }
});

// Navigation Bar
const smallScreen = window.matchMedia('(max-width: 767px)');
const mediumScreen = window.matchMedia('(min-width: 768px)');
let firstNavItem = document.getElementById('nav-item-first');
//

window.addEventListener('DOMContentLoaded', () => {
  if (smallScreen.matches) {
    firstNavItem.style.borderBottom = '0.1875em solid #81C98F';
  } else if (mediumScreen.matches) {
    firstNavItem.style.borderLeft = '0.1875em solid #81C98F';
  }
});

nav.addEventListener('mouseover', (e) => {
  if (smallScreen.matches) {
    if (e.target.className === 'nav-items') {
      firstNavItem.removeAttribute('style');
    }
  } else if (mediumScreen.matches) {
    if (e.target.className === 'nav-items') {
      firstNavItem.removeAttribute('style');
    }
  }
});

// Alert Banner
alertM.innerHTML =
  `<div class="alert-banner">
      <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
      to complete</p>
      <p class="alert-banner-close">&#10005;</p>
    </div>`

alertM.addEventListener('click', (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertM.style.display = "none";
  }
});

// data for line graph chart
let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(174, 175, 227, 0.4)',
    borderColor: 'rgba(116, 119, 191, 3)',
    borderWidth: 1,
    pointRadius: '9',
    pointBackgroundColor: 'rgba(255, 255, 255, 1)',
    pointBorderWidth: 2,
    pointHoverRadius: 13,
    pointHoverBorderWidth: 3,
    lineTension: 0
  }]
};

let trafficOptions = {
  aspectRatio: 2.5,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  responsive: true,
  type: 'line',
  data: trafficData,
  options: trafficOptions
});

// Random data each time one of traffic nav links is clicked
chartNav.addEventListener('click', (e) => {
  function randomData() {
    trafficData.datasets[0].data = []
    for (let i = 0; i < 11; i++) {
      let randomNum = Math.floor(Math.random() * 2500) + 1;
      trafficData.datasets[0].data.push(randomNum);
    }
  }

  // Random points on the graph * However, I'm not sure how to make this work properly. The function does work, but the graph doesn't get updated correctly. *
  // function randomLabelPoints () {
  //   x = Math.floor(Math.random() * 40) + 1;
  //   if (x < 10) {
  //     return x = "0" + x.toString();
  //   } else {
  //     return x.toString();
  //   }
  // }
  //
  // function splitLetters(str, n) {
  //   newLabel = [];
  //   for (let i = 0; i < str.length; i+=n) {
  //     newLabel.push(str.substring(i, i+n))
  //   }
  //   return newLabel;
  // }
  //
  // function randomLabels() {
  //   trafficData.labels.splice(0, 11);
  //   let newStr = "";
  //   for (let i = 0; i < 11; i++) {
  //   newStr += randomLabelPoints();
  //   newStr += "-";
  //   newStr += randomLabelPoints();
  //   }
  //   return trafficData.labels.push(splitLetters(newStr, 5));
  // }


  if (e.target.className === 'traffic-nav-link' || e.target.className === 'traffic-nav-link active') {
    // randomLabels();
    randomData();
    trafficChart.update();
  }
});

traffic.addEventListener('click', (e) => {
  if (e.target.className === 'traffic-nav-link') {
    for (let i = 0; i < trafficNav.length; i++) {
      if (trafficNav[i].getAttribute('class').includes('active')) {
        trafficNav[i].classList.remove('active');
      }
    }
    e.target.classList.add('active');
  }
});


// data for daily traffic bar chart
const dailyData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  dataset: [{
      label: '# of Hits',
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
      borderWidth: 1
  }]
};

const dailyOptions = {
  sacles: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  },
  legend: {
    display: false
  }
}

let dailyChart = new Chart(dailyCanvas, {
  responsive: true,
  type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: '# of Hits',
            data: [75, 115, 175, 125, 225, 200, 100],
            backgroundColor: '#7477BF',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
          display: false
        }
    }
});


// data for doughnut chart
const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ]
  }]
};

const mobileOptions = {
  legend: {
    postion: 'right',
    labels: {
      boxWidth: 20,
      fontStyle: 'bold'
    }
  }
}

let mobileChart = new Chart(mobileCanvas, {
  responsive: true,
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

// Autocomplete Search
userInput.addEventListener('input', () => {
  autocompleteList.innerHTML = '';
  let output = [];
  let userInputValue = userInput.value.toLowerCase();
  for (let i = 0; i < userInputValue.length; i++) {
    for (let j = 0; j < members.length; j++) {
      if (members[j].toLowerCase().indexOf(userInputValue) === 0 && output.indexOf(members[j]) === -1) {
        output.push(members[j]);
      }
    }
  }

  if (output.length >= 1) {
    autocompleteList.style.visibility = 'visible';
    autocompleteList.style.display = 'block';
    for (let i = 0; i < output.length; i++) {
      const buttonLink = document.createElement('button');
      buttonLink.classList.add('autocp-choices');
      buttonLink.innerHTML = output[i];
      autocompleteList.appendChild(buttonLink);
     }
  } else {
    autocompleteList.style.visibility = 'hidden';
    autocompleteList.style.display = 'none';
    autocompleteList.innerHTML = '';
  }
});

result.addEventListener('click', (e) => {
  if (e.target.className === 'autocp-choices') {
    userInput.value = e.target.textContent;
    autocompleteList.style.visibility = 'hidden';
    autocompleteList.innerHTML = '';
  }
});

messageForm.addEventListener('keydown', (e) => {
  const autocp = document.querySelectorAll('.autocp-choices');
  if (autocp.length > 0) {
    if (e.key === 'Enter') {
      userInput.value = e.target.textContent;
      autocompleteList.style.visibility = 'hidden';
      autocompleteList.innerHTML = '';
    } else if (e.key === 'ArrowUp') {
      if (document.activeElement !== autocompleteList.firstElementChild) {
        document.activeElement.classList.remove('focus');
        document.activeElement.previousElementSibling.classList.add('focus');
        document.activeElement.previousElementSibling.focus();
      }
    } else if (e.key === 'ArrowDown') {
        if (document.activeElement === userInput) {
          document.activeElement.nextElementSibling.firstElementChild.classList.add('focus');
          document.activeElement.nextElementSibling.firstElementChild.focus();
        }  else if (document.activeElement !== autocompleteList.lastElementChild) {
          document.activeElement.classList.remove('focus');
          document.activeElement.nextElementSibling.classList.add('focus');
          document.activeElement.nextElementSibling.focus();
        }
      }
    }
});



// Validate User's Input
send.addEventListener('click', () => {
  if (userInput.value === '' && message.value === '') {
    alert("Please fill out user and message fields before sending");
  } else if (userInput.value === '') {
    alert("Please fill out user field before sending");
  } else if (message.value === '') {
    alert("Please fill out message field before sending")
  } else {
    alert(`Message succesfully sent to: ${userInput.value}`);
  }
});

// Get saved settings from localStorage
settings.addEventListener('click', () => {
  if (emailSetting.checked) {
    localStorage.setItem('email_value', true);
  } else {
    localStorage.setItem('email_value', false);
  }

  if (profileSetting.checked) {
    localStorage.setItem('profile_value', true);
  } else {
    localStorage.setItem('profile_value', false);
  }
});

document.addEventListener('change', () => {
  selectedTimeZone = timeZone.selectedIndex;
  localStorage.setItem('timezone', selectedTimeZone);
});

document.addEventListener('DOMContentLoaded', () => {
  selectedTimeZone = localStorage.getItem('timezone');
  emailValue = localStorage.getItem('email_value');
  profileValue = localStorage.getItem('profile_value');

  for (let i = 0; i < timeZone.length; i++) {
    if (i === parseInt(selectedTimeZone)) {
      timeZone[i].setAttribute('selected', '');
    }
  }

  if (emailValue === 'true') {
    emailSetting.checked = true;
  } else {
    emailSetting.checked = false;
  }

  if (profileValue === 'true') {
    profileSetting.checked = true;
  } else {
    profileSetting.checked = false;
  }
});
