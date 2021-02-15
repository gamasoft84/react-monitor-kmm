const baseUrl = process.env.REACT_APP_API_GATEWAY_BACK;

const fetchAGSinToken = ( endpoint, data, method = 'GET' ) => {
    
    const url = `${ baseUrl }/${ endpoint }`;
    //console.log('URL',url);
    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchAGConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('Token') || '';
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Token': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Token': token
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchAGSinToken,
    fetchAGConToken
}