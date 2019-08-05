const express = require('express');

const Project = require('../helpers/projectModel');
const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', validateProject, async (req, res)  => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', validateProjectId, validateProject, async (req, res)  => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedProject = await Project.update(id, body);
    res.status(201).json({ message: "Project Data Updated", project: updatedProject});
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', validateProjectId, async (req, res)  => {
  const { id } = request.params;
  try {
    const deleted = await Project.remove(id);
    res.status(200).json({ message: "Project Deleted", project: req.project})
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const actions = await Project.getProjectActions(id);
    res.status(200).json(actions);
  } catch(error) {
    res.status(500).json(error);
  }
})

router.post('/:id/actions', validateProjectId, validateAction, async (req, res) => {
  const body = req.body;
  try {
    const addedAction = await Action.insert(body);
    res.status(201).json({ message: "Action Added", action: addedAction})
  } catch(error) {
    res.status(500).json(error);
  }
})

// validatio middlewares

async function validateProjectId(req, res, next) {
  try {
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

function validateProject(req, res, next) {
  try {
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
  } catch(error) {
    res.status(500).json(error);
  }
}

function validateAction(req, res, next) {
  try {
    const body = req.body;
    if(!body) {
      res.status(400).json({ message: "missing request body"});
    } else if(!body.description) {
      res.status(400).json({ message: "action description is required" });
    } else if(!body.notes) {
      res.status(400).json({ message: "action notes is required" });
    } else if(!body.project_id) {
      res.status(400).json({ message: "action project_id is required" });
    } else {
      next();
    }
  } catch(error) {
    res.status(500).json(error);
  }
}

module.exports = router;
