

export const getDataEventKMM = async(idEvent) => {
    const resp = await fetch(`http://localhost:7979/dataEvents/${idEvent}`);
    const data = await resp.json();
    if(data && data.length > 1){
        //add property index requiered for table
        data.map((item,index) => item["key"] = index);
        data.sort((a, b) => b.total - a.total);
    }
    return data;
}
