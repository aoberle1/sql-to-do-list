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


module.exports = router;