export const toogleById = (id) => {
    let element = document.getElementById(id);
    if(element){
        if(element.style.display === "none"){
             element.style.display = "block";
        }else{
             element.style.display = "none";
        }
    }
 }


 export const groupBySum = (items, groupByProp, sumProp) => {
    var groups = new Map();
    for (const item of items) {
      if (item[groupByProp] && item[sumProp]) {
        const groupBy = item[groupByProp];
        if (groups.has(groupBy)) {
          const currentValue = groups.get(groupBy);
          groups.set(groupBy, currentValue + item[sumProp]);
        } else {
          groups.set(groupBy, item[sumProp]);
        }
      }
    }
    const sums = [];
    groups.forEach((value, key, m) => {
      sums.push({
        [groupByProp]: key,
        [sumProp]: value
      });
    });
    return sums;
  };


  
export const withCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const objectToArray = (dataObject) => {
    return Object.keys(dataObject).map(idx => dataObject[idx]);
}

/*

[
  ["Kia Vallejo", 13, 0],
  ["Kia Lomas Verdes", 9, 1]
]
*/
export const objectToArrayValues = (dataObject) => {
  dataObject.map(e => delete e['key']);
  return Object.keys(dataObject).map(idx => Object.values(dataObject[idx]));
}


