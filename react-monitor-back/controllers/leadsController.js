const { response } = require('express');
require('dotenv').config();
const Lead = require('../models/Lead');


const findLeads = async (req, res  = response) => {  
    const leads = await Lead.find();
    res.send(leads);
}


module.exports = {
    findLeads
}