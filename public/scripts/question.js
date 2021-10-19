$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")

  // escape function for troublesome tweets
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /*
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
      $questionsContainer.prepend($question);
    }
  }

  const loadQuestions = () => {

    $.ajax({
      url: "/quiz/1",
      method: "GET",
      dataType: "json",
      success: (quiz) => {
        console.log(quiz)
        renderQuestions(quiz);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadQuestions();
  */

  $(".questionchoices").each(function () {
    $(this).hide()
    const id = $(this).attr("data-id")
    //console.log(id);
    const first_id = $(".questionchoices").attr("data-id");
    if (id === first_id) {
      $(this).show();
    }
  })
  let user_answers = [];
  $('#btn1, #btn2, #btn3, #btn4').click(function () {
    //console.log($(this).text());
    let user_answer = $(this).text();
    user_answer = user_answer.slice(0,8);
    user_answer = user_answer.toLowerCase();
    user_answer = user_answer.split(" ").join("_");
    user_answers.push(user_answer);
    console.log(user_answers)
  })
  $("#choice-submit").on("submit", function (event) {
    event.preventDefault();
    //let val = $("#btn1").value;
    //console.log(val);
    //let x = document.getElementById("#btn1").value;
    //console.log(x);
    //console.log(this)
    const current_question = $(this).find(".questionchoices:visible");
    //console.log(current_question)
    const next_question = current_question.next()
    //console.log(next_question)
    if (next_question.length) {
      current_question.hide()
      next_question.show()
    } else {
      alert("finished quiz")
    }
  })
});


/*
<% for (const question of quiz) { %>
        <article id="question-choices">
          <div class="question">
            <span>
              <%= question.question %>
            </span>
          </div>
          <form method="POST" action="/quiz/:id">
            <div class="choices">
              <button type="submit">Option 1: <%= question.choice_1 %></button>
              <button type="submit">Option 2: <%= question.choice_2 %></button>
              <button type="submit">Option 3: <%= question.choice_3 %></button>
              <button type="submit">Option 4: <%= question.choice_4 %></button>
            </div>
          </form>
        </article>
        <%}%>
*/
