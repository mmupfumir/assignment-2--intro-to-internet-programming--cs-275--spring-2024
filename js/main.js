document.addEventListener("DOMContentLoaded", function () {
    const jsonpUrl = '/data.json'; // url for JSONP data
    let currentIndex = 0; // index of current displayed image
    window.jsonpcallback = function (data) {
        createCarouselSlides(data); // create carousel slides
    }

    // create carousel slides based on the data
    const createCarouselSlides = (data) => {
        const carouselslides = document.querySelector('.carousel-slides');

        if (!carouselslides) {
            console.error('Carousel slides container not found');
            return;
        }
        carouselslides.innerHTML = ''; // Clears the existing carousel slides

        if (!data || !Array.isArray(data)) {
            console.error('Invalid data format');
            return;
        }
        data.forEach(album => {
            // Creates image element for each one of the albums
            const img = document.createElement('img')
            img.src = album.cover_image.path;
            img.alt = album.cover_image.alt_content;
            carouselslides.appendChild(img);
        });

        currentIndex = 0
    }

    // loads up the JSONP data
    const loadJSONP = () => {
        const script = document.createElement('script');
        script.src = `${jsonpUrl}?callback=jsonpcallback`;
        document.body.appendChild(script)
    }
    loadJSONP()

    // handle navigation
    const navigatetolastimages = () => {
        const carouselSlides = document.querySelector('.carousel-slides');
        const slidesCount = carouselSlides.children.length

        if (slidesCount <= 1) {
            return // for if there is one slide or less
        }
        currentIndex = (currentIndex - 1 + slidesCount) % slidesCount;
        updatedisplayimg(carouselSlides)
    }

    //handle navigation
    const navigatetonextimages = () => {
        const carouselslides = document.querySelector('.carousel-slides');
        const slidesCount = carouselslides.children.length

        if (slidesCount <= 1) {
            return // same as before, one slide or less
        }
        currentIndex = (currentIndex + 1) % slidesCount
        updatedisplayimg(carouselslides)
    }

    // updates the display
    const updatedisplayimg = (carouselSlides) => {
        const slides = carouselSlides.children

        for (let i = 0; i < slides.length; i++) {
            // show slides based on currentIndex
            slides[i].style.display = (i === currentIndex) ? 'block' : 'none'
        }
    };
    document.querySelector('.prev').addEventListener('click', navigatetolastimages);
    document.querySelector('.next').addEventListener('click', navigatetonextimages);
})
