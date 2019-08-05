const express = require('express');

const Action = require('../helpers/actionModel');

const router = express.Router();

router.get('/:id', validateActionId, async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
    res.status(200).json(action);
  } catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', validateAction, async (req, res) => {
  const body = req.body;
  try {
    const action = await Action.insert(body);
    res.status(201).json(action);
  } catch(error) {
    res.status(500).json(error);
  }
})

router.put('/:id', validateActionId, validateAction, async (req, res)  => {
  const { id } = req.params;
  const body = req.body;
  try{
    const updatedAction = await Action.update(id, body);
    res.status(201).json({ message: "Action Updated", action: updatedAction});
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', validateActionId, async (req, res)  => {
  const { id } = req.params;
  try{
    const deleted = await Action.remove(id);
    res.status(200).json({ message: "Action Deleted", action: req.action});
  }
  catch(error) {
    res.status(500).json(error)
  }
});

// validation middlewares

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Action.get(id);
    if(action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "Invalid Action ID" });
    }
  } catch(error) {
    res.status(500).json({ message: "ValidateActionId Error", error: error })
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
