const { request, response } = require('express');
const moment = require('moment')

require('dotenv').config();
const Lead = require('../models/Lead');


const findLeads = async (req = request, res  = response) => {  
    const dateInit = req.params.dateInit;
    const dateEnd = req.params.dateEnd;
    console.log('dateInit:',dateInit);
    console.log('dateEnd:',dateEnd);
    const leads = await Lead.find({
        leadCreatedDate: {
            $gte: moment(dateInit, "YYYY-MM-DD").toDate(),
            $lte: moment(dateEnd, "YYYY-MM-DD").toDate()
          }
        });
        console.log('Total Leads: ', leads.length);
    res.send(leads);
}


module.exports = {
    findLeads
}