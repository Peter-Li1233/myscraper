// // Grab the articles as a json
// $.getJSON("/api/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $(".articles-wrapper").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p>");
//     }
//   });

function getSavedArticles() {

    $(".articles-wrapper").empty();
    // Grab the scraped articles as a json
    $.getJSON("/api/articles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the article headline on the page
            var headElement = $('<div class="headElement d-flex">');
            
            var titleElement = $('<h2>');
            
            titleElement.addClass("article-headline mr-auto");
            titleElement.append( 
                $("<a>").attr("href", data[i].link)
                .attr("target", "_blank")
                .text(data[i].headline) 
            );
            
            var notesButton = $('<button class= "btn btn-info article-notes">');
                notesButton.text('Article Notes');
            var deleteButton = $('<button class= "btn btn-danger article-delete">');
                deleteButton.attr('data-id', data[i]._id);
                deleteButton.text('Delete From Saved');
            // headElement.text(data[i].headline);
            // headElement.attr("href", data[i].link)
            headElement.append(titleElement);
            headElement.append(notesButton);
            headElement.append(deleteButton);

            $(".articles-wrapper").append(headElement);
            
            // Display the article summary on the page
            $(".articles-wrapper").append("<p class = 'article-summary'>" + data[i].summary + "</p>");
        }
        // $(".modal-body").text(data.length + " Articles Added!");
        // $('#myModal').modal('show'); 
    });
}

    getSavedArticles();