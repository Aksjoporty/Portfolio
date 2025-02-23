function fetchGalleryImages(category) {
    fetch("gallery.json")
        .then(response => response.json())
        .then(data => {
            if (!data[category]) {
                console.error(`❌ Error: Category "${category}" not found in JSON.`);
                return;
            }

            loadGallery(category, data);
        })
}

function loadGallery(category, data) {
    var $gallery = $("#gallery");
    var imgsToAppend = '';

    data[category].forEach(url => {
        imgsToAppend += `<img alt='' src="${url}" data-image="${url}" data-description=''>`;
    });

    if (imgsToAppend) {
        $gallery.append(imgsToAppend);
    }
    $gallery.unitegallery({
        gallery_theme: "tiles",
        lightbox_overlay_opacity: 0.95,
        tiles_type: "justified",
        tiles_justified_row_height: 300,
        tiles_space_between_cols: 10,
        tiles_justified_space_between: 10,
        tile_overlay_color: "#ff00088b",
    });

    AOS.refresh();
}