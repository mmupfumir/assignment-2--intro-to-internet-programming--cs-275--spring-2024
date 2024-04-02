let body = document.querySelector(`body`);
let albumTitles = document.getElementsByClassName(`album-name`);
let artistNames = document.getElementsByClassName(`artist-name`);
let photoCredit = document.getElementsByClassName(`photo-credit`);
let reviewContent = document.getElementsByClassName(`review-content`);
let reviewCredit = document.getElementsByClassName(`review-credit`);

let pos = -20;

window.onload = function(){
    items();
};

function items(data) {
    UpdateArrows();
    for(let i =0; i < albumTitles.length; i++)
    {
        albumTitles[i].textContent = data.album[i].album;
        artistNames[i].textContent = data.album[i].artist;
        artistNames[i].href = data.album[i].url;
        photoCredit[i].textContent = `Credit: `+data.album[i].cover_image.credit;
        photoCredit[i].href = data.album[i].cover_image.url;
        reviewContent[i].textContent = data.album[i].review.content;
        reviewCredit[i].textContent = `-`+data.album[i].review.source;
        reviewCredit[i].href = data.album[i].review.url;

    }
}

document.addEventListener(`keydown`, function(event){

    if(event.keyCode === 37 && pos!=-2060)
    {
        pos=pos-680;
        document.documentElement.style.setProperty(`--slides-position`, pos+`px`);
        UpdateArrows();
    }
    if(event.keyCode === 39 && pos!=-20)
    {
        pos=pos+680;
        document.documentElement.style.setProperty(`--slides-position`, pos+`px`);
        UpdateArrows();
    }
});

let leftArrow = document.querySelector(`nav a:nth-child(1)`);
leftArrow.addEventListener(`click`, function() {
    if(pos!=-2060)
    {
        leftArrow.style.display = `inline-block`;
        pos=pos-680;
        document.documentElement.style.setProperty(`--slides-position`, pos+`px`);
    }
    UpdateArrows();
});

let rightArrow = document.querySelector(`nav a:nth-child(2)`);
rightArrow.addEventListener(`click`, function() {
    if(pos!=20)
    {
        pos=pos+680;
        document.documentElement.style.setProperty(`--slides-position`, pos+`px`);
    }
    UpdateArrows();
});

function UpdateArrows() {
    if(pos==-20)
    {
        rightArrow.style.visibility = `hidden`;
    }
    else
        rightArrow.style.visibility = `visible`;

    if(pos==-2060){
        leftArrow.style.visibility = `hidden`;
    }
    else
        leftArrow.style.visibility = `visible`;

}

for(let i=0; i<4;i++)
{
    UpdateArrows();
    let carouselSlidesPos = document.querySelector(`.carousel-slides`);

    let albumDiv = document.createElement(`div`); //album start
    albumDiv.setAttribute(`class`, `album`);
    carouselSlidesPos.appendChild(albumDiv);

    let topHeaders = document.createElement(`header`);
    albumDiv.appendChild(topHeaders);

    let albumNameHeader = document.createElement(`h2`); //header 2
    albumNameHeader.setAttribute(`class`, `album-name`);
    topHeaders.appendChild(albumNameHeader);

    let artistNameHeader = document.createElement(`h3`); //header 3
    topHeaders.appendChild(artistNameHeader);

    let artistAnchor = document.createElement(`a`); //anchor for header 3
    artistAnchor.href = `filler`;
    artistAnchor.classList.add(`artist-name`);
    artistNameHeader.appendChild(artistAnchor);

    let photoDiv = document.createElement(`div`); //album photo div
    photoDiv.setAttribute(`class`, `album-photo`);
    albumDiv.appendChild(photoDiv);

    let creditHeader = document.createElement(`header`);
    albumDiv.appendChild(creditHeader);

    let photoCreditHeader = document.createElement(`h4`);//header 4
    creditHeader.appendChild(photoCreditHeader);

    let photoCreditAnchor = document.createElement(`a`);
    photoCreditAnchor.href = `filler`;
    photoCreditAnchor.classList.add(`photo-credit`);
    photoCreditHeader.appendChild(photoCreditAnchor);

    let reviewParagraph = document.createElement(`p`);
    reviewParagraph.classList.add(`review-content`);
    albumDiv.appendChild(reviewParagraph);

    let bottomHeader = document.createElement(`header`);
    albumDiv.appendChild(bottomHeader);

    let reviewCreditHeader = document.createElement(`h5`);
    bottomHeader.appendChild(reviewCreditHeader);

    let reviewCredAnchor = document.createElement(`a`);
    reviewCredAnchor.href = `filler`;
    reviewCredAnchor.classList.add(`review-credit`);
    reviewCreditHeader.appendChild(reviewCredAnchor);
}

let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);
body.appendChild(script);
