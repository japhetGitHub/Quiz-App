$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")
  let quizLen = 0;

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
        registerOptions(questions.quiz);
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
      <article id="question-choices">
        <div class="question">
          <span> ${question.question} </span>
        </div>
        <div class="choices">
          <button id="btn1" data-val="choice_1"> ${question.choice_1} </button>
          <button id="btn2" data-val="choice_2"> ${question.choice_2} </button>
          <button id="btn3" data-val="choice_3"> ${question.choice_3} </button>
          <button id="btn4" data-val="choice_4"> ${question.choice_4} </button>
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

  const showCurrentQuestion = function() {
    //console.log(quizLen)
    for (let i = 1; i <= quizLen; i++) {
      const question = $(`#question-${i}`)
      if (i === current_question) {
        question.show();
      } else {
        question.hide();
      }
    }
  }

  // AJAX req for the quiz (NOTE: quiz will have quiz_id, questions, question_ids, question_answers, etc)
  // then insert question data into mockup ONE at a time upon each press of 'next question' button and display the follow-up question


  // ALTERNATIVE
  // AJAX reqs for the quiz. receive JSON { quiz }
    // compare the answers to the user_answers and evaluate if true/false
    //create an array of all the answers and send this true/false array to the POST /quiz/:id route endpoint
  let user_answers = [];
  const registerOptions = function (questions) {
    $('#btn1, #btn2, #btn3, #btn4').click(function () {
      //let user_answer = $(this).text();
      let user_answer = $(this).attr("data-val");
      correct_answer = questions[current_question - 1].correct_answer;
      //console.log(user_answer)
      //console.log(correct_answer);
      user_answers.push(user_answer === correct_answer);
      current_question = current_question + 1;
      if (current_question > quizLen) {
        //console.log("HELLO WORLD")
        console.log(user_answers)
      }
      showCurrentQuestion();
      //console.log(user_answers)
    })
  }
});
