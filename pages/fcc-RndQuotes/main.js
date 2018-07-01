var colors = [
  "#90D26D",
  "#EF5959",
  "#61105E",
  "#FFE98A",
  "#FFDBC5",
  "#50C19A",
  "#F35B25"
]

$(document).ready(function () { // equal to $(function(){})
  $.getJSON("https://jsonplaceholder.typicode.com/posts/", function (posts) {
    $.getJSON("https://jsonplaceholder.typicode.com/users/", function (users) {
      // store the random post for tweet
      var post_g = posts[0].body;

      // initialize the page
      init(posts, users);

      // newpost event
      $(".newPost").on('click',function(){
        // get random index for post
        var rndPost = getRandomArbitrary(0, posts.length);

        // get random index for user
        var rndUser = getRandomArbitrary(0, users.length);

        // get random index for color        
        var rndColor = getRandomArbitrary(0, colors.length);

        post_g = posts[rndPost].body;

        changeColor(rndColor);
        changePost(posts, rndPost);
        changeUser(users, rndUser);
      }); // end of .newPost click
      $("a.tweet").on("click", function(){
        if(post_g.length > 140){
          post_g = post_g.slice(0, 137) + '...';
        }
        alert(post_g);
        $(this)
        .attr("href", 
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
              + post_g
        );
      })
    }); // end of $.getJSON(users)

  }); // end of $.getJSON(posts)

}); // end of $(document).ready()



function init(p_arr, u_arr) {
  $("h3.post").text(p_arr[0].body);
  $('p.user').text(u_arr[0].username);
  var rndColor = getRandomArbitrary(0, colors.length);
  changeColor(rndColor);
}

function changePost(posts, rndIndex){
  $("h3.post").text(posts[rndIndex].body);
}

function changeUser(users, rndIndex){
  $('p.user').text(users[rndIndex].username);
}

function changeColor(rndIndex){
  $("body").css({"color": colors[rndIndex], "background-color": colors[rndIndex]})
  $("a.link").css("color", colors[rndIndex]);
  $("a.tweet").css("color", colors[rndIndex]);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}