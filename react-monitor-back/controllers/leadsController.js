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

const findVehiclesOfInterest = async (req = request, res  = response) => {     
    const leads = await Lead.aggregate(
            [
                { 
                    "$group" : { 
                        "_id" : { 
                            "vehicleNameOfInterest1" : "$vehicleNameOfInterest1"
                        }, 
                        "COUNT(*)" : { 
                            "$sum" : 1
                        }
                    }
                }, 
                { 
                    "$project" : { 
                        "total" : "$COUNT(*)", 
                        "vehicle" : "$_id.vehicleNameOfInterest1", 
                        "_id" : 0
                    }
                },
                {
                    "$match": {
                        "total": {
                            "$gt": 40
                        }
                    }
                },         
                { 
                    "$sort" : { 
                        "total" : -1
                    }
                }
            ]
        );
    
        console.log('Total: ', leads);
    res.send(leads);
}

const findLeadTypes = async (req = request, res  = response) => {     
    const leads = await Lead.aggregate(
            [
                { 
                    "$group" : { 
                        "_id" : { 
                            "leadTypeStr" : "$leadTypeStr"
                        }, 
                        "COUNT(*)" : { 
                            "$sum" : 1
                        }
                    }
                }, 
                { 
                    "$project" : { 
                        "total" : "$COUNT(*)", 
                        "leadType" : "$_id.leadTypeStr", 
                        "_id" : 0
                    }
                }, 
                { 
                    "$sort" : { 
                        "total" : -1
                    }
                }
            ]
        );    
        console.log('Total: ', leads);
    res.send(leads);
}

const findTimesFrame = async (req = request, res  = response) => {     
    const leads = await Lead.aggregate(
            [
                { 
                    "$group" : { 
                        "_id" : { 
                            "purchaseIntensionTimeFrameStr" : "$purchaseIntensionTimeFrameStr"
                        }, 
                        "COUNT(*)" : { 
                            "$sum" : 1
                        }
                    }
                }, 
                { 
                    "$project" : { 
                        "total" : "$COUNT(*)", 
                        "timeFrame" : "$_id.purchaseIntensionTimeFrameStr", 
                        "_id" : 0
                    }
                }, 
                { 
                    "$sort" : { 
                        "total" : -1
                    }
                }
            ]
        );    
        console.log('Total: ', leads);
    res.send(leads);
}


module.exports = {
    findLeads,
    findVehiclesOfInterest,
    findLeadTypes,
    findTimesFrame
}