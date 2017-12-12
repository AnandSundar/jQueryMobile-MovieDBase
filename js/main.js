$(document).ready(function() {
  $('body').on('submit', '#searchForm', function (e) {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

//single movie selected. get the movie details
function movieClicked(id) {
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
