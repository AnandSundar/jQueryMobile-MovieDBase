$(document).ready(function() {
  $('body').on('submit', '#searchForm', function (e) {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

//runs before movie details page
$(document).on('pagecontainerbeforeshow', function (event, ui) {
  //check to see which page we are navigating to using the id
  if(ui.toPage[0].id == 'movie'){
    let movieId = sessionStorage.getItem('movieId');
    getMovie(movieId);
  }

});

//single movie selected. get the movie details
function movieClicked(id) {
  //store the imdb id in browser storage
  sessionStorage.setItem('movieId', id);
  $.mobile.changePage('movie.html');
}

//get movies omdb API
function getMovies(searchText) {
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com?apikey=57330b36&s='+searchText
  }).done(function(data){
    let movies = data.Search;
    let output = '';
    $.each(movies, function (index, movie) {
      output += `
        <li>
          <a onclick="movieClicked('${movie.imdbID}')" href="#">
            <img src="${movie.Poster}">
            <h2>${movie.Title}</h2>
            <p>Release YearL ${movie.Year}</p>
          </a>
        </li>
      `;
    });
    $('#movies').html(output).listview('refresh');
  });
}

//get single movie
function getMovie(movieId) {
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com?apikey=57330b36&i='+movieId
  }).done(function(movie){
    //console.log(movie);
    let movieTop = `
      <div style="text-align:center">
        <h1>${movie.Title}</h1>
        <img src="${movie.Poster}">
      </div>
    `;
    $('#movieTop').html(movieTop);

    let movieDetails = `
      <li><strong>Genre:</strong> ${movie.Genre}</li>
      <li><strong>Rated:</strong> ${movie.Rated}</li>
      <li><strong>Released:</strong> ${movie.Released}</li>
      <li><strong>Runtime:</strong> ${movie.Runtime}</li>
      <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
      <li><strong>IMDB Votes:</strong> ${movie.imdbVotes}</li>
      <li><strong>Actors:</strong> ${movie.Actors}</li>
      <li><strong>Director:</strong> ${movie.Director}</li>
    `;

    //we gotta refresh because its a list view
    $('#movieDetails').html(movieDetails).listview('refresh');
  });
}
