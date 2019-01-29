$(document).ready(function() {
    
    var actions = ["Piccolo", "Goku", "Gohan", "Vegeta", "Chi Chi", "Bulma", "Cell", "Master Roshi", "Frieza", "Majin Buu","Krillin", "Broly", ""];

    function displayGifButtons() {

        $("#gifDBZ").empty() ; 
        for (var i = 0; i < actions.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action") ;
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]) ;
            $("#gifDBZ").append(gifButton);
        }
    }
  
    function addNewButton() {

        $("#addGif").on("click", function(){

        var action = $("#action-input").val().trim();

        if (action == ""){
          return false; 
        }
        actions.push(action);
    
        displayGifButtons();
        return false;
        });
    }

    function removeLastButton() {

        $("removeGif").on("click", function() {
        actions.pop(action);
        displayGifButtons() ;
        return false;

        });
    }
    
    function displayGifs(){

        var action = $(this).attr("data-name") ;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=lbHWRq7b8uifq23ZGFxZMzfv64imsf9s";

        console.log(queryURL); 

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function(response) {

            console.log(response); 
            $("#gifsView").empty() ; 

            var results = response.data; 

            if (results == "") {
              alert("There is no Gif for this") ;
            }
            for (var i=0; i<results.length; i++) {
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                
                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image") ;
                gifDiv.append(gifImage);
            
                $("#gifsView").prepend(gifDiv) ;
            }
        });
    }
   
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
  
    $(document).on("click", ".action", displayGifs);
    
    $(document).on("click", ".image", function() {

        var state = $(this).attr('data-state');

        if ( state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');

        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

    });