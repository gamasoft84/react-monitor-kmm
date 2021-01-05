

const URL_BACK = "http://localhost:7979/";
const URL_BACK_DASHBOARD = "https://dashboardkmmmysalesback.azurewebsites.net/";




export const getInfoEventsKMM = async() => {
    const resp = await fetch(URL_BACK + 'infoEvents');
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.nameEvent > a.nameEvent);
    }
    return data;
}

export const getDataEventKMM = async(idEvent) => {
    const resp = await fetch(URL_BACK +  `dataEvents/${idEvent}`);
    const data = await resp.json();
    if(data && data.length > 1){
        //add property index requiered for table
        data.map((item,index) => item["key"] = index);
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}


export const getDataTestDriveEventsKMM = async(idEvent) => {
    const resp = await fetch(URL_BACK + `dataTestsDriveEvents/${idEvent}`);
    const data = await resp.json();
    return data;
}



export const getDataKMM = async(type) => {
    const resp = await fetch(`${URL_BACK_DASHBOARD}data${type}ByDay`);
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}


export const getInfoPriceKMM = async() => {
    const resp = await fetch(URL_BACK + 'infoPrice');
    const data = await resp.json();
    return data;
}

export const getInfoPdvsKMM = async() => {
    const resp = await fetch(URL_BACK + 'infoPdvs');
    const data = await resp.json();
    return data;
}

export const getLeadsCrm = async(dateinit, dateEnd) => {
    const resp = await fetch(`${URL_BACK}findLeads/${dateinit}/${dateEnd}`);
    const data = await resp.json();
    return data;
}

//summary section
export const getCountByTypeKMM = async(type) => {
    const resp = await fetch(`${URL_BACK_DASHBOARD}count${type}ByDay`);
    const total = await resp.json();
    console.log('Total',type);
    return total;
}

export const getFindVehiclesOfInterest = async() => {
    const resp = await fetch(`${URL_BACK_DASHBOARD}findVehiclesOfInterest`);
    const data = await resp.json();
    return data;
}