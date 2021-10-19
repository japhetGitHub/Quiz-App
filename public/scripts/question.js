$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")

  // escape function for troublesome tweets
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadQuestions = () => {

    $.ajax({
      url: "/quiz/:id",
      method: "GET",
      dataType: "json",
      success: (questions) => {
        renderQuestions(questions);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadQuestions();

  const createQuestionElement = (question) => {
    const markup = `
    <article id="question-choices">
      <div class="question">
        <span>
          <${question.question}>
        </span>
      </div>
      <form method="POST" action="/quiz/:id">
        <div class="choices">
          <button type="submit">${question.choice_1}</button>
          <button type="submit">${question.choice_2}</button>
          <button type="submit">${question.choice_3}</button>
          <button type="submit">${question.choice_4}</button>
        </div>
      </form>
    </article>
    `
    return markup;
  }

  const renderQuestions = function(questions) {
    const $questionsContainer = $("#questions-container");
    $questionsContainer.empty();

    for (const question of questions) {
      const $question = createQuestionElement(question)
      $questionsContainer.prepend($tweet);
    }
  }
});
