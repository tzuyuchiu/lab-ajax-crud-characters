const router = require('express').Router();
const { isValidObjectId } = require('mongoose');
const Character = require('../models/Character.model');
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
  /**Your code goes here */
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters);
  } catch (error) {
    next(error);
    console.error(error);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
  /**Your code goes here */
  try {
    const characterToCreate = req.body;
    const characterCreated = await Character.create(characterToCreate);
    res.status(201).json(characterCreated);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get('/:name', async (req, res, next) => {
  /**Your code goes here */
  try {
    const characterName = req.params.name;

    const OneCharacterByName = await Character.find({
      name: { $regex: characterName, $options: 'i' },
      // {name: new RegExp(req.params.name,'i')},
    });
    res.status(200).json(OneCharacterByName);
  } catch (err) {
    next(err);
  }
});

router.get('/:id([a-z0-9]{24})', async (req, res, next) => {
  try {
    const OneCharacterById = await Character.findById(req.params.id);
    res.status(200).json(OneCharacterById);
  } catch (err) {
    next(err);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
  /**Your code goes here */
  try {
    const characterId = req.params.id;

    const updatedCharacterId = await Character.findByIdAndUpdate(
      characterId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: `You updated ${req.params.id}` });
  } catch (err) {
    next(err);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
  /**Your code goes here */
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `You deleted ` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
