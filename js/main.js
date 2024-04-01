document.addEventListener(`DOMContentLoaded`, function () {
    const carouselSlides = document.querySelector(`.carousel-slides`);
    const prevButton = document.querySelector(`.prev`);
    const nextButton = document.querySelector(`.next`);

    fetch(`json/data.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const slide = document.createElement(`div`);
                slide.classList.add(`slide`);

                const image = document.createElement(`img`);
                image.setAttribute(`src`, item.cover_image.path);
                image.setAttribute(`alt`, item.cover_image.alt_content);
                image.setAttribute(`width`, item.cover_image.width);

                const album = document.createElement(`p`);
                album.textContent = item.album;

                const artist = document.createElement(`h2`);
                artist.textContent = item.artist;

                const reviewContent = document.createElement(`p`);
                reviewContent.textContent = item.review.content;

                const reviewSource = document.createElement(`p`);
                reviewSource.textContent = `- ` + item.review.source;

                const creditLink = document.createElement(`a`);
                creditLink.textContent = `Credit: ` + item.cover_image.credit;
                creditLink.setAttribute(`href`, item.review.url);

                slide.appendChild(album);
                slide.appendChild(artist);
                slide.appendChild(image);
                slide.appendChild(creditLink);
                slide.appendChild(reviewContent);
                slide.appendChild(reviewSource);

                carouselSlides.appendChild(slide);

                let currentIndex = 0;
                const totalSlides = document.querySelectorAll(`.slide`).length;
                const slideWidth = 640;

                const showSlide = (index) => {
                    currentIndex = (index + totalSlides) % totalSlides;
                    carouselSlides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                };

                const showNextSlide = () => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    showSlide(currentIndex);
                };

                const showPrevSlide = () => {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    showSlide(currentIndex);
                };

                const handleKeyDown = (event) => {
                    if (event.key === `ArrowLeft`) {
                        showPrevSlide();
                    } else if (event.key === `ArrowRight`) {
                        showNextSlide();
                    }
                };

                prevButton.addEventListener(`click`, showPrevSlide);
                nextButton.addEventListener(`click`, showNextSlide);
                document.addEventListener(`keydown`, handleKeyDown);

                showSlide(currentIndex);
            });
        })
        .catch(error => console.error(`Error fetching data:`, error));
});
