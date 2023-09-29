// write your code here
/*
fetch ramens from server
parse response
for each ramen, create an image element, set its source to ramen image, and append to ramen menu
*/

fetch("http://localhost:3000/ramens")
  .then((res) => res.json())
  .then((ramens) => ramens.forEach(showImages));

function showImages(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.addEventListener("click", (event) => addRamenInfo(event, ramen));
  document.getElementById("ramen-menu").append(img);
}

/*add event listener to each image above
consider passing ramen into event listener callback
in the callback, grab the elements, set the inner texts to their respective ramen properties
*/
function addRamenInfo(event, ramen) {
  const image = document.querySelector(".detail-image");
  image.src = ramen.image;
  const name = document.querySelector(".name");
  name.innerText = ramen.name;
  const restaurant = document.querySelector(".restaurant");
  restaurant.innerText = ramen.restaurant;
  const rating = document.querySelector("#rating-display");
  rating.innerText = ramen.rating;
  const comment = document.querySelector("#comment-display");
  comment.innerText = ramen.comment;
}

/*create event listener for submit which calls a function to add info to menu
create variable for each ramen property, grab the value from each input, then set property equal to value
create object using those properties
run show images with new ramen we made
*/
document
  .getElementById("new-ramen")
  .addEventListener("submit", (event) => createRamen(event));
function createRamen(event) {
  event.preventDefault();
  const name = document.querySelector("#new-name").value;
  const restaurant = document.querySelector("#new-restaurant").value;
  const image = document.querySelector("#new-image").value;
  const rating = document.querySelector("#new-rating").value;
  const comment = document.querySelector("#new-comment").value;
  const newRamen = {
    name: name,
    restaurant: restaurant,
    image: image,
    rating: rating,
    comment: comment,
  };
  showImages(newRamen);
}
