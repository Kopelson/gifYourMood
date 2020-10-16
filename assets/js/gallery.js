//this runs when the document is loaded
$(document).ready(function() {
    //this manipulates the DOM and fill the gallery with GIF's
    function renderGallery() {
        //this empties the main tag of all elements
        $("#galleryPics").empty()
        //this creates the first div container that holds the gifs
        let divContainer = $("<div>");
        //this adds ui kit classes to create a row of items
        divContainer.addClass("uk-grid-medium uk-child-width-expand@s uk-text-center");
        //this adds the attribute uk-grid to the div element
        divContainer.attr("uk-grid", "");
        //this selects the main tag by id
        let main = $("#galleryPics");
        //this appends the new div element to the main tag
        main.append(divContainer);
        //this assigns gifsArray an array of gifs urls that are currently in local storage
        const gifsArray = JSON.parse(localStorage.getItem("gifs"));
        //this initializes a count to keep track of current gifs being added to a div container 
        let count = -1;
        //this initializes a tracker of the current div container being filled with gifs
        let currentDivContainer = divContainer;
        //this for loop loops through the gifArray
        for(let i=0; i < gifsArray.length; i++){
            //this adds one to count
            count++;
            //this creates a new img tag
            let img = $("<img>");
            //this adds a src attribute to the new img tag
            img.attr("src", gifsArray[i]);
            //this adds the class gifs to the img tag which styles the size
            img.addClass("gifs");
            //this creates a new div to hold the div holder
            let divCard = $("<div>");
            //this creates a new div to hold the img
            let divHolder = $("<div>");
            //this adds a class to the div card
            divCard.addClass("uk-card uk-card-default uk-card-body");
            //this appends the img to the div holder
            divHolder.append(img);
            //this appends the div holder to the div card
            divCard.append(divHolder);
            //this creates a span element to hold a trash icon
            let trashIcon = $("<span></span>");
            //this adds an attribute to the new span element that is UI kits trash icon
            trashIcon.attr("uk-icon","trash");
            //this adds a class to the new span element to add a click handler selector
            trashIcon.addClass("trashIcon");
            //this adds a class to the new span element to position the icon on the div card
            trashIcon.addClass("uk-position-bottom-right");
            //this appends the trash icon to the div card
            divCard.append(trashIcon);
            //this adds the logic if 3 gifs are in the current div container make a new one and fill it with remaining gifs
            if(count === 3){
                //this creates a new div element 
                let newDivContainer = $("<div>");
                //this adds the class to the new div element
                newDivContainer.addClass("uk-grid-medium uk-child-width-expand@s uk-text-center");
                //this sets the attribute of uk-grid to the new div element
                newDivContainer.attr("uk-grid", "");
                //this selects main tag by id
                let main = $("#galleryPics");
                //this appends the new div container to the main tag
                main.append(newDivContainer);
                //this changes the state of the current div container to be filled
                currentDivContainer = newDivContainer;
                //this resets the count to 0
                count = 0;
            }
            //this appends the div card to current div container
            currentDivContainer.append(divCard);
        };
    };
    //this runs the renderGallery function that updates the html with locally stored gif url's
    renderGallery(); 
    //this function will remove gifs from the gallery, update local storage with new gifs array, and render a new gallery
    function removeGif(){
        //this grabs the current gifs in local storage and stores them in gifs Array
        const gifsArray = JSON.parse(localStorage.getItem("gifs"));
        //this splices the array and removes the index of the selected gif 
        gifsArray.splice(gifsArray.indexOf(this.parentElement.children[0].children[0].src), 1);
        //this stores the gifs back into local storage without the selected gif url
        localStorage.setItem("gifs", JSON.stringify(gifsArray));
        //this renders a new gif gallery
        renderGallery();
    };
    //this adds a click handler on the document and runs removeGif function if the elements with the class trashIcon are clicked
    $(document).on("click", ".trashIcon", removeGif);    
});



    

    