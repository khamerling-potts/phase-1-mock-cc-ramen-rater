// write your code here
/*
fetch ramens from server
parse response
for each ramen, create an image element, set its source to ramen image, and append to ramen menu
in my last .then, run addrameninfo with first ramen in ramens array
*/
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const detailImg = document.querySelector(".detail-image");

fetch("http://localhost:3000/ramens")
  .then((res) => res.json())
  .then((ramens) => {
    ramens.forEach(showImages);
    addRamenInfo(null, ramens[0]);
  });

function showImages(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.addEventListener("click", (event) => addRamenInfo(event, ramen));
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  document.getElementById("ramen-menu").append(deleteBtn, img);
  deleteBtn.addEventListener("click", (event) =>
    deleteRamen(event, ramen, img)
  );
}

/*add event listener to each image above
consider passing ramen into event listener callback
in the callback, grab the elements, set the inner texts to their respective ramen properties
add a delete button in ramen detail div
add event listener for delete button that calls a function
the function will remove the details from ramen detail div, as well as from ramen menu*/
function addRamenInfo(event, ramen) {
  const image = document.querySelector(".detail-image");
  image.src = ramen.image;
  image.id = ramen.id;
  const name = document.querySelector(".name");
  name.innerText = ramen.name;
  const restaurant = document.querySelector(".restaurant");
  restaurant.innerText = ramen.restaurant;
  ratingDisplay.innerText = ramen.rating;
  commentDisplay.innerText = ramen.comment;
}

function deleteRamen(event, ramen, img) {
  if (img.src === detailImg.src) {
    detailImg.src = "./assets/image-placeholder.jpg";
    const detailDiv = document.querySelector("#ramen-detail");
    detailDiv.querySelector("h2").innerText = "Insert Name Here";
    detailDiv.querySelector("h3").innerText = "Insert Restaurant Here";
    ratingDisplay.innerText = "Insert rating here";
    commentDisplay.innerText = "Insert comment here";
  }
  event.target.remove();
  img.remove();
  const configObj = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  fetch(`http://localhost:3000/ramens/${ramen.id}`, configObj)
    .then((res) => res.json())
    .then((data) => console.log(data));
}

/*create event listener for submit which calls a function to add info to menu
create variable for each ramen property, grab the value from each input, then set property equal to value
create object using those properties
run show images with new ramen we made
*/
const newRamenForm = document
  .getElementById("new-ramen")
  .addEventListener("submit", (event) => createRamen(event));
function createRamen(event) {
  event.preventDefault();
  const name = document.querySelector("#new-name").value;
  const restaurant = document.querySelector("#new-restaurant").value;
  const image = document.querySelector("#new-image").value;
  const rating = event.target.querySelector("#new-rating").value;
  const comment = event.target.querySelector("#new-comment").value;
  const newRamen = {
    name: name,
    restaurant: restaurant,
    image: image,
    rating: rating,
    comment: comment,
  };
  const configObj = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamen),
  };
  fetch(`http://localhost:3000/ramens`, configObj);
  showImages(newRamen);
}

/*add event listener for submitting edit form
grab values from both input fields
set inner text of comment and rating elements to the values from above*/
document.querySelector("#edit-ramen").addEventListener("submit", editRamen);
function editRamen(event) {
  event.preventDefault();
  const rating = event.target.querySelector("#new-rating").value;
  const comment = event.target.querySelector("#new-comment").value;
  document.querySelector("#rating-display").innerText = rating;
  document.querySelector("#comment-display").innerText = comment;
  const configObj = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: rating,
      comment: comment,
    }),
  };
  fetch(`http://localhost:3000/ramens/${detailImg.id}`, configObj)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
