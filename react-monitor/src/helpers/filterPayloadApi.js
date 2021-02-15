
    export const filterPayload = (payload, api) =>{

        switch (api.id) {
          case 6://SubmitCheckinLeadData
          if(payload.contents){
            console.log('fiterGender');
            payload.contents.forEach(element => {
              if(element.customerType = "GCUCUIN"){
                element.companyInfo = null;
                element.customerInfo.gender = fiterGender( element.customerInfo.gender );
              }else{
                element.customerInfo = null;
              }
            });
          }
          break;    
          case 10://RequestPOVINdata
          console.log('fiterTitle and fiterGender');
            if(payload.customerType = "GCUCUIN"){
              payload.companyInfo = null;
              payload.customerInfo.title = fiterTitle( payload.customerInfo.title );
              payload.customerInfo.gender = fiterGender( payload.customerInfo.gender );
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
          default:
              break;
        }
        return gender;
      }