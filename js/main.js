let body = document.querySelector(`body`);
let carouselslides = document.getElementsByClassName(`carousel-slides`)[0];

let navigation = document.getElementsByClassName(`carousel-navigation`);
navigation = navigation[0].children;

let arrowtoL = navigation[0];
arrowtoL.setAttribute(`id`, `arrow-to-left`);

let arrowtoR = navigation[1];
arrowtoR.setAttribute(`id`, `arrow-to-right`);

function albumData(data){

    let index = 0;
    const slideWidth = -660;

    for(let i in data.slide){
        let webSlide = document.createElement(`div`);
        webSlide.setAttribute(`id`, `web-slide`);
        carouselslides.appendChild(webSlide);

        let albumInfo = document.createElement(`p`);
        albumInfo.textContent = data.slide[i].album;
        albumInfo.setAttribute(`id`, `album-info`);
        webSlide.appendChild(albumInfo);


        let artistInfo = document.createElement(`p`);
        artistInfo.setAttribute(`id`, `artist-info`);
        webSlide.appendChild(artistInfo);
        artistInfo.innerHTML = `<a href="${data.slide[i].url}">${data.slide[i].artist}</a>`;

        let pictureInfo = document.createElement(`img`);
        pictureInfo.setAttribute(`id`, `picture-info`);
        webSlide.appendChild(pictureInfo);

        pictureInfo.setAttribute(`src`, data.slide[i].cover_image.path);
        pictureInfo.setAttribute(`alt`, data.slide[i].cover_image.alt_content);
        pictureInfo.setAttribute(`width`, data.slide[i].cover_image.width);
        pictureInfo.setAttribute(`hight`, data.slide[i].cover_image.height);

        let albumCredit = document.createElement(`p`);
        albumCredit.setAttribute(`id`, `album-credit`);
        webSlide.appendChild(albumCredit);
        albumCredit.innerHTML = `Credit:<a href="${data.slide[i].cover_image.credit}">${data.slide[i].cover_image.credit}</a>`;

        let musicDescription = document.createElement(`p`);
        musicDescription.textContent = data.slide[i].review.content;
        musicDescription.setAttribute(`id`, `music-description`);
        webSlide.appendChild(musicDescription);

        let musicAuthor = document.createElement(`p`);
        musicAuthor.setAttribute(`id`, `music-author`);
        webSlide.appendChild(musicAuthor);
        musicAuthor.innerHTML = `-<a href="${data.slide[i].review.url}">${data.slide[i].review.source}</a>`

    }

    arrowtoR.addEventListener(`click`, () => {
        if(index > 0) {
            arrowtoL.style.visibility = `visible`;
            index--;
            carouselslides.style.marginLeft = slideWidth * index + `px`;
            if(index === 0){
                arrowtoR.style.visibility = `hidden`;
            }
        }
    });


    document.addEventListener(`keydown`, (k) => {
        if(k.code === `arrow-to-right`){
            if(index > 0) {
                arrowtoL.style.visibility = `visible`;
                index--;
                carouselslides.style.marginLeft = slideWidth * index + `px`;
                if(index === 0){
                    arrowtoR.style.visibility = `hidden`;
                }
            }
        }
    });

    arrowtoL.addEventListener(`click`, () => {
        if(index < carouselslides.children.length - 1) {
            arrowtoR.style.visibility = `visible`;
            index++;
            carouselslides.style.marginLeft = slideWidth * index + `px`;
            if(index === carouselslides.children.length -1){
                arrowtoL.style.visibility = `hidden`;
            }
        }
    });

    document.addEventListener(`keydown`, (k) => {
        if(k.code === `arrow-to-left`){
            if(index < carouselslides.children.length - 1) {
                arrowtoR.style.visibility = `visible`;
                index++;
                carouselslides.style.marginLeft = slideWidth * index + `px`;
                if(index === carouselslides.children.length -1){
                    arrowtoL.style.visibility = `hidden`;
                }
            }
        }
    });
}


let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);
body.appendChild(script);
