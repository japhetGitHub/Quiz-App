$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")
  const loadTweets = () => {

    $.ajax({
      url: "/quiz/:id",
      method: "GET",
      dataType: "json",
      success: (questions) => {
        renderTweets(questions);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }

  loadTweets();
});
