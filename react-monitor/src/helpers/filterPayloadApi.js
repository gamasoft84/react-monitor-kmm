
    export const filterPayload = (payload, api) =>{

        switch (api.id) {
          case 6://SubmitCheckinLeadData
            if(payload.contents){
              console.log('fiterGender');
              payload.contents.forEach(element => {
                if(element.customerType === "GCUCUIN"){
                  element.companyInfo = null;
                  if(element.customerInfo != null){
                    element.customerInfo.gender = fiterGender( element?.customerInfo?.gender );
                  }                
                }else{
                  element.customerInfo = null;
                }
              });
            }
          break; 
          case 7://SubmitCustomerInformation
            console.log('fiterTitle, fiterGender ScName companyID');
            if(payload.customerType === "GCUCUIN"){
              payload.companyInfo = null;
              if(payload.customerInfo != null){
                payload.customerInfo.title = fiterTitle( payload.customerInfo.title );
                payload.customerInfo.gender = fiterGender( payload.customerInfo.gender );
              }
            }else{
              payload.customerInfo = null;
              if(payload.companyInfo != null){
                payload.companyInfo.companyID = validateProperty( payload.companyInfo.companyID, 'GAM9001014I5');
              }
            }
            payload.scName = validateProperty( payload.scName, 'Ricardo Alejandro Estrada Gonzales' );
          break;    
          case 10://RequestPOVINdata
            console.log('fiterTitle, fiterGender and Surburb');
            if(payload.customerType === "GCUCUIN"){
              payload.companyInfo = null;
              if(payload.customerInfo != null){
                payload.customerInfo.title = fiterTitle( payload.customerInfo.title );
                payload.customerInfo.gender = fiterGender( payload.customerInfo.gender );
                payload.customerInfo.surburb = validateProperty( payload.customerInfo.surburb , 'Surburb');                
              }
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


      const fiterGender = (gender) =>{
          switch (gender) {
            case 'GCOGEMA':
              gender = 'MALE';
              break;    
            case 'GCOGEFE':
              gender = 'FEMALE';
              break;    
            case 'GCOGENA':
              gender = 'UNKNOWN';
              break; 
          }      
        return gender;
      }


      const validateProperty = (value, valueDefault) =>{
        if(!value){
          value = valueDefault;
        }
        return value;
      }
