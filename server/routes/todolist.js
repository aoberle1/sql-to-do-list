const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    // get all song data
    let queryText = 'SELECT * FROM "todolist" ORDER BY "complete" ASC;';
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
            res.sendStatus(201);
            })
            .catch(error => {
                console.log('Query:', queryText, 'error:', error);
                res.sendStatus(500);
            })
});

router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    console.log(idToDelete);
    let queryText = 'DELETE FROM "todolist" WHERE "id"=$1';

    pool.query(queryText, [idToDelete])
    .then(result => {
        console.log('task deleted', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making delete query', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log( 'got to put')

    let idToUpdate = req.params.id;
    let complete = req.body.complete

    let queryText = '';

    if (complete === 'no' ){
        queryText = `UPDATE "todolist" 
        SET "complete" = 'yes'
        WHERE "id" = $1;`
    }

    pool.query(queryText, [idToUpdate])
    .then(result => {
        console.log('to-do list UPDATED', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making PUT query', error);
        res.sendStatus(500);
    })
})


module.exports = router;