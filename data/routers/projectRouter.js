const express = require('express');

const Project = require('../helpers/projectModel');
const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try{

  }
  catch{

  }
});

router.get('/:id', async (req, res)  => {
  try{

  }
  catch{

  }
});

router.post('/', async (req, res)  => {
  try{

  }
  catch{

  }
});

router.post('/', async (req, res)  => {
  try{

  }
  catch{

  }
});

async function validateProjectId(req, res, next) {
  try{
    const { id } = req.params;
    const project = await Project.get(id);
    if(project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  }
  catch(error) {
    res.status(500).json(error);
  }
};

function validateProjectBody(req, res, next) {
  try{
    const body = req.body;
    if(!body) {
      res.status(400).json({ message: "missing request body" });
    } else {
      next();
    }
  }
}

function validateAction(req, res, next) {
  try{
    const body = req.body;
    if(!body) {
      res.status(400).json({ message: "missing request body"});
    } else if(!body.name) {
      res.status(400).json({ message: "project name is required" });
    } else if(!body.description) {
      res.status(400).json({ message: "project description is required" });
    } else {
      next();
    }
  }
}

module.exports = router;
