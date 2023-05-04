const Diary = require('../models/diary');

async function index (req, res) {
    try {
        const diary = await Diary.getAll();
        res.json(diary);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Diary.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const diary = await Diary.getOneById(id);
        res.json(diary);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function update (req, res) {
    try {
      const idx = parseInt(req.params.id)
      const data = req.body
      const dairy = await Diary.getOneById(idx)
      const result = await dairy.update(data)
      res.status(200).json(result)
  
    } catch (err) {
      res.status(404).json(err)
    }
  };

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const diary= await Diary.getOneById(id);
        const result = await diary.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show, destroy
}
