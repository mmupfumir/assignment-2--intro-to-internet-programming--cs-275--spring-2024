let body = document.querySelector(`body`);
let carouselViewport = document.getElementsByClassName(`carousel-slides`)[0];
let slideRoll = document.createElement(`section`);

// This function populates the carousel with information from the JSONP file
function information(data) {
    // This loop iterates through each entry to create the slides of the carousel
    for (let element = 0; element < data.length; element++) {
        let slide = document.createElement(`div`);
        slide.setAttribute(`class`, `slide`);
        let album = document.createElement(`h2`);
        album.innerHTML = data[element].album;
        album.style.textAlign = `center`;
        slide.appendChild(album);
        let artist = document.createElement(`p`);
        artist.innerHTML = data[element].artist;
        artist.style.textAlign = `center`;
        slide.appendChild(artist);
        let image = document.createElement(`img`);
        image.setAttribute(`src`, data[element].cover_image.path);
        slide.appendChild(image);
        let imgCredit = document.createElement(`p`);
        imgCredit.innerHTML = `Credit: <a href=${data[element].cover_image.url}>${data[element].cover_image.credit}</a>`;
        imgCredit.style.textAlign = `center`;
        slide.appendChild(imgCredit);
        let review = document.createElement(`div`);
        let reviewContent = document.createElement(`p`);
        reviewContent.textContent = data[element].review.content;
        review.appendChild(reviewContent);
        let reviewCredit = document.createElement(`p`);
        reviewCredit.innerHTML = `&#x97<a href=${data[element].review.url}>${data[element].review.source}</a>`;
        review.appendChild(reviewCredit);
        review.style.height = `269px`;
        slide.appendChild(review);
        slideRoll.appendChild(slide);
    }
}

// Append the carousel slides to the viewport in index.html
carouselViewport.appendChild(slideRoll);

/* carouselMargin keeps track of the margin being manipulated;
carouselMarginChange keeps track of how we uniformly change it.*/
let carouselMargin = 0, carouselMarginChange = -680;
let leftArrow = document.getElementsByTagName(`a`)[0];
let rightArrow = document.getElementsByTagName(`a`)[1];
rightArrow.style.display = `none`; // Hides the right arrow when it cannot be used at page load

leftArrow.addEventListener(`click`, (event) => {
    if (carouselMargin > (3 * carouselMarginChange)) {
        carouselMargin += carouselMarginChange;
        slideRoll.style.marginLeft = `${carouselMargin}px`;
        rightArrow.style.display = `inline`; // Reveals the right arrow if it is hidden
    }
    if (carouselMargin == (3 * carouselMarginChange)) {
        leftArrow.style.display = `none`; // Hides the left arrow when it cannot be used
    }
    event.preventDefault();
});

rightArrow.addEventListener(`click`, (event) => {
    if (carouselMargin < 0) {
        carouselMargin -= carouselMarginChange;
        slideRoll.style.marginLeft = `${carouselMargin}px`;
        leftArrow.style.display = `inline`; // Reveals the left arrow if it is hidden
    }
    if (carouselMargin == 0) {
        rightArrow.style.display = `none`; // Hides the right arrow when it cannot be used
    }
    event.preventDefault();
});

// Repeat earlier event listeners for arrow keys
window.addEventListener(`keydown`, (event) => {
    // Left arrow
    if (event.keyCode == 37) {
        if (carouselMargin > (3 * carouselMarginChange)) {
            carouselMargin += carouselMarginChange;
            slideRoll.style.marginLeft = `${carouselMargin}px`;
            rightArrow.style.display = `inline`;
        }
        if (carouselMargin == (3 * carouselMarginChange)) {
            leftArrow.style.display = `none`;
        }
    }
    // Right arrow
    if (event.keyCode == 39) {
        if (carouselMargin < 0) {
            carouselMargin -= carouselMarginChange;
            slideRoll.style.marginLeft = `${carouselMargin}px`;
            leftArrow.style.display = `inline`;
        }
        if (carouselMargin == 0) {
            rightArrow.style.display = `none`;
        }
    }
});

let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);
body.appendChild(script);
