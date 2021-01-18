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

var genarateIndex= [];


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
    var allowed;
    var index ;
   if (genarateIndex.length !== 0){
        do{
         index= Math.floor(Math.random() * (imageBusArray.length));
         allowed=true;
         for(var i=0; i< genarateIndex.length; i++){
             if (genarateIndex[i] === index){
                 allowed= false;
             }
         }
        } while (!allowed);
    }else{ index= Math.floor(Math.random() * (imageBusArray.length));}
    return index;
}



function renderImages() {
    leftImageIndex = generateRandomIndex();
    

    do{ 
       
        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();
        if (leftImageIndex === rightImageIndex ){
            rightImageIndex = generateRandomIndex();
        }
        if (centerImageIndex === rightImageIndex && centerImageIndex === leftImageIndex){
           centerImageIndex = generateRandomIndex();
        } 
        console.log(genarateIndex);
        genarateIndex=[];

    } while(leftImageIndex === rightImageIndex || leftImageIndex === centerImageIndex ||
         rightImageIndex === centerImageIndex);

         //console.log(leftImageIndex, rightImageIndex, centerImageIndex );
        //  if (genarateIndex.length !== 0){
        //     sure();
        // }
        console.log(leftImageIndex, rightImageIndex, centerImageIndex );
    

    // while (leftImageIndex === rightImageIndex || leftImageIndex === centerImageIndex || 
    //     centerImageIndex === rightImageIndex) {

    //     rightImageIndex = generateRandomIndex();
    //     centerImageIndex = generateRandomIndex();
    //     // leftImageIndex = generateRandomIndex();
    // }



     genarateIndex.push(leftImageIndex);
     genarateIndex.push(centerImageIndex);
     genarateIndex.push(rightImageIndex);

    

     

     console.log('Array: ',genarateIndex);

    

     

    // for (var c=0; c<=genarateIndex.length+1; c++){
    // genarateIndex.pop(c);
    //  }

    console.log('After Poping',genarateIndex );
    imageBusArray[leftImageIndex].imageShownNum++;
    imageBusArray[rightImageIndex].imageShownNum++;
    imageBusArray[centerImageIndex].imageShownNum++;

    leftImage.src = imageBusArray[leftImageIndex].source;
    centerImage.src = imageBusArray[centerImageIndex].source;
    rightImage.src = imageBusArray[rightImageIndex].source;

}

  function sure(){
   for (var c=0; c<genarateIndex.length; c++){
    if (genarateIndex[c] === leftImageIndex || genarateIndex[c] === rightImageIndex ||  
        genarateIndex[c] === centerImageIndex){
        leftImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
        centerImageIndex = generateRandomIndex();
     }
 }
}

function submitForm(){
    attempts= document.getElementById('userInput').value;
    console.log(attempts);
    return attempts;
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
            
        

    }else{
    showResult.disabled = false;
    }
}

function showFinalResult(){

    var resultsList = document.getElementById('result-list');
        var finalResult;
        
        for (var i = 0; i < imageBusArray.length; i++) {
            finalResult = document.createElement('li');
            finalResult.textContent = imageBusArray[i].name + ' has been shown ' +
            imageBusArray[i].imageShownNum + ' times and has been clicked ' +
            imageBusArray[i].productClicked + ' times.';
            resultsList.appendChild(finalResult);
        }

        divImage.removeEventListener('click', imageListener);

        for (var i=0; i< imageBusArray.length; i++){
            votes.push(imageBusArray[i].productClicked);
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: imageName,
            datasets: [{
                label: 'The Result',
                width: 'auto',
                height: '50px',
                backgroundColor: 'rgb(197, 168, 124)',
                borderColor: 'rgb(	83,	46,	28)',
                data: votes
            }]
        },

        // Configuration options go here
        options: {}
    });
    
        chart.config.data.datasets[0].data = votes;
        

}



    