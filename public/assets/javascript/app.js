function getScrapedArticles() {

    $(".articles-wrapper").empty();
    // Grab the scraped articles as a json
    $.getJSON("/scrape", function(data) {
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
            
            var saveButton = $('<button class= "btn btn-primary save-article">');
                saveButton.text('Save Article');
            // headElement.text(data[i].headline);
            // headElement.attr("href", data[i].link)
            headElement.append(titleElement);
            headElement.append(saveButton);

            $(".articles-wrapper").append(headElement);
            
            // Display the article summary on the page
            $(".articles-wrapper").append("<p class = 'article-summary'>" + data[i].summary + "</p>");
        }
        $(".modal-body").text(data.length + " Articles Added!");
        $('#myModal').modal('show'); 
    });
}

$("#scrape-new").on('click', function(){
    getScrapedArticles();
});

$(document).on('click', '.save-article', function(){
    var selected = $(this).parent().children('h2').children('a');
    
    var article = {
        headline: selected.text(),
        link: selected.attr('href'),
        summary: $(this).parent().next().text()
    }   
    
    $.ajax({
        type: "POST",
        url: "/save",
        dataType: "json",
        data: article
    })
    .then(function(data) {
        console.log(data);
    });
})
