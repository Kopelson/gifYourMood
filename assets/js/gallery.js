$(document).ready(function() {
    // DOM manipullation fill the gallery with GIFs
    function renderGallery() {
        $("#galleryPics").empty()

        const gifsArray = JSON.parse(localStorage.getItem("gifs"));
        console.log(gifsArray);
        gifsArray.forEach(function(index) {
            let img = $("<img>");
            img.attr("src", index);
            let divCard = $("<div>");
            let divHolder = $("<div>");
            let divContainer = $("<div>");
            divCard.addClass("uk-card uk-card-default uk-card-body");
            divContainer.addClass("uk-grid-medium uk-child-width-expand@s uk-text-center");
            divCard.append(img);
            divHolder.append(divCard);
            divContainer.append(divHolder);
            let main = $("#galleryPics");
            main.append(divContainer);

            // remove a gif ftom local storage
            // align the gifs functionality



        })

    }
    renderGallery();

});