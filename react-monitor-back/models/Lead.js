const { model } = require("mongoose");
const mongoose = require('mongoose');

const {Schema} = mongoose;

const LeadSchema = new Schema({
    leadCreatedDate: {type: String, requiered: true},
    leadType: {type: String, requiered: true},
    leadTypeStr: {type: String, requiered: true},
    leadID: {type: String, requiered: true},
    sourceSystemDetail: {type: String, requiered: true},
    firstName: {type: String, requiered: true},
    middleName: {type: String, requiered: true},
    lastName1: {type: String, requiered: true},
    lastName2: {type: String, requiered: true},
    workPhone: {type: String, requiered: true},
    homePhone: {type: String, requiered: true},
    mobilePhone: {type: String, requiered: true},
    email: {type: String, requiered: true},
    purchaseIntensionTimeFrame: {type: String, requiered: true},
    purchaseIntensionTimeFrameStr: {type: String, requiered: true},
    vehicleNameOfInterest1: {type: String, requiered: true},
    vehicleNameOfInterest2: {type: String, requiered: true},
    vehicleNameOfInterest3: {type: String, requiered: true},
    requestModelName: {type: String, requiered: true},
    requestModelVersion: {type: String, requiered: true},
    requestModelColorExt: {type: String, requiered: true},
    requestModelColorInt: {type: String, requiered: true},
    requestModelOption: {type: String, requiered: true},
    requestDealerCode: {type: String, requiered: true},
    requestDate: {type: String, requiered: true},
    comment: {type: String, requiered: true}
})


module.exports = mongoose.model('lead',LeadSchema) 
