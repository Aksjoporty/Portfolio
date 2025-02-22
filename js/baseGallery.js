$('document').ready(function () {
    var folder = "images/gallery1/";
    $.ajax({
        url: folder,
        asynch: false,
        cache: false,
        success: function (data) {
            var $gallery = $("#gallery");
            var imgsToAppend = '';
            $(data).find("a").each(function (i, el) {
                var val = $(el).attr('href');
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    imgsToAppend += "<img alt='' src='" + folder + val + "' data-image='" + folder + val + "' data-description='uploaded file by user'>";
                }
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
        }
    });
});