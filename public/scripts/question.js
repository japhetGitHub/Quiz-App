$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")
  let quizLen = 0;

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let current_question = 1;

  const loadQuestions = () => {
    const id = $("#quiz-id").text()
    console.log(id);
    $.ajax({
      url: `http://localhost:8080/quiz/${id}/data`,
      method: "GET",
      dataType: "json",
      success: (questions) => {
        quizLen = questions.quiz.length;
        renderQuestions(questions.quiz);
        showCurrentQuestion();
        registerOptions();
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadQuestions();

  const createQuestionElement = (question) => {
    const markup = `
    <div class="trying" id="question-${question.id}">
    <div id="choice-submit">
      <article id="question-choices" class="questionchoices" data-id="${question.id}">
        <div class="question">
          <span> ${question.question} </span>
        </div>
        <div class="choices">
          <button id="btn1" > ${question.choice_1} </button>
          <button id="btn2" > ${question.choice_2} </button>
          <button id="btn3" > ${question.choice_3} </button>
          <button id="btn4" > ${question.choice_4} </button>
        </div>
      </article>
    </div>
    </div>
    `
    return markup;
  }

  const renderQuestions = function(questions) {
    const $questionsContainer = $("#questions-container");
    $questionsContainer.empty();
    //console.log(questions)
    for (const question of questions) {
      const $question = createQuestionElement(question);
      $questionsContainer.append($question);
    }
  }

  /*
  const hideQuestions = function(len) {
    const question = $(".trying").attr("data-id");
    console.log(question)
    for (let i = 0; i < len; i++) {
      if
    }
  }
  */
  const showCurrentQuestion = function() {
    console.log(quizLen)
    for (let i = 1; i <= quizLen; i++) {
      const question = $(`#question-${i}`)
      if (i === current_question) {
        question.show();
      } else {
        question.hide();
      }
    }
  }
  /*
  const hideTweets = function () {
    $(".trying").each(function () {
      //console.log("something")
      $(this).hide()
      //console.log("this is this ", $(this))
      const id = $(this).attr("data-id")
      //console.log("This is the id", id);
      const first_id = $(".trying").attr("data-id");
      if (id === first_id) {
        $(this).show();
      }
    })
  }
  */

  // AJAX req for the quiz (NOTE: quiz will have quiz_id, questions, question_ids, question_answers, etc)
  // then insert question data into mockup ONE at a time upon each press of 'next question' button and display the follow-up question


  // ALTERNATIVE
  // AJAX reqs for the quiz. receive JSON { quiz }
    // compare the answers to the user_answers and evaluate if true/false
    //create an array of all the answers and send this true/false array to the POST /quiz/:id route endpoint
  let user_answers = [];
  const registerOptions = function () {
    $('#btn1, #btn2, #btn3, #btn4').click(function () {
      //console.log($(this).text());
      console.log("hello")
      let user_answer = $(this).text();
      user_answer = user_answer.slice(0,8);
      user_answer = user_answer.toLowerCase();
      user_answer = user_answer.split(" ").join("_");
      // compare user_answer to the hidden element which holds the question answer
      user_answers.push(user_answer);
      current_question = current_question + 1;
      showCurrentQuestion();
      console.log(user_answers)
    })
  }

  const next_question = function () {
    $("#choice-submit").on("submit", function (event) {
      event.preventDefault();
      const current_question = $(this).find(".questionchoices:visible");
      console.log()
      console.log(id);
      //console.log(current_question)
      const next_question = current_question.next()
      //console.log(next_question)
      if (next_question.length) {
        current_question.hide()
        next_question.show()
      } else {
        //alert("finished quiz")
        console.log(user_answers)
        // create ajax request POST for user_answers
      }
    })
  }

});
