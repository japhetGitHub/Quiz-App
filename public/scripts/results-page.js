
$(document).ready(function() {
  let resultsLen = 0;
  const loadResults = () => {
    const id = $("#results-id").text()
    $.ajax({
      url: `http://localhost:8080/results/${id}/data`,
      method: "GET",
      dataType: "json",
      success: (result) => {
        resultsLen = result.results.length;
        let count = countCorrect(result.results);
        var url      = window.location.href;
        $("#foo").append(count)
        $("#length").append(resultsLen)
        $("#url").append(url)
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadResults();
});


const countCorrect = function(results) {
  let counter = 0;
  for (const result of results) {
    if (result.correct) {
      counter = counter + 1;
    }
  }
  return counter;
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).html()).select();
  document.execCommand("copy");
  $temp.remove();
  alert("Result Link Copied!");
 }
