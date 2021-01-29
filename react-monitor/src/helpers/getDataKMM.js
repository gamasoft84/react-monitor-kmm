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


export const getDataApis = async() => {
    const data = [
            {id: 2	,name: "SubmitPOVINdata"},
            {id: 1	,name: "SubmitLeadData"},
            {id: 3	,name: "SubmitInvoiceVINdata"},
            {id: 4	,name: "SubmitVehicleDetailData"},
            {id: 5	,name: "SubmitStaffData"},
            {id: 6	,name: "SubmitCheckinLeadData"},
            {id: 7	,name: "SubmitCustomerInformation"},
            {id: 8	,name: "SubmitTestDriveFeedback"},
            {id: 9	,name: "RetrieveVehicleStockCount"},
            {id: 10	,name: "RequestPOVINdata"},
            {id: 11	,name: "RetrievePurchaseHistory"},
            {id: 15	,name: "SubmitVehicleInfo"},
            {id: 16	,name: "SubmitFinancialApproval"},
            {id: 17	,name: "SubmitBNPPDVInfo"},
            {id: 18	,name: "SubmitBNPUsersInfo"},
            {id: 19	,name: "SubmitPromotionalPlans"},
            {id: 20	,name: "RetrievePaymentInfo"},
            {id: 21	,name: "RequestFinancialQuotation"},
            {id: 23	,name: "RequestAnnuityQuotation"},
            {id: 24	,name: "SubmitClosedLeadData"},
            {id: 25	,name: "SubmitLeadDataScoring"}
        ];
        
    return data;
}



export const findRequestByIdApi = async(idApi, top) => {
    const resp = await fetchSinToken('findRequestByIdApi',{idApi, top},'POST');
    const data = await resp.json();
    return data;
}