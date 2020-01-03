$(document).ready(function() {
  $(document).foundation();

  displayStories();

  $(document).on("click", ".comment", function() {
    const comment = {};
    comment.user = "guest";
    comment.text = $(`textarea#${$(this).attr("data")}`).val();
    comment.articleID = $(this).attr("data");
    console.log(comment);
    $.ajax({
      url: "/comment",
      method: "POST",
      data: comment
    }).then(function(response) {
      console.log(response);
    });
    window.location.reload();
  });

  $(document).on("click", ".show-comments", function() {
    const articleID = $(this).attr("data");

    $(`.comments[data="${articleID}"`).toggle();
  });

  $(document).on("click", ".delete-comment", function() {
    const commentID = $(this).attr("data");

    $.ajax({
      url: "/delete",
      method: "DELETE",
      data: { id: commentID }
    }).then(function(response) {
      console.log(response);
    });
    window.location.reload();
  });

  $("#scrape").on("click", function() {
    $.ajax({
      url: "/scrape",
      method: "GET"
    }).then(function(response) {
      console.log(response);
      window.location.reload();
    });
  });
});

function displayStories() {
  $.get("/all").then(function(data) {
    data.forEach(function(article) {
      const item = `<div class="callout"><h5>${
        article.title
      }<span class="date">${article.created_at}</span></h5>
              <p>${article.description}</p>
              <a href="${
                article.link
              }"type="button" class="success button">Read more!</a>
              <textarea id="${article._id}"></textarea>
              <a href="#" class="button comment" data='${
                article._id
              }'>Leave a comment</a>
              <a href="#" class="button show-comments" data='${
                article._id
              }'>Show Comments (${article.comments.length})</a>
              ${addComments(article.comments, article._id)}
              </div>
              </div>`;

      $("#content").append(item);
    });
  });
}

function addComments(array, id) {
  let output = `<div class="comments grid-container" data="${id}">

`;
  array.reverse().map(function(item) {
    output += `<div class=callout small">
                      <h6> ${item.user} said:</h6>
                          <p> ${item.text} </p>
                      
                       <button class="close-button delete-comment" aria-label="Close alert" type="button" data-close data="${item._id}">
                          <span aria-hidden="true">&times;</span>
                        </button>
                  </div>`;
  });
  output += "</div>";

  return output;
}
