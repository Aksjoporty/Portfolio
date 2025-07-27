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

function loadVideoGallery() {
    var category = "videos";

    fetch("gallery.json")
        .then(response => response.json())
        .then(data => {
            if (!data[category]) {
                console.error(`❌ Error: Category "${category}" not found in JSON.`);
                return;
            }

            var $gallery = $("#videoGallery");
            var vidsToAppend = '';

            data[category].forEach(url => {
                let imgUrl = url.replace("images/videos/", "images/videosThumbs/");
                imgUrl = imgUrl.replace(".mp4", ".jpg");
                vidsToAppend += `<img alt='HTML5 video' data-type='html5video' data-image="${imgUrl}" data-videomp4="${url}" data-description=''>`;
            });

            if (vidsToAppend) {
                $gallery.append(vidsToAppend);
            }
            $gallery.unitegallery({
                gallery_theme: "slider",
                slider_video_ratio: 16 / 9,
                gallery_autoplay: false,
                gallery_carousel: false,
                slider_enable_arrows: true,
                slider_enable_bullets: true
            });

            AOS.refresh();
        })
}