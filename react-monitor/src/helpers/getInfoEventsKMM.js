

export const getInfoEventsKMM = async() => {
    const resp = await fetch('http://localhost:7979/infoEvents');
    const data = await resp.json();
    if(data && data.length > 1){
        data.sort((a, b) => b.nameEvent > a.nameEvent);
    }
    return data;

}
