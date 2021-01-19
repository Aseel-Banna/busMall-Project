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

var imageName= [];
var votes=[];
var shown=[];
var previousIndexs= [];

var previousLeftIndex = -1;
var previousRightIndex = -1;
var previousCenterIndex = -1;


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
    imageName.push(name);
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
divImage.addEventListener('click', imageListener);


// Declaration of functions

function generateRandomIndex() {
   return  Math.floor(Math.random() * (imageBusArray.length));
}

function renderImages() {
    previousIndexs = [previousLeftIndex, previousRightIndex, previousCenterIndex];

    previous();

    console.log('Array: ',previousIndexs);

    imageBusArray[leftImageIndex].imageShownNum++;
    imageBusArray[rightImageIndex].imageShownNum++;
    imageBusArray[centerImageIndex].imageShownNum++;

    leftImage.src = imageBusArray[leftImageIndex].source;
    centerImage.src = imageBusArray[centerImageIndex].source;
    rightImage.src = imageBusArray[rightImageIndex].source;

}

function previous(){
    do {
        leftImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(leftImageIndex));

    previousLeftIndex = leftImageIndex;
    previousIndexs.push(leftImageIndex);

    do {
        rightImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(rightImageIndex));

    previousRightIndex = rightImageIndex;
    previousIndexs.push(rightImageIndex);
    

    do {
        centerImageIndex = generateRandomIndex();
    }while(previousIndexs.includes(centerImageIndex));

    previousCenterIndex = centerImageIndex;
}

function submitForm(){
    attempts= document.getElementById('userInput').value;
    console.log(attempts);
    getData();
    return attempts;
}

function saveData(){
    var insertedRounds = JSON.stringify(imageBusArray);
    localStorage.setItem('rounds', insertedRounds);
}

function getData(){
    var list = localStorage.getItem('rounds');
    var listJS = JSON.parse(list);
    if (listJS){
        imageBusArray= listJS;
    }
    
    renderImages();
    console.log(listJS);
  //  return listJs;
}

function imageListener(event) {
    console.log(userAttempts);

    if (userAttempts < attempts ) {
        if (event.target.id === 'left-image') {
            imageBusArray[leftImageIndex].productClicked++;
            userAttempts++;
            renderImages();
        } else if (event.target.id === 'rigth-image') {
            imageBusArray[rightImageIndex].productClicked++;
            userAttempts++;
            renderImages();
        } else if(event.target.id === 'center-image') {
            imageBusArray[centerImageIndex].productClicked++;
            userAttempts++;
            renderImages();
        }else{
            console.log('after if is finished');
        }
            
        

     }//else{
    // showResult.disabled = false;
    // }
    saveData();
}

function showFinalResult(){

    var resultsList = document.getElementById('result-list');
        var finalResult;
        getData();
        for (var i = 0; i < imageBusArray.length; i++) {
            finalResult = document.createElement('li');
            finalResult.textContent = imageBusArray[i].name + ' has been shown ' +
            imageBusArray[i].imageShownNum + ' times and has been clicked ' +
            imageBusArray[i].productClicked + ' times.';
            resultsList.appendChild(finalResult);

        }

        divImage.removeEventListener('click', imageListener);
        
        showChart();
        
}

function showChart(){
    //getData();
    for (var i=0; i< imageBusArray.length; i++){
        votes.push(imageBusArray[i].productClicked);
        shown.push(imageBusArray[i].imageShownNum);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: imageName,
        datasets: [{
            label: 'Votes',
            backgroundColor: 'rgb(197, 168, 124)',
            borderColor: 'rgb(	83,	46,	28)',
            data: votes
        },
        {
            label: 'Views',
            backgroundColor: 'rgb(83,	46,	28)',
            borderColor: 'rgb(	197, 168, 124)',
            data: shown
        }
    ]
    },

    // Configuration options go here
    options: {
        legend: {
        fontColor: "white"},
        scales: {
            yAxes: [{
                fontColor: "brown",
                fontSize: 12,
                ticks: {
                    max: 10,
                    min: 0,
                    beginAtZero: 0,
                    stepSize: 2,
                }
        }],

    }}
});

    chart.config.data.datasets[0].data = votes;
    chart.canvas.parentNode.style.color = 'black';
}

    