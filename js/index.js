'use strict';

// global variables
var allImages = [];
var renderQueue = [];
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var myContainer = document.getElementById('container');
var myList = document.getElementById('list');
var clicks = 0;
var maxClicksAllowed = 25;

//constructor
function Img(name, src) {
  this.name = name;
  this.src = src;
  this.viewed = 0;
  this.clicked = 0;
  allImages.push(this);
}

var retrieveImgs = localStorage.getItem('savedImgs');

if (retrieveImgs) {
  allImages = JSON.parse(retrieveImgs);
} else {
  new Img('bag', 'images/bag.jpg');
  new Img('banana', 'images/banana.jpg');
  new Img('bathroom', 'images/bathroom.jpg');
  new Img('boots', 'images/boots.jpg');
  new Img('breakfast', 'images/breakfast.jpg');
  new Img('bubblegum', 'images/bubblegum.jpg');
  new Img('chair', 'images/chair.jpg');
  new Img('cthulu', 'images/cthulhu.jpg');
  new Img('dog-duck', 'images/dog-duck.jpg');
  new Img('dragon', 'images/dragon.jpg');
  new Img('pen', 'images/pen.jpg');
  new Img('pet-sweep', 'images/pet-sweep.jpg');
  new Img('scissors', 'images/scissors.jpg');
  new Img('shark', 'images/shark.jpg');
  new Img('sweep', 'images/sweep.png');
  new Img('tauntaun', 'images/tauntaun.jpg');
  new Img('unicorn', 'images/unicorn.jpg');
  new Img('usb', 'images/usb.gif');
  new Img('water-can', 'images/water-can.jpg');
  new Img('wine-glass', 'images/wine-glass.jpg');
}

//helper functions
//1 random index
function getRandomIndex(max) {
  // var num = Math.floor(Math.random() * Math.floor(allImages.length));
  // return num;
  return Math.floor(Math.random() * max);
}
//2 create render queue
function createRenderQueue() {
  while (renderQueue.length > 3) {
    renderQueue.pop();
  }
  while (renderQueue.length < 6) {
    var i = getRandomIndex(allImages.length);
    while (renderQueue.includes(i)) {
      i = getRandomIndex(allImages.length);
    }
    renderQueue.unshift(i);
  }
  console.log(renderQueue);
}

//3 renderImages
function renderImages() {
  createRenderQueue();

  var randImgOne = allImages[renderQueue[0]];
  var randImgTwo = allImages[renderQueue[1]];
  var randImgThree = allImages[renderQueue[2]];

  imgElOne.src = randImgOne.src;
  imgElOne.alt = randImgOne.name;
  randImgOne.viewed++;


  imgElTwo.src = randImgTwo.src;
  imgElTwo.alt = randImgTwo.name;
  randImgTwo.viewed++;

  imgElThree.src = randImgThree.src;
  imgElThree.alt = randImgThree.name;
  randImgThree.viewed++;
}

//4 renderList
function renderList() {
  for (var i = 0; i < allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allImages[i].name} had ${allImages[i].clicked} votes and was shown ${allImages[i].viewed} times`;
    myList.appendChild(liEl);
  }
}
//5 renderChart
function renderChart() {
  var imgNames = [];
  var clicksData = [];
  var viewsData = [];
  for (var i = 0; i < allImages.length; i++) {
    imgNames.push(allImages[i].name);
    clicksData.push(allImages[i].clicked);
    viewsData.push(allImages[i].viewed);
  }


  var chartData = {
    type: 'bar',
    data: {
      labels: imgNames, // change this to names of the pic array
      datasets: [{
        label: '# of Clicks',
        data: clicksData, // change this to the clicks
        backgroundColor: '#grey',
        hoverBackgroundColor: '#green',
        borderColor: '#white',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: viewsData, // change this to the views
        backgroundColor: '#black',
        hoverBackgroundColor: '#red',
        borderColor: '#white',
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, chartData);
}

//event handler
function handleClick(event) {
  clicks++;
  var clickedItem = event.target.alt;

  for (var i = 0; i < allImages.length; i++) {
    if (clickedItem === allImages[i].name) {
      allImages[i].clicked++;
    }
  }

  renderImages();

  if (clicks === maxClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderList();
    renderChart();
    addToLocalStorage();
  }
}

function addToLocalStorage() {
  var stringifyAllImgs = JSON.stringify(allImages);
  localStorage.setItem('savedImg', stringifyAllImgs);
}

//document clicks
//rerender images
// render list
//render chart
// set local storage

// executable code
//1 instantiantions of img objects


renderImages();

//2 render images function

//event listener
myContainer.addEventListener('click', handleClick);
