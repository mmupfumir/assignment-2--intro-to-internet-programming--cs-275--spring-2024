let body = document.querySelector(`body`);
let imgOne = document.createElement(`img`);
let imgTwo = document.createElement(`img`);
let imgThree = document.createElement(`img`);
let imgFour = document.createElement(`img`);
let artistOne = document.createElement(`h2`);
let artistTwo = document.createElement(`h2`);
let artistThree = document.createElement(`h2`);
let artistFour = document.createElement(`h2`);
let parentDiv = document.createElement(`div`);
let section = document.createElement(`section`);
let contentOne = document.createElement(`p`);
let contentTwo = document.createElement(`p`);
let contentThree = document.createElement(`p`);
let contentFour = document.createElement(`p`);
let creditOne = document.createElement(`p`);
let creditTwo = document.createElement(`p`);
let creditThree = document.createElement(`p`);
let creditFour = document.createElement(`p`);
let arrows = document.querySelectorAll(`.carousel-navigation img`);
let leftArrow = arrows[0];
let rightArrow = arrows[1];
let incrementMargin = 640;
let decrementMargin = -640;
let currentMargin = 0;
const multipleDIV = `<div class = "child-div"></div><div class = "child-div"></div><div class = "child-div"></div><div class = "child-div"></div>`;
const albumReviewsContainer = [];

let insertParentDiv = () => {
    parentDiv.setAttribute(`class`, `master-div`);
    section.innerHTML = multipleDIV;
    parentDiv.appendChild(section);
    body.appendChild(parentDiv);
};

<<<<<<< Updated upstream
const albumReviewsContainer = [];
insertParentDiv();

=======
>>>>>>> Stashed changes
let list = (data) => {

    albumReviewsContainer.push(data.track[0]);
    albumReviewsContainer.push(data.track[1]);
    albumReviewsContainer.push(data.track[2]);
    albumReviewsContainer.push(data.track[3]);

    let childDIV = document.getElementsByClassName(`child-div`);
    let childDIVOne = childDIV[0];
    let childDIVTwo = childDIV[1];
    let childDIVThree = childDIV[2];
    let childDIVFour = childDIV[3];

    imgOne.setAttribute(`class`, `album-image`);
    imgOne.setAttribute(`src`,`${albumReviewsContainer[0].cover_image.path}`);
    imgOne.setAttribute(`alt`, `${albumReviewsContainer[0].cover_image.alt_content}`);

    imgTwo.setAttribute(`class`, `album-image`);
    imgTwo.setAttribute(`src`,`${albumReviewsContainer[1].cover_image.path}`);
    imgTwo.setAttribute(`alt`, `${albumReviewsContainer[1].cover_image.alt_content}`);

    imgThree.setAttribute(`class`, `album-image`);
    imgThree.setAttribute(`src`,`${albumReviewsContainer[2].cover_image.path}`);
    imgThree.setAttribute(`alt`, `${albumReviewsContainer[2].cover_image.alt_content}`);

    imgFour.setAttribute(`class`, `album-image`);
    imgFour.setAttribute(`src`,`${albumReviewsContainer[3].cover_image.path}`);
    imgFour.setAttribute(`alt`, `${albumReviewsContainer[3].cover_image.alt_content}`);

    artistOne.innerHTML = `${albumReviewsContainer[0].album}<br><a href = ${albumReviewsContainer[0].url}>${albumReviewsContainer[0].artist}</a>`;
    artistTwo.innerHTML = `${albumReviewsContainer[1].album}<br><a href = ${albumReviewsContainer[1].url}>${albumReviewsContainer[1].artist}</a>`;
    artistThree.innerHTML = `${albumReviewsContainer[2].album}<br><a href = ${albumReviewsContainer[2].url}>${albumReviewsContainer[2].artist}</a>`;
    artistFour.innerHTML = `${albumReviewsContainer[3].album}<br><a href = ${albumReviewsContainer[3].url}>${albumReviewsContainer[3].artist}</a>`;

    contentOne.innerHTML = albumReviewsContainer[0].review.content;
    contentTwo.innerHTML = albumReviewsContainer[1].review.content;
    contentThree.innerHTML = albumReviewsContainer[2].review.content;
    contentFour.innerHTML = albumReviewsContainer[3].review.content;

    creditOne.innerHTML = `<a href = ${albumReviewsContainer[0].review.url}>-${albumReviewsContainer[0].review.source}</a>`;
    creditTwo.innerHTML = `<a href = ${albumReviewsContainer[1].review.url}>-${albumReviewsContainer[1].review.source}</a>`;
    creditThree.innerHTML = `<a href = ${albumReviewsContainer[2].review.url}>-${albumReviewsContainer[2].review.source}</a>`;
    creditFour.innerHTML = `<a href = ${albumReviewsContainer[3].review.url}>-${albumReviewsContainer[3].review.source}</a>`;

    creditOne.setAttribute(`class`, `credit`);
    creditTwo.setAttribute(`class`, `credit`);
    creditThree.setAttribute(`class`, `credit`);
    creditFour.setAttribute(`class`, `credit`);

    childDIVTwo.appendChild(artistTwo);
    childDIVTwo.appendChild(imgTwo);
    childDIVTwo.appendChild(contentTwo);
    childDIVTwo.appendChild(creditTwo);

    childDIVOne.appendChild(artistOne);
    childDIVOne.appendChild(imgOne);
    childDIVOne.appendChild(contentOne);
    childDIVOne.appendChild(creditOne);

    childDIVThree.appendChild(artistThree);
    childDIVThree.appendChild(imgThree);
    childDIVThree.appendChild(contentThree);
    childDIVThree.appendChild(creditThree);

    childDIVFour.appendChild(artistFour);
    childDIVFour.appendChild(imgFour);
    childDIVFour.appendChild(contentFour);
    childDIVFour.appendChild(creditFour);
};

let modifyMarginLeft = () => {
    const sectionElement = document.querySelector(`section`);
    if(currentMargin == -1920){
        currentMargin = 0;
    } else {
        currentMargin += decrementMargin;
    }
    sectionElement.style.marginLeft = `${currentMargin}px`;
    console.log(`modify margin left`);
    console.log(`currentMargin Value: ${currentMargin}`);
};

let modifyMarginRight = () => {
    const sectionElement = document.querySelector(`section`);
    if(currentMargin == 0){
        currentMargin = -1920;
    } else {
        currentMargin += incrementMargin;
    }
    sectionElement.style.marginLeft = `${currentMargin}px`;
    console.log(`modify margin right`);
    console.log(`currentMargin Value: ${currentMargin}`);
};

window.onload = () => {
    let script = document.createElement(`script`);
    leftArrow.addEventListener(`click`,modifyMarginLeft);
    rightArrow.addEventListener(`click`, modifyMarginRight);
    document.addEventListener(`keydown`, (event) => {
        const sectionElement = document.querySelector(`section`);

        if (event.key == `ArrowRight`) {
            if(currentMargin == 0){
                currentMargin = -1920;
            } else {
                currentMargin += incrementMargin;
            }
            sectionElement.style.marginLeft = `${currentMargin}px`;
            console.log(`modify margin right`);
            console.log(`currentMargin Value: ${currentMargin}`);

        } else if (event.key == `ArrowLeft`) {
            if(currentMargin == -1920){
                currentMargin = 0;
            } else {
                currentMargin += decrementMargin;
            }
            sectionElement.style.marginLeft = `${currentMargin}px`;
            console.log(`modify margin left`);
            console.log(`currentMargin Value: ${currentMargin}`);
        }
    });
    script.setAttribute(`src`, `json/data.json`);
    body.appendChild(script);
};
