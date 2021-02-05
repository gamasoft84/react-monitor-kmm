import { fetchAGSinToken } from "./fetchApiGateway";
import { getDataApis } from "./getDataKMM";

const userMySales = {
	"user": "mysalesplus",
	"pwd": "$rjgpo%/x5QycR>"
}

const userDms = {
	"user": "IntelisisExcelencia",
    "pwd": "AcvO3NY=sA66K/i",
    "dealerCode:": "B20VAEPL01",
    "dealerName" : "Kia Malinche"
}

const userDmsFail = {
	"user": "SimaCamarena",
    "pwd": "XlEI52dRZT>HwrN",
    "dealerCode:": "B20VACJC03",
    "dealerName" : "Kia Vallarta"
}


const setToken = async (idApi) => {
    
    let api = getDataApis().filter(d => d.id === idApi).shift(); 
    let data;
    switch (api.token) {
        case 'userMySales':
            data = userMySales;
            break;
            case 'userDms':
                data = userDms;
                break;    
            default:
                data = null;
                break;
    }
    if(data != null){
        const resp =  await fetchAGSinToken('token/user', data, 'POST');
        const rt = await resp.json();
        localStorage.setItem('Token', rt.token);
        console.log('Configured token');
    }else{
        localStorage.setItem('Token',null);
        console.log('Request does not require token');
    }
}

export {
    setToken
}