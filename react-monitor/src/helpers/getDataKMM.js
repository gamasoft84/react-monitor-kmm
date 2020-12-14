

const URL_BACK = "http://localhost:7979/";



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
    const resp = await fetch(`https://dashboardkmmmysalesback.azurewebsites.net/data${type}ByDay`);
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}