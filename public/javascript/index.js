/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById('template');
const baseUrl = 'http://localhost:5005/api/characters';
const fetchAllButton = qs('#fetch-all');
const fetchOneButton = qs('#fetch-one');
const deleteButton = qs('#delete-one');
const submitButton = qs('#send-data');
const characterContainer = qs('.characters-container');

function createTemplateAndAppend(character) {
  const clone = characterTemplate.content.cloneNode(true);
  // qs('.character-id', clone).id = character._id;
  qs('.character-id', clone).textContent = character._id;
  qs('.name', clone).textContent = character.name;
  qs('.occupation', clone).textContent = character.occupation;
  qs('.cartoon', clone).textContent = character.cartoon;
  qs('.weapon', clone).textContent = character.weapon;

  characterContainer.append(clone);
}
// List all the characters|| fetch all
fetchAllButton.addEventListener('click', getCharacters);
async function getCharacters() {
  characterContainer.innerHTML = null;

  const { data } = await axios.get(baseUrl);
  data.forEach((character) => {
    console.log(data);
    createTemplateAndAppend(character);
  });
}

// Search by name|| fetch one
fetchOneButton.addEventListener('click', getOneCharacters);
async function getOneCharacters(e) {
  characterContainer.innerHTML = null;
  const name = qs('input[name=character-name]').value;
  const { data } = await axios.get(`${baseUrl}/${name}`);
  // console.log(data);
  createTemplateAndAppend(data[0]);
}
// Delete by ID|| delete one
deleteButton.addEventListener('click', deleteCharacter);
async function deleteCharacter(e) {
  const id = qs('input[name=character-id-delete]').value;
  await axios.delete(`${baseUrl}/${id}`);
  console.log(e.target);
  const characterToRemove = qsa('.character-info').find((char) => {
    return qs('.character-id', char).textContent === id;
  });
  characterToRemove.remove();
}

//Create new character.....does not work...
submitButton.addEventListener('submit', createCharacter);
async function createCharacter(e) {
  e.preventDefault();
  const character = {
    name: document.querySelector('input[name="name"]').value,
    occupation: document.querySelector('input[name="occupation"]').value,
    weapon: document.querySelector('input[name="weapon"]').value,
    cartoon: document.querySelector('input[name="cartoon"]').checked,
  };
  const { data } = await axios.post(baseUrl, character);
  // console.log(data)
  createTemplateAndAppend(data);
}
//Edit existing character.....does not work...
//submitButton.addEventListener('submit', editCharacter);
async function editCharacter(e) {
  e.preventDefault();
  const character = {
    name: document.querySelector('input[name="name"]').value,
    occupation: document.querySelector('input[name="occupation"]').value,
    weapon: document.querySelector('input[name="weapon"]').value,
    cartoon: document.querySelector('input[name="cartoon"]').checked,
  };
  const id = qs('input[name=character-id-delete]').value;
  const { data } = await axios.patch(`${baseUrl}/${id}`, character);
  getCharacters();
}

//------------------Pauline's solution-----------------------------------------------
// const APIHAndler = axios.create({
//   baseURL: 'http://localhost:5005/api/characters',
// });
//centralizing all of he logic to communicate with the backend in an object called APIHAndler
//this is an instance of axios with a baseurl already inside
//and we are enriching it with other method besides get ,post, delete etc
//like for example FullList
// const APIHandler={...axiosInsance}
// APIHandler.getFullList=async function(){
//  try{
//    const {data}=await this.get()
//    return data
//  }catch(error){
//   console.error(error)
//  }
// }

// function createCard(char){
//   const card = characterTemplate.content.cloneNode(true);
//   qs('.character-id span', card).textContent = char._id;
//   qs('.name span', card).textContent =  char.name;
//   qs('.occupation span',  card).textContent =  char.occupation;
//   qs('.weaponn span',  card).textContent =  char.weapon;
//   qs('.cartoon span',  card).textContent =  char.cartoon;
//  return card;
// }

//   document
//   .getElementById('fetch-all')
//   .addEventListener('click', function (event) {
//     //to delete the first template card
//     characterContainer.innerHTML=''
//     const allCharacters= await APIHandler.getFullList()
//     allCharacters.forEach((character)=>{
//       const card= createCard(character)
//       characterContainer.appendChild(card)
//     })

// });

function qs(selector, element = document) {
  return element.querySelector(selector);
}

function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
