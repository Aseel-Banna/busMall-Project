'use strict';


var imageBusArray = [];

var leftImageIndex;
var centerImageIndex;
var rightImageIndex;

var leftImage = document.getElementById('left-image');
var rightImage = document.getElementById('rigth-image');
var centerImage = document.getElementById('center-image');
var divImage = document.getElementById('image-div');

var attempts = 25;
var userAttempts = 0;


var btnSubmit= document.getElementById('sumbit-btn');
btnSubmit.addEventListener('click', submitForm);


var showResult= document.getElementById('show-btn');
showResult.addEventListener('click', showFinalResult);

function ImageBus(name, source) {
    this.name = name;
    this.source = source;
    this.imageShownNum = 0;
    this.productClicked = 0;
    this.userInput= 0;

    imageBusArray.push(this);
}

new ImageBus('bag', 'images/bag.jpg');
new ImageBus('banana', 'images/banana.jpg');
new ImageBus('bathroom', 'images/bathroom.jpg');
new ImageBus('boots', 'images/boots.jpg');
new ImageBus('breakfast', 'images/breakfast.jpg');
new ImageBus('bubblegum', 'images/bubblegum.jpg');
new ImageBus('chair', 'images/chair.jpg');
new ImageBus('cthulhu', 'images/cthulhu.jpg');
new ImageBus('dog-duck', 'images/dog-duck.jpg');
new ImageBus('dragon', 'images/dragon.jpg');
new ImageBus('pen', 'images/pen.jpg');
new ImageBus('pet-sweep', 'images/pet-sweep.jpg');
new ImageBus('scissors', 'images/scissors.jpg');
new ImageBus('shark', 'images/shark.jpg');
new ImageBus('sweep', 'images/sweep.png');
new ImageBus('tauntaun', 'images/tauntaun.jpg');
new ImageBus('unicorn', 'images/unicorn.jpg');
new ImageBus('usb', 'images/usb.gif');
new ImageBus('water-can', 'images/water-can.jpg');
new ImageBus('wine-glass', 'images/wine-glass.jpg');


// Calling render function

renderImages();


// Adding event Listener

leftImage.addEventListener('click', imageListener);
rightImage.addEventListener('click', imageListener);
centerImage.addEventListener('click', imageListener);
//divImage.addEventListener('click', imageListener)


// Declaration of functions

function generateRandomIndex() {
    // var index=  Math.floor(Math.random()*((max-min)+1)+min);
    var index = Math.floor(Math.random() * (imageBusArray.length));
    console.log('index', index);
    return index;
}


function renderImages() {
    leftImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
    centerImageIndex = generateRandomIndex();

    while (leftImageIndex === rightImageIndex || leftImageIndex === centerImageIndex || centerImageIndex === rightImageIndex) {

        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();
    }

    


    imageBusArray[leftImageIndex].imageShownNum++;
    imageBusArray[rightImageIndex].imageShownNum++;
    imageBusArray[centerImageIndex].imageShownNum++;



    leftImage.src = imageBusArray[leftImageIndex].source;
    centerImage.src = imageBusArray[centerImageIndex].source;
    rightImage.src = imageBusArray[rightImageIndex].source;

}

function submitForm(){
    attempts= document.getElementById('userInput').value;
    console.log(attempts);
    return attempts;
}


function imageListener(event) {
    
    // var btnSubmitValue= document.getElementById("userInput").value;   //10
    // console.log(document.getElementById("userInput").value);
    //userAttempts++;

    //console.log(userAttempts <= attempts , userAttempts <= btnSubmitValue);
    console.log(userAttempts);

    if (userAttempts < attempts ) {
        if (event.target.id === 'left-image') {
            // imageBusArray[leftImageIndex].imageShownNum++;
            imageBusArray[leftImageIndex].productClicked++;
            userAttempts++;
        } else if (event.target.id === 'right-image') {
            // imageBusArray[rigthImageIndex].imageShownNum++;
            imageBusArray[rigthImageIndex].productClicked++;
            userAttempts++;
        } else {
            // imageBusArray[centerImageIndex].imageShownNum++;
            imageBusArray[centerImageIndex].productClicked++;
            userAttempts++;
        }
        renderImages();

     }// else {
    //     var resultsList = document.getElementById('result-list');
    //     var finalResult;
    //     for (var i = 0; i < imageBusArray.length; i++) {
    //         finalResult = document.createElement('li');
    //         finalResult.textContent = imageBusArray[i].name + ' has been shown ' + imageBusArray[i].imageShownNum + ' times and has been clicked ' + imageBusArray[i].productClicked + ' times.';
    //         resultsList.appendChild(finalResult);
    //     }
    //     rightImage.removeEventListener('click', imageListener);
    //     leftImage.removeEventListener('click', imageListener);
    //     centerImage.removeEventListener('click', imageListener);

    // }
    // else{
    // showFinalResult();
    // }

}

function showFinalResult(){

    var resultsList = document.getElementById('result-list');
        var finalResult;
        for (var i = 0; i < imageBusArray.length; i++) {
            finalResult = document.createElement('li');
            finalResult.textContent = imageBusArray[i].name + ' has been shown ' + imageBusArray[i].imageShownNum + ' times and has been clicked ' + imageBusArray[i].productClicked + ' times.';
            resultsList.appendChild(finalResult);
        }
        rightImage.removeEventListener('click', imageListener);
        leftImage.removeEventListener('click', imageListener);
        centerImage.removeEventListener('click', imageListener)
}
