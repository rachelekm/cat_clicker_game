'use strict';

//model
let totalClicks = 0;
let catData = [
    {name: 'Inge',
    photoURL: 'https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    photoAlt: 'Photo of Inge the Cat',
    clickNum: 0},
    {name: 'Kelvin',
    photoURL: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    photoAlt: 'Photo of Kelvin the Cat',
    clickNum: 0},
    {name: 'Pixaby',
    photoURL: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    photoAlt: 'Photo of Pixaby the Cat',
    clickNum: 0},
    {name: 'Marko',
    photoURL: 'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    photoAlt: 'Photo of Marko the Cat',
    clickNum: 0},
    {name: 'Peng',
    photoURL: 'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    photoAlt: 'Photo of Peng the Cat',
    clickNum: 0}
];

//controller functions

function updateDataModel(newData){
    let catObject = catData[newData.index];
    catObject.name = newData.name;
    catObject.photoURL = newData.photoURL;
    catObject.clickNum = newData.clicks;
    populateCatLabel(newData.index);
}

function populateCatNames(){
    catData.map(object => $('.catNamesList').append(`<li class='catName ${catData.indexOf(object)}'>${object.name}</li>`));
}

function updateTotalClicker(){
    totalClicks++;
    $('.clickNumTotal').html(totalClicks);
}

function updateUniqueCatClicker(i){
    catData[i].clickNum++;
    $('.uniqueClicks').html(catData[i].clickNum);
}

function populateCatLabel(i){
    $('.catLabelContainer').empty();
    $('.catLabelContainer').html(`<div class='uniqueCatLabel'>${catData[i].name}</div><div class='uniqueCatCounter'>${catData[i].name}'s Clicks: <span class='uniqueClicks'>${catData[i].clickNum}</span></div>`);
}

function displayCatPhoto(i){
    $('.catPhotoContainer').empty();
    $('.catPhotoContainer').html(`<img alt='${catData[i].photoAlt}' src='${catData[i].photoURL}'>`);
}

function populateAdminPlaceholders(i){
    $('#catName').val(`${catData[i].name}`);
    $('#catURL').val(`${catData[i].photoURL}`);
    $('#catClicks').val(`${catData[i].clickNum}`);
}

//listeners:

function pageLoadListener(){
    populateCatNames();
    let clickTargetIndex;
    $('.catNamesList').on('click', '.catName', function(e){
        event.stopPropagation();
        clickTargetIndex = this.className.slice(-1);
        displayCatPhoto(clickTargetIndex);
        populateCatLabel(clickTargetIndex);
        populateAdminPlaceholders(clickTargetIndex);
    });
    $('.catPhotoContainer').on('click', 'img', function(e){
        event.stopPropagation();
        updateUniqueCatClicker(clickTargetIndex);
        updateTotalClicker();
        populateAdminPlaceholders(clickTargetIndex);
    });
    $('.resetButton').on('click', function(e){
        totalClicks=0;
        $('.catPhotoContainer').empty();
        $('.catLabelContainer').empty();
        $('.clickNumTotal').html(totalClicks);
        catData.map(object => object.clickNum = 0);
    });
    $('.adminButton').on('click', function(e){
        e.preventDefault();
        let currentToggle = $('.toggleView').css('visibility');
        if(currentToggle === 'hidden'){
            $('.toggleView').css('visibility', 'visible');
        }
        else if(currentToggle === 'visible'){
            $('.toggleView').css('visibility', 'hidden');
        }
    });
    $('form').on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        let newCatData = {};
        newCatData.index = clickTargetIndex;
        newCatData.name = $(this).find("input[name='catName']").val();
        newCatData.photoURL = $(this).find("input[name='catURL']").val();
        newCatData.clicks = $(this).find("input[name='catClicks']").val();
        updateDataModel(newCatData);
    });
    $('.cancelButton').on('click', function(e){
        event.preventDefault();
        populateAdminPlaceholders(clickTargetIndex);
        $('.toggleView').css('visibility', 'hidden');
    });
}

$(pageLoadListener);