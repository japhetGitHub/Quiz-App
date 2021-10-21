const createQuizElement = function (data) {
  //decoding strings
  // const escape = function (data) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(data));
  //   return div.innerText;
  // };

  const htmlTBox = `
                <div class="container-fluid"; id="quiz";>
								<div class="row justify-content-md-center">
								<div id="quizList" class="col-8">
								<ol class="list-group">
								<li class="list-group-item d-flex justify-content-between align-items-start">
    						<div id="quiz_div" class="ms-2 me-auto">
								<a style="display:block" href="${data.quiz_link}">
  							<div class="fw-bold">${data.title}</div>
                <p id="p1">${data.quiz_link}</p>
								</a>
                <h3 id="creator">Created by @${data.username}</h3>
                </div>
                <div>
                <button id="copy" class="btn"onclick="copyToClipboard('#p1')" ><i class="fas fa-share-alt"></i></button>
                <h3 id="creator">Attempt 135 times</h3>
                </div>
 								 </li>
								 </ol>
								 </div>
                </div>
								</div>		
    `;
  return htmlTBox;

  
};
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).html()).select();
  document.execCommand("copy");
  $temp.remove();
  alert("Quiz Link Copied!");
 }

const renderQuiz = function (data) {
  $("#public-quizzess").empty();
  for (let quiz of data.quiz) {
    //create the html element for quiz
    let $quiz = createQuizElement(quiz);
    $('#public-quizzess').prepend($quiz);
  }
};

// loading func quiz from json

$(() => {
  const loadQuiz = function () {
    $.ajax({
      url: "http://localhost:8080/api/homepage",
      method: "GET",
    })
      .done((data) => {
        renderQuiz(data);
      })
      .fail(() => console.log("Error!"))
      .always(() => console.log("Request completed"));
  };
  loadQuiz();
});
