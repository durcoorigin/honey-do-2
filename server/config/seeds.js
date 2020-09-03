const db = require('./connection');
const { User, Product } = require('../models');

db.once('open', async () => {
    // DO WE NEED THIS?
});