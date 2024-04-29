const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjMxZTZkYjM3NTdkMTI3YWU0NjE2ODMyYzkwMjc2MCIsInN1YiI6IjYyOGM4MmViZWQyYWMyNTQ2OTllODkwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OMw-6etv7U0d0qIkPC_30V2RPWo9s_9lelEwFbF-l7c",
  },
};

window.onload = function () {
  $(document).ready(function () {
    getUserMovieID();
  });
};

let movieIDs;

//get current user's all bookmark Id
function getUserMovieID() {
  $.ajax({
    type: "get",
    url: "/getUserMovieID",
    success: function (response) {
      movieIDs = response;
      console.log("get successful");
      response.forEach((e) => {
        fetchData(e.id,e.type);
      });
    },
  });
}

//fetch data with the user's bookmark movie / tv ID
function fetchData(id,type) {
  fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      movieListView(data,type);
    })
    .catch((err) => console.error(err));
}

//return bookmarked movie /tv view to bookmark html
function movieListView(data,type) {
  $(".bookmark-list").append(`
    <div class="card-container" id=${type}>
        <img class='card-img' id='${data.id}' src="https://image.tmdb.org/t/p/original${data.poster_path}">
        <a class="card-title" id='${data.id}'>${data.title != null ? data.title : data.name}</a>
        <div class="card-detail">
            <div class='card-genre'>${data.genres[0].name}</div>
            <div class='card-divider'>|</div>
            <div class='card-year'>${data.release_date != null ? justYear(data.release_date) : justYear(data.first_air_date)}</div>
            <div class='card-divider'>|</div>
            <div class='card-lang'>${data.original_language.toUpperCase()}</div>
        </div>
    </div>
    `);

    $('.card-img').each((_,e)=>{
        $(e).on('click',()=>{
            const eId = $(e).attr('id')
            const eType = $(e).parent().attr('id')
            sendDataToDetailTemplate(eId,eType)
        })
    })
}

//return date with just year
function justYear(date) {
  return date.slice(0, 4);
}

//navigate to detail page
function sendDataToDetailTemplate(id, type) {
  localStorage.setItem("keyId", id);
  localStorage.setItem("type", type);
  location.href = "detail.html";
}
