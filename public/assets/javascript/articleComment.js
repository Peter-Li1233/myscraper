// // Grab the articles as a json
// $.getJSON("/api/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $(".articles-wrapper").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "</p>");
//     }
//   });

function getSavedArticles() {

    $(".savedArticles-wrapper").empty();
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
                notesButton.attr('data-id', data[i]._id);
                notesButton.text('Article Notes');
            var deleteButton = $('<button class= "btn btn-danger article-delete">');
                deleteButton.attr('data-id', data[i]._id);
                deleteButton.text('Delete From Saved');
            // headElement.text(data[i].headline);
            // headElement.attr("href", data[i].link)
            headElement.append(titleElement);
            headElement.append(notesButton);
            headElement.append(deleteButton);

            $(".savedArticles-wrapper").append(headElement);
            
            // Display the article summary on the page
            $(".savedArticles-wrapper").append("<p class = 'article-summary'>" + data[i].summary + "</p>");
        }
        // $(".modal-body").text(data.length + " Articles Added!");
        // $('#myModal').modal('show'); 
    });
}

    getSavedArticles();

$(document).on('click', '.article-delete', function() {
    console.log($(this).attr('data-id'));
    var thisId = $(this).attr('data-id');
    $.ajax({
        method: "DELETE",
        url: "/api/articles/" + thisId
    }).then(function(data) {
        console.log(data);
        getSavedArticles();
    });
});

$(document).on('click', '.article-notes', function() {
    var thisId = $(this).attr('data-id');
    $.ajax({
        method: "GET",
        url:    "/api/articles/" + thisId
    }).then(function(article) {
        $(".modal-title").text("Comments for Article: " + article._id);
        var modalBody = $('#secondModalBody');
            modalBody.empty();
        var commentElement =$('<div id="comments">');
            commentElement.attr('data-id', article._id);
            modalBody.append(commentElement);

        if(article.comment) {
            var commentArr = article.comment;
            for (var i = 0; i < commentArr.length; i++) {
                // ...populate #commentss with a p-tag that includes the comment's body and object id
                commentElement.prepend("<p class='comment-entry d-flex' data-id=" + commentArr[i]._id + "><span class='comment-body mr-auto' data-id=" +
                  commentArr[i]._id + ">" + commentArr[i].body + "</span><button class='delete btn btn-info'>x</button></p>");
              }
        } else {
            modalBody.append("<h3> No Comments for this article yet! </h3>");
        }
      
        // ModalForm html
        // -------------------------------------------
        var commentForm = $('<div>');
        commentForm.addClass("md-form mb-5");
        
        var formInput = $('<textarea>');
        formInput.addClass('form-control');
        formInput.attr('id', "comment-input");
        formInput.attr('rows', 4);
        
        var formLabel =$('<label>');
        formLabel.attr('for', "comment-input");
        formLabel.text('comments:');

        commentForm.append(formLabel);
        commentForm.append(formInput);

        $('#submit').attr('data-id', thisId);
        // -------------------------------------------
        
        modalBody.append(commentForm);

        // $(".modal-body").text(article.headline);
        $('#mySecondModal').modal('show'); 
    });
});

$('#submit').on('click', function(event) {
    event.preventDefault();

    var thisId = $(this).attr('data-id');
    console.log(thisId)

    $.ajax({
        method: "POST",
        url: "/api/comments/" + thisId,
        data: {
          // Value taken from comment textarea
          body: $("#comment-input").val()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
        //   $("#notes").empty();
        });

});

// When user clicks the delete button for a comment
$(document).on("click", ".delete", function() {
    // Save the p tag that encloses the button
    console.log(this);
    var selected = $(this).parent();
    // Make an AJAX GET request to delete the specific note
    // this uses the data-id of the p-tag, which is linked to the specific note
    var articleId = selected.parent().attr("data-id");
    var commentId = selected.attr("data-id");

    console.log(articleId);
    console.log(commentId);
    var url = "/deletenote?articleId=" +articleId +"&commentId=" + commentId;
    console.log(url);
    $.ajax({
      type: "GET",
      url: url,
  
      // On successful call
      success: function(response) {
        // Remove the p-tag from the DOM
        selected.remove();
      }
    });
  });