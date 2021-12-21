let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
  handleSubmit()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//fetch requests
//get all of andy's toys
function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(toyData=>toyData.forEach(toy=>renderToy(toy)))
}






//event handler
function handleSubmit() {
  //grab form
  const form = document.querySelector('.add-toy-form');
    // add event listener for submit
  form.addEventListener('submit', (event)=> {
    event.preventDefault();
    let nameValue = event.target.name.value
    let imageValue =event.target.image.value

    const newToyObj = {
      name: nameValue,
      image: imageValue,
      likes: 0
    }
    renderToy(newToyObj)
  })
}

function renderToy(toy){
  let toyCard = document.getElementById('toy-collection');
  let div = document.createElement('div')
  div.className = "card"

  let toyName = document.createElement('h2')
  toyName.textContent = toy.name

  let toyImg = document.createElement('img')
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar"

  let toyLikes = document.createElement('p')
  toyLikes.textContent = `${toy.likes} likes`

  let button = document.createElement('button')
  button.className = "like-btn"
  button.id = "[toy_id]"
  button.textContent = "Like <3 "

  //addEventListener to button element
  button.addEventListener('click', (e) => {
    let currentLikes = e.target.previousSibling.innerText
    let actualLikes = parseInt(currentLikes.split(" ")[0])+1
    e.target.previousSibling.innerText = `${actualLikes.toString()} likes`

  })


  div.append(toyName,toyImg,toyLikes,button)
  toyCard.append(div)
 

}