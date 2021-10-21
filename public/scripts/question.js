
$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM is ready!")
  let quizLen = 0;

  let current_question = 1;

  const loadQuestions = () => {
    const id = $("#quiz-id").text()
    //console.log(id);
    $.ajax({
      url: `http://localhost:8080/quiz/${id}/data`,
      method: "GET",
      dataType: "json",
      success: (questions) => {
        //current_question = questions.quiz[0].id;
        //console.log("this is current q: ", current_question);
        current_question = questions.quiz[0].id;
        //console.log("current question", current_question);
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

  const showCurrentQuestion = function(questions) {
    //console.log(quizLen)
    //console.log("this is quiz_id", quiz[0].id)
    //console.log("this is id: ", questions[0].id)
    const starting_id = questions[0].id;
    for (let i = starting_id; i <= quizLen + starting_id; i++) {
      //console.log("this is id", quiz[i].id)
      const question = $(`#question-${i}`)
      if (i === current_question) {
        question.show();
      } else {
        question.hide();
      }
    }
  }

  let user_answers = [];
  let quiz_attempts = [];
  const registerOptions = function (questions) {
    const attempt_link = 'localhost8000/quiz/123/attempt';
    const user_id = 1;
    const quiz_id = questions[0].quiz_id;
    quiz_attempts.push({ attempt_link, user_id, quiz_id })

    $('#btn1, #btn2, #btn3, #btn4').click(function () {
      //let user_answer = $(this).text();
      const starting_id = questions[0].id;
      let user_answer = $(this).attr("data-val");
      const correct_answer = questions[current_question - starting_id].correct_answer;
      const correct = user_answer === correct_answer;
      const question_id = questions[current_question - starting_id].id;
      //const quiz_attempt_id = 1;

      user_answers.push({ correct, question_id });

      current_question = current_question + 1;

      if (current_question > quizLen + starting_id - 1) {
        //console.log("this is quiz attempts: ", quiz_attempts);
        const id = $("#quiz-id").text()

        $.ajax({
          url: `http://localhost:8080/quiz/${id}`,
          method: "POST",
          data: {user_answers, user_id},
          dataType: "json",
          success: (response) => {
            console.log("this is response: ", response)
            const quiz_attempt_id = response.quiz_attempt_id;
            window.location.href = `/results/${quiz_attempt_id}`;
          },
          error: (err) => {
            console.log(`there was an error: ${err}`)
          }
        })
        alert("done quiz")
      }
      showCurrentQuestion(questions);
    })
  }



  const addQuestionAttempts = (attempts) => {
    for (const attempt of attempts) {
      const {correct, question_id, quiz_attempt_id} = attempt;
      const sqlQuery = `INSERT INTO question_attempts (correct, question_id, quiz_attempt_id) VALUES ($1, $2, $3) RETURNING *`
      pool.query(sqlQuery, [correct, question_id, quiz_attempt_id]);
    }
  }
});



//const attempt_link = 'localhost:8000/attempt1'
      //const user_id = 1;
      //const quiz_id = $("#quiz-id").text()
      //quiz_attempts = [quiz_attempt_id, attempt_link, user_id, quiz_id];



// AJAX req for the quiz (NOTE: quiz will have quiz_id, questions, question_ids, question_answers, etc)
  // then insert question data into mockup ONE at a time upon each press of 'next question' button and display the follow-up question


  // ALTERNATIVE
  // AJAX reqs for the quiz. receive JSON { quiz }
    // compare the answers to the user_answers and evaluate if true/false
    //create an array of all the answers and send this true/false array to the POST /quiz/:id route endpoint
