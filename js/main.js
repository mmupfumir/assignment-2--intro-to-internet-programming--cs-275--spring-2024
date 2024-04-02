// window.onload = () => {
//     alert(`Test`);
// };
let body = document.querySelector(`body`);
let slides = document.getElementsByClassName(`carousel-slides`)[0];

let pagearrows = document.getElementsByClassName(`carousel-navigation`);
pagearrows = pagearrows[0].children;

let leftArrow = pagearrows[0];
leftArrow.setAttribute(`id`, `LA`);

let rightArrow = pagearrows[1];
rightArrow.setAttribute(`id`,`RA`);


function jsondata(data) {

    // Loop through the JSON data and create HTML elements for each review
    for (let index = 0; index < data.objects.length; index++) {
        let reviewDiv = document.createElement(`div`);
        reviewDiv.setAttribute(`id`, `album`);

        let artistGroup = document.createElement(`h3`);
        artistGroup.textContent = data.objects[index].album;
        artistGroup.setAttribute(`id`,`ag`);

        let artistHeading = document.createElement(`h2`);
        artistHeading.innerHTML = `<a href= "${data.objects[index].url}"> ${data.objects[index].artist}</a>`;
        artistHeading.setAttribute(`id`,`ah`);

        let coverImage = document.createElement(`img`);
        coverImage.setAttribute(`id`,`ci`);
        coverImage.setAttribute(`alt`, data.objects[index].cover_image.alt_content);
        coverImage.setAttribute(`width`, data.objects[index].cover_image.width);
        coverImage.setAttribute(`hight`, data.objects[index].cover_image.height);
        coverImage.setAttribute(`src`, data.objects[index].cover_image.path);

        let albumcredit = document.createElement(`p`);
        albumcredit.setAttribute(`id`,`ac`);
        albumcredit.innerHTML = `Credit: <a href="${data.objects[index].cover_image.credit}">
        ${data.objects[index].cover_image.credit}</a>`;

        let reviewContent = document.createElement(`p`);
        reviewContent.setAttribute(`id`,`rc`);
        reviewContent.textContent = data.objects[index].review.content;

        let sourceLink = document.createElement(`a`);
        sourceLink.setAttribute(`id`,`sl`);
        sourceLink.innerHTML = `-<a href="${data.objects[index].review.url}">${data.objects[index].review.source}</a>`;


        //  Append elements to reviewDiv
        reviewDiv.appendChild(artistHeading);
        reviewDiv.appendChild(albumcredit);
        reviewDiv.appendChild(artistGroup);
        reviewDiv.appendChild(coverImage);
        reviewDiv.appendChild(reviewContent);
        reviewDiv.appendChild(sourceLink);

        // // Append reviewDiv to reviewsContainer
        slides.appendChild(reviewDiv);
    }

}

const width = -660;
let indexCount = 0;
leftArrow.style.zIndex = 0;
rightArrow.style.zIndex = 3;


leftArrow.addEventListener(`click`,() => {
    if(indexCount > 0) {
        rightArrow.style.zIndex = 3;
        indexCount--;
        slides.style.marginLeft = width * indexCount + `px`;
        if(indexCount === 0){
            leftArrow.style.zIndex = 0;
        }
    }
});

rightArrow.addEventListener(`click`, () => {
    if(indexCount < slides.children.length ) {
        leftArrow.style.zIndex = 3;
        indexCount++;
        slides.style.marginLeft = width * indexCount + `px`;
        if(indexCount === slides.children.length -1){
            rightArrow.style.zIndex = 0;
        }
    }
});

document.addEventListener(`keydown`,(k) =>{
    if(k.code == `ArrowLeft`) {
        if(indexCount > 0){
            rightArrow.style.zIndex = 3;
            indexCount--;
            slides.style.marginLeft = width * indexCount + `px`;
            if(indexCount === 0){
                leftArrow.style.zIndex = 0;
            }
        }
    }
});
document.addEventListener(`keydown`,(k) =>{
    if(k.code == `ArrowRight`){
        if(indexCount < slides.children.length -1) {
            leftArrow.style.zIndex = 3;
            indexCount++;
            slides.style.marginLeft = width * indexCount + `px`;
            if(indexCount === slides.children.length -1){
                rightArrow.style.zIndex = 0;
            }
        }
    }
});








let scripts = document.createElement(`script`);
scripts.setAttribute(`src`, `json/data.json`);
body.appendChild(scripts);
