
$(document).ready(function() {
  // initialize variables
  let quizLen = 0;
  let current_question = 1;

  const loadQuestions = () => {
    // this is taking the quiz_id sent from router to quiz.ejs page
    const id = $("#quiz-id").text()
    // get request for all the quiz data
    $.ajax({
      url: `http://localhost:8080/quiz/${id}/data`,
      method: "GET",
      dataType: "json",
      success: (questions) => {
        // updating variables to be used inside these functions
        current_question = questions.quiz[0].id;
        quizLen = questions.quiz.length;
        renderQuestions(questions.quiz);
        showCurrentQuestion(questions.quiz);
        registerOptions(questions.quiz);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadQuestions();

  const createQuestionElement = (question) => {

    // question has choice_1, choice_2, choice_3, choice_4 properties in its object
    // if choice_x is not empty string then append a HTML button element text with the choice_x string in it
    // add all button element text from above into markup html below

    let choiceButtons = '';

    if (question.choice_1) {
      choiceButtons += ` <button class="btn btn-outline-light" id="btn1" data-val="choice_1"> ${question.choice_1} </button>`;
    }
    if (question.choice_2) {
      choiceButtons += ` <button class="btn btn-outline-light" id="btn1" data-val="choice_2"> ${question.choice_2} </button>`;
    }
    if (question.choice_3) {
      choiceButtons += ` <button class="btn btn-outline-light" id="btn1" data-val="choice_3"> ${question.choice_3} </button>`;
    }
    if (question.choice_4) {
      choiceButtons += ` <button class="btn btn-outline-light" id="btn1" data-val="choice_4"> ${question.choice_4} </button>`;
    }

    const markup = `
    <div class="trying" id="question-${question.id}">
    <div id="choice-submit">
      <article id="question-choices">
        <div class="question">
          <span> ${question.question} </span>
        </div>
        <div class="choices">
          ${choiceButtons}
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
    for (const question of questions) {
      const $question = createQuestionElement(question);
      $questionsContainer.append($question);
    }
  }

  const showCurrentQuestion = function(questions) {
    // gets the question id from table
    const starting_id = questions[0].id;
    for (let i = starting_id; i <= quizLen + starting_id; i++) {
      // checking against markup question id to show or not show
      const question = $(`#question-${i}`)
      if (i === current_question) {
        question.show();
      } else {
        question.hide();
      }
    }
  }

  let user_answers = [];
  const registerOptions = function (questions) {

    $('#btn1, #btn2, #btn3, #btn4').click(function () {
      // get answer user clicked on and check if it is correct
      const starting_id = questions[0].id;
      let user_answer = $(this).attr("data-val");
      const correct_answer = questions[current_question - starting_id].correct_answer;
      const correct = user_answer === correct_answer;
      const question_id = questions[current_question - starting_id].id;

      // add those answers to user answers array
      user_answers.push({ correct, question_id });

      // increase question by 1
      current_question = current_question + 1;

      // stopper for when user finishes quiz
      if (current_question > quizLen + starting_id - 1) {
        // get id from quiz-id ejs page
        const id = $("#quiz-id").text()
        // submit user answers with post request
        $.ajax({
          url: `http://localhost:8080/quiz/${id}`,
          method: "POST",
          data: {user_answers}, // sending the user answers
          dataType: "json",
          success: (response) => {
             const quiz_attempt_link = response.attempt_link; // receives attempt link from router
             window.location.href = `/results/${quiz_attempt_link}`; // redirects to results page
          },
          error: (err) => {
            console.log(`there was an error: ${err}`)
          }
        })
      }
      // shows next question, hides rest
      showCurrentQuestion(questions);
    })
  }
});

