// window.onload = () => {
//     alert(`It Works`);
// };

//Creates a node list of all body elements in HTML that could be referenced too using the body function
let body = document.querySelector(`body`);
let carouselslides = document.getElementsByClassName(`carousel-slides`)[0];

let navigation = document.getElementsByClassName(`carousel-navigation`);
navigation = navigation[0].children;

let leftArrow = navigation[0];
leftArrow.setAttribute(`id`, `left-side-arrow`);

let rightArrow = navigation[1];
rightArrow.setAttribute(`id`, `right-side-arrow`);

function jsonDataFile(data){

    //for in loop
    for (const obj in data.pages){
        let pageSlides = document.createElement('div');
        pageSlides.setAttribute(`id`, `page-slide`);

        let albumName =  document.createElement('h2');
        albumName.textContent = data.pages[obj].album;
        albumName.setAttribute(`id`, `album-name`);
        pageSlides.appendChild(albumName);

        let artistName =  document.createElement('h3');
        artistName.innerHTML = `<a href= "${data.pages[obj].url}"> ${data.pages[obj].artist}</a>`;
        artistName.setAttribute(`id`, `artist-name`);
        pageSlides.appendChild(artistName);

        let slidePicture = document.createElement(`img`);
        slidePicture.setAttribute(`src`, data.pages[obj].cover_image.path);
        slidePicture.setAttribute(`id`, `picture`);
        slidePicture.setAttribute(`alt`, data.pages[obj].cover_image.alt_content);
        slidePicture.setAttribute(`width`, data.pages[obj].cover_image.width);
        slidePicture.setAttribute(`hight`, data.pages[obj].cover_image.height);
        pageSlides.appendChild(slidePicture);

        let creditInfo = document.createElement(`p`);
        creditInfo.setAttribute(`id`, `credit-info`);
        creditInfo.innerHTML = `Credit: <a href="${data.pages[obj].cover_image.credit}">${data.pages[obj].cover_image.credit}</a>`;
        pageSlides.appendChild(creditInfo);

        let discription = document.createElement(`p`);
        discription.textContent = data.pages[obj].review.content;
        discription.setAttribute(`id`, `discription`);
        pageSlides.appendChild(discription);

        let author = document.createElement(`p`);
        author.setAttribute(`id`, `author`);
        author.innerHTML = `-<a href="${data.pages[obj].review.url}">${data.pages[obj].review.source}</a>`;
        pageSlides.appendChild(author);

        carouselslides.appendChild(pageSlides);
    }

    const width = -660;
    let indexCount = 0;
    rightArrow.style.zIndex = 3;
    leftArrow.style.zIndex = 0;

    rightArrow.addEventListener(`click`, () => {
        if(indexCount < carouselslides.children.length ) {
            leftArrow.style.zIndex = 3;
            indexCount++;
            carouselslides.style.marginLeft = width * indexCount + `px`;
            if(indexCount === carouselslides.children.length -1){
                rightArrow.style.zIndex = 0;
            }
        }
    });

    leftArrow.addEventListener(`click`, () => {
        if(indexCount > 0) {
            rightArrow.style.zIndex = 3;
            indexCount--;
            carouselslides.style.marginLeft = width * indexCount + `px`;
            if(indexCount === 0){
                leftArrow.style.zIndex = 0;
            }
        }
    });

    document.addEventListener(`keydown`, (k) => {
        if(k.code === `ArrowLeft`){
            if(indexCount > 0) {
                rightArrow.style.zIndex = 3;
                indexCount--;
                carouselslides.style.marginLeft = width * indexCount + `px`;
                if(indexCount === 0){
                    leftArrow.style.zIndex = 0;
                }
            }
        }
    });

    document.addEventListener(`keydown`, (k) => {
        if(k.code === `ArrowRight`){
            if(indexCount < carouselslides.children.length - 1) {
                leftArrow.style.zIndex = 3;
                indexCount++;
                carouselslides.style.marginLeft = width * indexCount + `px`;
                if(indexCount === carouselslides.children.length -1){
                    rightArrow.style.zIndex = 0;
                }
            }
        }
    });
}



let script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);

//saying go to the element "body" and append the last child "script"
body.appendChild(script);
