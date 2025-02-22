function fetchGalleryImages(folderPath, category, container) {
    fetch(folderPath)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            const imageLinks = Array.from(doc.querySelectorAll("a"))
                .map(link => link.getAttribute("href"))
                .filter(href => href && href.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                .map(imageName => folderPath + imageName);

            imageLinks.forEach(imagePath => {
                const img = new Image();
                img.src = imagePath;

                img.onload = function () {
                    console.log(`Loaded image: ${imagePath} (${img.naturalWidth}x${img.naturalHeight})`);

                    const cont = document.querySelector(container);
                    if (cont) {
                        cont.innerHTML += `
                            <div class="item ${category} col-md-4">
                                <a href="${imagePath}" class="image-link">
                                    <img class="portfolio-img" src="${imagePath}" class="img-fluid" alt="image" />
                                </a>
                            </div>`;
                    } else {
                        console.error("Container does not exist!");
                    }
                };

                img.onerror = function () {
                    console.error(`Failed to load image: ${imagePath}`);
                };
            });
        })
        .catch(error => {
            console.error("Error loading images:", error);
        });
}

function calculateResponsiveSizes(originalWidth, originalHeight, breakpoints) {
    let aspectRatio = originalWidth / originalHeight;
    let rwdData = {
        width: {
            "rwdMode_1": Math.round(originalWidth * breakpoints[0]),
            "rwdMode_2": Math.round(originalWidth * breakpoints[1]),
            "rwdMode_3": Math.round(originalWidth * breakpoints[2]),
            "rwdMode_4": Math.round(originalWidth * breakpoints[3])
        },
        height: {
            "rwdMode_1": Math.round((originalWidth * breakpoints[0]) / aspectRatio),
            "rwdMode_2": Math.round((originalWidth * breakpoints[1]) / aspectRatio),
            "rwdMode_3": Math.round((originalWidth * breakpoints[2]) / aspectRatio),
            "rwdMode_4": Math.round((originalWidth * breakpoints[3]) / aspectRatio)
        }
    };

    return JSON.stringify(rwdData).replace(/"/g, "&quot;");  // Convert quotes for HTML
}

function loadGallery(imagePaths, galleryElementId)
{
    const galleryElement = document.getElementById(galleryElementId);
    if (!galleryElement) return;

    imagePaths.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = function ()
        {
            const wrapper = document.createElement("div");
            wrapper.classList.add("lightbox_wrapper");

            wrapper.innerHTML = `
                <div class="image_lightbox_outer_wrapper">
                    <div class="image_lightbox_inner_wrapper">
                        <div class="image_lightbox_container">
                            <a class="lightbox_image" data-lightbox="gallery" href="${imagePath}" 
                                data-width="${img.naturalWidth}" data-height="${img.naturalHeight}">
                                <img data-lazy-load-src="${imagePath}" data-used-webp-image="false">
                            </a>
                        </div>
                    </div>
                </div>
            `;
            const targetElement = document.querySelector(`#${galleryElementId} .ww_lightbox`);
            if (targetElement) {
                targetElement.appendChild(wrapper);
            }
        };
    });
}