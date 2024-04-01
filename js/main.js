const body = document.querySelector(`body`);
const carouselSlides = document.getElementsByClassName(`carousel-slides`)[0];
const header = document.querySelector(`header`);
const nav = document.querySelector(`nav`);
const arrow1 = document.querySelectorAll(`a`)[0];
const arrow2 = document.querySelectorAll(`a`)[1];

function albums(data) {
    console.log(`test to see if works`);
    let index = 0;
    let header1 = document.createElement(`h2`);
    header.appendChild(header1);
    header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
    carouselSlides.innerHTML = data.album[index].review.content;
    let section = document.querySelectorAll(`section`)[0];
    arrow1.addEventListener(`click`, () => {
        switch(index) {
            case 0:
                section.style.marginLeft = `-640px`;
                index = 1;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
            case 1:
                section.style.marginLeft = `-1280px`;
                index = 2;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
            case 2:
                section.style.marginLeft = `-1920px`;
                index = 3;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
        }
    });
    arrow2.addEventListener(`click`, () => {
        switch(index) {
            case 3:
                section.style.marginLeft = `-1280px`;
                index = 2;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
            case 2:
                section.style.marginLeft = `-640px`;
                index = 1;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
            case 1:
                section.style.marginLeft = `0`;
                index = 0;
                header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                carouselSlides.innerHTML = data.album[index].review.content;
                break;
        }
    });
    document.addEventListener(`keydown`, () => {
        const key = event.key;
        switch (key) {
            case `ArrowLeft`:
                switch(index) {
                    case 0:
                        section.style.marginLeft = `-640px`;
                        index = 1;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                    case 1:
                        section.style.marginLeft = `-1280px`;
                        index = 2;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                    case 2:
                        section.style.marginLeft = `-1920px`;
                        index = 3;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                }
                break;
            case `ArrowRight`:
                switch(index) {
                    case 3:
                        section.style.marginLeft = `-1280px`;
                        index = 2;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                    case 2:
                        section.style.marginLeft = `-640px`;
                        index = 1;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                    case 1:
                        section.style.marginLeft = `0`;
                        index = 0;
                        header1.innerHTML = data.album[index].album + ` - ` + data.album[index].artist;
                        carouselSlides.innerHTML = data.album[index].review.content;
                        break;
                }
        }
    });
}

const imageDiv = document.createElement(`div`);
imageDiv.setAttribute(`class`,`image-div`);
const section = document.createElement(`section`);
section.setAttribute(`class`, `image-section`);
imageDiv.appendChild(section);
const image1 = document.createElement(`img`);
const image2 = document.createElement(`img`);
const image3 = document.createElement(`img`);
const image4 = document.createElement(`img`);
image1.setAttribute(`src`, `img/12392240423_1ebe6a740d_z.jpg`);
image2.setAttribute(`src`, `img/10835562453_30f4918d69_z.jpg`);
image3.setAttribute(`src`, `img/15022059070_3a7dde293e_z.jpg`);
image4.setAttribute(`src`, `img/60260329_b2194b7366_z.jpg`);
nav.insertBefore(imageDiv, arrow2);
section.appendChild(image1);
section.appendChild(image2);
section.appendChild(image3);
section.appendChild(image4);

let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);
body.appendChild(script);
