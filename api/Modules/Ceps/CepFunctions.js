const axios = require("axios");

async function reqCep(arr){
    var arrayFinal = []
    for(let i = 0; i < arr.length; i++){
        cep = arr[i];
        var result = await axiosFind(cep);
        arrayFinal.push(result);
    }
    return arrayFinal;
}

function axiosFind(cep){
    return new Promise((resolve, reject) => {
        axios.get('https://viacep.com.br/ws/'+cep+'/json/').then(result => {
            if(result.data.erro == true){
                reject('O cep: ' + cep + ' é invalido!');
            }else{
                resolve(result.data)
            }
        });
    });
}

module.exports = {reqCep};

