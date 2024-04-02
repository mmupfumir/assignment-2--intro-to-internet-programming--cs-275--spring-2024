document.addEventListener(`DOMContentLoaded`, () => {
    const carousel = document.querySelector(`.carousel-slides`);
    const leftArrow = document.querySelector(`.carousel-navigation a:first-child`);
    const rightArrow = document.querySelector(`.carousel-navigation a:last-child`);
    const slideWidth = 640; // Width of each slide including padding

    let currentPosition = 0;

    // Fetch data from data.json
    fetch(`json/data.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const slide = document.createElement(`div`);
                slide.classList.add(`carousel-slide`);
                slide.innerHTML = `
                    <img src="${item.cover_image.path}" alt="${item.cover_image.alt_content}">
                    <h2>${item.artist}</h2>
                    <h3>${item.album}</h3>
                    <p>${item.review.content}</p>
                    <a href="${item.review.url}" target="_blank">Read more</a>
                `;
                carousel.appendChild(slide);
            });
        })
        .catch(error => console.error(`Error fetching data:`, error));

    leftArrow.addEventListener(`click`, () => {
        currentPosition = Math.max(currentPosition - slideWidth, 0);
        carousel.style.transform = `translateX(-${currentPosition}px)`;
    });

    rightArrow.addEventListener(`click`, () => {
        currentPosition = Math.min(currentPosition + slideWidth, (carousel.children.length - 1) * slideWidth);
        carousel.style.transform = `translateX(-${currentPosition}px)`;
    });
});


















