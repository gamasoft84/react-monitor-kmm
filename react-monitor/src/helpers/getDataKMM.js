

export const getDataKMM = async(type) => {
    const resp = await fetch(`https://dashboardkmmmysalesback.azurewebsites.net/data${type}ByDay`);
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.total - a.total);
    }
    return data;

}
