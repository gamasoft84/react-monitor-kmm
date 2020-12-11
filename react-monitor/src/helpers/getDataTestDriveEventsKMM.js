

export const getDataTestDriveEventsKMM = async(idEvent) => {
    const resp = await fetch(`http://localhost:7979/dataTestsDriveEvents/${idEvent}`);
    const data = await resp.json();
    return data;
}
