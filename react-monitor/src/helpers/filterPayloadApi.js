
    export const filterPayload = (payload, api) =>{
        switch (api.id) {
          case 10://RequestPOVINdata
            if(payload.customerType = "GCUCUIN"){
              payload.companyInfo = null;
              payload.customerInfo.title = fiterTitle( payload.customerInfo.title );
            }else{
              payload.customerInfo = null;
            }
            break;    
          default:
              break;
        }
        return payload;
      }
  
      const fiterTitle = (title) =>{
        switch (title) {
          case 'Mr':
            title = 'Mr.';
            break;    
          case 'Miss':
            title = 'Miss.';
            break;    
          case 'Mr':
            title = 'Mrs.';
            break;    
          case 'Mr':
            title = 'Ms.';
            break;    
          default:
              break;
        }
        return title;
      }