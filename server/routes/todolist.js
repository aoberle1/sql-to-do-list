const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    // get all song data
    let queryText = 'SELECT * FROM "todolist";';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows); 
        })
        .catch(error => {
            console.log('Query:', queryText, 'Error:', error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    const newTask = req.body
    console.log('req.body is:', req.body);
    
    const queryText = `
    INSERT INTO "todolist" ("todo")
    VALUES ($1);
    `;
    const values = [newTask.todo];
    pool.query(queryText, values) // pass queryText and array of values
        .then(result => {
             // status code for created
            res.sendStatus(201);
            })
            .catch(error => {
                console.log('Query:', queryText, 'error:', error);
                res.sendStatus(500);
            })
});


module.exports = router;