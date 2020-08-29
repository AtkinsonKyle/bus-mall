'use strict';

var section = document.getElementById('results');
var imgElOne = document.getElementById('image-one');
var imgElTwo = document.getElementById('image-two');
var imgElThree = document.getElementById('image-three');
var clicksAllowed = 25;
var numberOfClicks = 0;
var renderArray = [];
var imgArray = [];

function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}

new Picture('bag', 'images/bag.jpg');
new Picture('banana', 'images/banana.jpg');
new Picture('bathroom', 'images/bathroom.jpg');
new Picture('boots', 'images/boots.jpg');
new Picture('breakfast', 'images/breakfast.jpg');
new Picture('bubblegum', 'images/bubblegum.jpg');
new Picture('chair', 'images/chair.jpg');
new Picture('cthulu', 'images/cthulhu.jpg');
new Picture('dog-duck', 'images/dog-duck.jpg');
new Picture('dragon', 'images/dragon.jpg');
new Picture('pen', 'images/pen.jpg');
new Picture('pet-sweep', 'images/pet-sweep.jpg');
new Picture('scissors', 'images/scissors.jpg');
new Picture('shark', 'images/shark.jpg');
new Picture('sweep', 'images/sweep.png');
new Picture('tauntaun', 'images/tauntaun.jpg');
new Picture('unicorn', 'images/unicorn.jpg');
new Picture('usb', 'images/usb.gif');
new Picture('water-can', 'images/water-can.jpg');
new Picture('wine-glass', 'images/wine-glass.jpg');

renderImages();

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createRenderArray() {
  while (renderArray.length > 0) {
    renderArray.pop();
  }
  while (renderArray.length < 3) {
    var i = randomNumber(imgArray.length);
    while (renderArray.includes(i)) {
      i = randomNumber(imgArray.length);
    }
    renderArray.push(i);
  }
}
function renderImages() {
  createRenderArray();
  var imgOne = imgArray[renderArray[0]];
  var imgTwo = imgArray[renderArray[1]];
  var imgThree = imgArray[renderArray[2]];

  imgElOne.alt = imgOne.name;
  imgElOne.src = imgOne.src;

  imgElTwo.alt = imgTwo.name;
  imgElTwo.src = imgTwo.src;

  imgElThree.alt = imgThree.name;
  imgElThree.src = imgThree.src;

  imgOne.viewed++;
  imgTwo.viewed++;
  imgThree.viewed++;
}

function eventHandler(e) {
  console.log('e', e);
  console.log(e.target.alt);

  numberOfClicks++;

  for (var i = 0; i < imgArray.length; i++) {
    if (imgArray[i].name === e.target.alt) {
      imgArray[i].clicked++;
    }
  }
  renderImages();

  if (numberOfClicks === clicksAllowed) {
    imgElOne.removeEventListener('click', eventHandler);
    imgElTwo.removeEventListener('click', eventHandler);
    imgElThree.removeEventListener('click', eventHandler);

    for(i = 0; i < imgArray.length; i++) {
      var imageClickedAmount = document.createElement('ul');
      imageClickedAmount.textContent = `${imgArray[i].name}, clicked ${imgArray[i].clicked} times, viewed ${imgArray[i].viewed} times.`;
      section.appendChild(imageClickedAmount);
    }
  }
}

imgElOne.addEventListener('click', eventHandler);
imgElTwo.addEventListener('click', eventHandler);
imgElThree.addEventListener('click', eventHandler);

