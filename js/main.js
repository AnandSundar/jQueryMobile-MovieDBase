$(document).ready(function() {
  $('body').on('submit', '#searchForm', function (e) {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

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
          <a href="#">
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
