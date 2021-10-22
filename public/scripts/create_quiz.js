const createChoiceElement = function(choiceNum) { // HTML for a single quiz choice
  return `
  <div class="row mt-2">
    <div class="col-10 col-sm-11">
      <input name="choice_${choiceNum}" class="form-control" type="text" placeholder="Input Choice ${choiceNum}">
    </div>
    <div class="col-2 col-sm-1 mt-1 center-column">
      <input class="form-check-input" type="radio" name="correct" value="${choiceNum}">
    </div>
  </div>
  `;
};

const createQuestionFormElement = function(questionNumber) { // Html for a single quiz question
  return `
    <form id="questionForm">
      <div class="row">
        <div class="col center-column">
          <label class="h2" name="q_num">Question ${questionNumber}</label>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">
          <label class="form-label h4" for="questionText">Question: </label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <textarea id="qtntxt" name="questionText" class="form-control" placeholder="Input Question Text" rows="2"></textarea>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-10 col-sm-11">
          <h4>Choices</h4>
        </div>
        <div class="col-2 col-sm-1 center-column" id="correct-title">
          <span class="h6">Correct</span>
        </div>
      </div>

      <div id="choices">
        <div class="row mt-2">
          <div class="col-10 col-sm-11">
            <input name="choice_1" class="form-control" type="text" placeholder="Input Choice 1">
          </div>
          <div class="col-2 col-sm-1 mt-1 center-column">
            <input class="form-check-input" type="radio" name="correct" value="1" checked>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-10 col-sm-11">
            <input name="choice_2" class="form-control" type="text" placeholder="Input Choice 2">
          </div>
          <div class="col-2 col-sm-1 mt-1 center-column">
            <input class="form-check-input" type="radio" name="correct" value="2">
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col d-block gap-2">
          <button class="btn btn-outline-light" id="btn-add-choice" type="button">Add</button>
          <button class="btn btn-outline-light disabled" id="btn-delete-choice" type="button">Remove</button>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn btn-outline-light" id="btn-new-question" type="submit">New Question</button>
        </div>
      </div>

    </form>
  `;
};

const createCardFooter = function() { // HTML for quiz publish and public/private selector
  return `
    <form id="publishForm">
      <div class="card-footer">
        <div class="row mt-2 mb-2">
          <div class="col-2 col-sm-4"></div>
          <div class="col-3 col-sm-2 ">
            <div class="row flex-nowrap">
              <input class="form-check-input" type="radio" name="isPublic" id="publicRadio" value="true" checked>
              <label class="form-label pe-0" for="publicRadio">Public</label>
            </div>
            <div class="row flex-nowrap">
              <input class="form-check-input" type="radio" name="isPublic" id="privateRadio" value="false">
              <label class="form-label mb-0 pe-0" for="privateRadio">Private</label>
            </div>
          </div>
          <div class="col-5 col-sm-3 d-grid gap-2 mx-auto">
            <button class="btn btn-outline-light" id="btn-publish" type="submit">Publish Quiz</button>
          </div>
          <div class=" col-sm-3"></div>
        </div>
      </div>
    </form>
  `;
};

const createSuccessPage = function(quizTitle, quizLink) { // HTML for 'quiz created successfully' view
  return `
    <div class="tallcard d-flex flex-column align-items-center justify-content-center">
      <div class="row h2">${escape(quizTitle)}</div>
      <div class="row h4 container mt-2">
        <div class="input-group">
          <span id="shrbtn" class="col-auto input-group-text"><i class="fas fa-share-alt-square"></i></span>
          <input class="col ps-3 form-control-plaintext" id="linktext" type="text" value="${escape(quizLink)}" readonly>
        </div>
      </div>
    </div>
  `;
};

const successHandler = function(quizTitle, quizLink) { // upon successfully creating quiz
  $('.card-header > h1').text('Success!');
  $('.card-body').children().remove(); //clears the card body
  $('#publishForm').remove(); // removes footer
  $('.card-body').append(createSuccessPage(quizTitle, quizLink));
};

const quizHandler = function(quizNumber) { // upon inputing quiz title
  $('.card-body > form').remove();
  $('.card-body').append(createQuestionFormElement(quizNumber)); // display's create question view
};

const escape = function(str) { // to prevent XSS attacks, input is santized here
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  const quizData = { // final object being POSTed via AJAX
    quizTitle: '',
    isPublic: '',
    questions: []
  };

  $('.card-body').on('submit', '#quizTitle', function(event) { // First step in multi-page form
    event.preventDefault();

    $.each($('#quizTitle').serializeArray(), function(i, field) { // receives the quizTitle form input
        quizData['quizTitle'] = field.value ? field.value : 'placeholder title';
    });

    $('.card-header > h1').text(escape(quizData.quizTitle));//replace card title with quiz title
    quizHandler(1); // repaints DOM to display question input form (second step)
    $('.card').append(createCardFooter()); // adds 'publish quiz' button and public/private toggle
  });

  // since question form is dynamically added to DOM the listener must be delegated to a static element (i.e. .card-body)
  $('.card-body').on('click', '#btn-add-choice', function(event) { // event handler for Add Choice button
    let visibleChoices = $('#choices').children().length;
    // allows max 4 choices
    if (visibleChoices < 4) {
      visibleChoices++;
      const $choice = createChoiceElement(visibleChoices);
      $('#choices').append($choice);
    }
    if (visibleChoices === 4) {
      $(this).addClass('disabled');
    }
    $('#btn-delete-choice').removeClass('disabled');
  });

  $('.card-body').on('click', '#btn-delete-choice', function(event) { // event handler for Delete Choice button
    let visibleChoices = $('#choices').children().length;
    // allows min 2 choices
    if (visibleChoices > 2) {
      $('#choices').children().last().remove();
      visibleChoices--;
    }
    if (visibleChoices === 2) {
      $(this).addClass('disabled');
    }
    $('#btn-add-choice').removeClass('disabled');
  });

  $('.card-body').on('submit', '#questionForm', function(event) { // event handler for new question button
    event.preventDefault();

    const questionData = { // since variable # of choices (2 to 4) per question is allowed, they are all null by default and only those choices inputed will be repopulated
      choices: {
        choice_1: null,
        choice_2: null,
        choice_3: null,
        choice_4: null
      }
    };
    $.each($('#questionForm').serializeArray(), function(i, field) { // receives question form data
      if (field.name.includes('choice_')) {
        questionData.choices[field.name] = field.value; //inputs choices
      } else {
        questionData[field.name] = field.value; // inputs quizTitle
      }
    });
    quizData.questions.push(questionData);

    quizHandler(quizData.questions.length);
  });

  $('.card').on('submit', '#publishForm', function(event) {
    event.preventDefault();

    $('#questionForm').submit(); // submits the quiz before 'publishing' so that final question is added

    $.each($('#publishForm').serializeArray(), function(i, field) { // receives public/private toggle data
      quizData['isPublic'] = field.value;
    });

    $.post("/quiz/new", quizData) // AJAX POST req to submit entire create quiz form
      .done(function(data) {
        const quiz_title = data.quiz_title;
        const quiz_link = data.quiz_link;
        successHandler(quiz_title, quiz_link); // Receives quiz title and quiz shareable link upon successful quiz creation
      })
      .fail(function(err) {
        console.error(err);
      });
  });
});
