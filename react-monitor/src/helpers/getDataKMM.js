import { fetchSinToken } from "./fetch";

const REACT_APP_BACK_DASHBOARD_MYSALES = process.env.REACT_APP_BACK_DASHBOARD_MYSALES;


export const getInfoEventsKMM = async() => {
    const resp = await fetchSinToken('infoEvents');
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.nameEvent > a.nameEvent);
    }
    return data;
}

export const getDataEventKMM = async(idEvent) => {
    const resp = await fetchSinToken(`dataEvents/${idEvent}`);
    const data = await resp.json();
    if(data && data.length > 1){
        //add property index requiered for table
        data.map((item,index) => item["key"] = index);
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}


export const getDataTestDriveEventsKMM = async(idEvent) => {
    const resp = await fetchSinToken(`dataTestsDriveEvents/${idEvent}`);
    const data = await resp.json();
    return data;
}



export const getDataKMM = async(type) => {
    const resp = await fetch(`${REACT_APP_BACK_DASHBOARD_MYSALES}/data${type}ByDay`);
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}


export const getInfoPriceKMM = async() => {
    const resp = await fetchSinToken('infoPrice');
    const data = await resp.json();
    return data;
}

export const getInfoPdvsKMM = async() => {
    const resp = await fetchSinToken('infoPdvs');
    const data = await resp.json();
    return data;
}

export const getLeadsCrm = async(dateinit, dateEnd) => {
    const resp = await fetchSinToken(`findLeads/${dateinit}/${dateEnd}`);
    const data = await resp.json();
    return data;
}

//summary section
export const getCountByTypeKMM = async(type) => {
    const resp = await fetch(`${REACT_APP_BACK_DASHBOARD_MYSALES}/count${type}ByDay`);
    const total = await resp.json();
    return total;
}

export const getFindVehiclesOfInterest = async() => {
    const resp = await fetchSinToken('findVehiclesOfInterest');
    const data = await resp.json();
    return data;
}

export const findLeadTypes = async() => {
    const resp = await fetchSinToken('findLeadTypes');
    const data = await resp.json();
    return data;
}

export const findTimesFrame = async() => {
    const resp = await fetchSinToken('findTimesFrame');
    const data = await resp.json();
    return data;
}

export const getCountTotalErrorsByTypeKMM = async(type) => {
    const resp = await fetch(`${REACT_APP_BACK_DASHBOARD_MYSALES}/countTotalErrorsByType`);
    const total = await resp.json();
    return total;
}


export const getDataApis = () => {
    const data = [
            {id: 1	, path: "rest/internal/", name: "SubmitLeadData",             token: "" },
            {id: 2	, path: "rest/dms/",      name: "SubmitPOVINdata",            token: "userDms" },
            {id: 3	, path: "rest/dms/",      name: "SubmitInvoiceVINdata",       token: "userDms" },
            {id: 4	, path: "rest/nodefine/", name: "SubmitVehicleDetailData",    token: "" },
            {id: 5	, path: "rest/nodefine/", name: "SubmitStaffData",            token: "" },
            {id: 6	, path: "rest/mysales/",  name: "SubmitCheckinLeadData",      token: "userMySales" },
            {id: 7	, path: "rest/mysales/",  name: "SubmitCustomerInformation",  token: "userMySales" },
            {id: 8	, path: "rest/nodefine/", name: "SubmitTestDriveFeedback",    token: "" },
            {id: 9	, path: "rest/mysales/",  name: "RetrieveVehicleStockCount",  token: "userMySales" },
            {id: 10	, path: "rest/mysales/",  name: "RequestPOVINdata",           token: "userMySales" },
            {id: 11	, path: "rest/nodefine/", name: "RetrievePurchaseHistory",    token: "" },
            {id: 15	, path: "rest/nodefine/", name: "SubmitVehicleInfo",          token: "" },
            {id: 16	, path: "rest/nodefine/", name: "SubmitFinancialApproval",    token: "" },
            {id: 17	, path: "rest/nodefine/", name: "SubmitBNPPDVInfo",           token: "" },
            {id: 18	, path: "rest/nodefine/", name: "SubmitBNPUsersInfo",         token: "" },
            {id: 19	, path: "rest/nodefine/", name: "SubmitPromotionalPlans",     token: "" },
            {id: 20	, path: "rest/nodefine/", name: "RetrievePaymentInfo",        token: "" },
            {id: 21	, path: "rest/nodefine/", name: "RequestFinancialQuotation",  token: "" },
            {id: 23	, path: "rest/nodefine/", name: "RequestAnnuityQuotation",    token: "" },
            {id: 24	, path: "rest/nodefine/", name: "SubmitClosedLeadData",       token: "" },
            {id: 25	, path: "rest/nodefine/", name: "SubmitLeadDataScoring",      token: "" }
        ];
        
    return data;
}



export const findRequestByIdApi = async(idApi, top) => {
    const resp = await fetchSinToken('findRequestByIdApi',{idApi, top},'POST');
    const data = await resp.json();  
    return data;
}