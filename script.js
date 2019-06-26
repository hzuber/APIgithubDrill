'use strict'

function getRepos() {
  const whichHandle =$('#js-user-handle').val();
  console.log(whichHandle);
  fetch('https://api.github.com/users/' + whichHandle + '/repos')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  if (responseJson.message == 'Not Found'){
    alert("Sorry, we can't find that user! Try another one.");
  }
  else (makeList(responseJson));
  $('.results').removeClass('hidden');
}

function makeList(responseJson){
  $('#js-results-list').empty();
  for (let i=0; i<responseJson.length; i++){
    $('#js-results-list').append(
      `<li><h3>${responseJson[i].name}</h4>
      <h4><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h4></li>`
    )};
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
