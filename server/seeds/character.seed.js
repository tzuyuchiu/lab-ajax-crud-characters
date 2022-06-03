const Character = require('../models/Character.model')
const openConnection = require('../db/')

const characters = [
  {
    name: "Han Solo",
    occupation: "Smuggler",
    weapon: "Blaster Pistol",
    cartoon: true
  },
  {
    name: "Luke Skywalker",
    occupation: "Jedi Knight",
    weapon: "Lightsaber",
    cartoon: false
  },
  {
    name: "Sponge Bob",
    occupation: "Lives under the sea",
    weapon: "Crabby Patty",
    cartoon: true
  }
]

async function seedDatabase () {
  try {
    await openConnection()
    const createdCharacters = await Character.create(characters)
    console.log(`Created ${createdCharacters.length} characters 🥸`)
  } catch (error) {
    console.error(`Something went wrong while creating the seed: ${error.message}`)
  }

}


