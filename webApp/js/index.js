$(()=>{
    //Axios
    function axiosPost(link, obj){
        return new Promise((resolve, reject) => {
            try{
                axios.post(link, obj).then(response => {
                    resolve(response);
                }).catch(err => {
                    reject('Erro');
                });;
            }catch{
                reject('Erro');
            };
            
        });
    }

    function axiosGet(link){
        return new Promise((resolve, reject) => {
            axios.get(link).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    //palindromos
    async function palindromosRequest(){
        var inter1 = $('#inter1').val();
        var inter2 = $('#inter2').val();

        var link = 'http://localhost:8080/palindromos'
        var post = {
            inter1,
            inter2
        }
        var list = '';
        
        var response = await axiosPost(link, post);
        var palindromos = response.data;
        
        for(let i = 0; i < palindromos.length; i++){
            list +=`<div class="palindromo">${palindromos[i]}</div>`;
        }
        
        $('#palindromos').html(list);
        
    }

    //Troco
    async function axiosTroco(){
        var val1 = $('#valorCompra').val();
        var val2 = $('#valorEntregue').val();
        var post = {val1, val2}
        
        var link = 'http://localhost:8080/calculoTroco';
        
        var response = await axiosPost(link, post);

        $('#troco').val(response.data.trocoTotal);
        $('#notas100').val(response.data.notas100);
        $('#notas10').val(response.data.notas10);
        $('#notas1').val(response.data.notas1);
        $('#compra').val(val1);
        $('#entregue').val(val2);

    }

    //CEPS
    async function cepsList(arr){
        var link = 'http://localhost:8080/ceps';
        var post = {
            ceps: arr
        } 
        var response = await axiosPost(link, post);
        console.log(response);
        var result = response.data;
        var newlistCep = '';
        console.log(result);
        for(let i = 0; i < result.length; i++){
            var cep = result[i];
            newlistCep +=
            `<div class="cep"> <h5 class="cep-title"> Cep: ${cep.cep} </h5>
            <p class="cidade"> Cidade: ${cep.localidade} - ${cep.uf} </p>
            <p class="bairro"> Rua ${cep.logradouro} ${cep.complemento} - ${cep.bairro} </p></div>
            `                        
        }
        $('#ceps').html(newlistCep);
        resolve(true);
    }

    var listCep = '';
    function cepArrayValidation(str){
        if(str.length == 8){
            listCep += `<div class="cep"><h5 class="cep-title"> ${str} <h5></div>`
            $('#ceps').html(listCep);
            return str;
        }else{
            return false;
        }
        
    }

    var arrCeps = [];
    async function mainCep(){
        var valu = $('#cep').val();
        cep = valu.replace(/\D/g, '');
        
        var cepValidation = cepArrayValidation(cep);
        console.log(cepValidation)
        cepValidation ? arrCeps.push(cepValidation) : alert('Informe um cep valido');

        if(arrCeps.length == 5){
            $('#adicionarCep').attr('disabled', '');
            console.log(arrCeps)
            cepsList(arrCeps);
        }
    }

    //Carros
    async function saveCarros(){
        var link = 'http://localhost:8080/veiculo';

        var tipo = $('#tipo').val()
        var modelo = $('#modelo').val();
        var ano = $('#ano').val();
        var portas = $('#portas').val();;
        var marca = $('#marca').val();
        var passageiros = $('#passageiros').val();

        if(tipo == "" || modelo == "" || ano == "" || portas > 4 || portas < 2 || marca == "" ){
            alert('Verifique os campos e tente novamente!');
        }else{
            var post = {tipo, modelo, ano, portas, marca, passageiros};
            axiosPost(link, post);
        } 
    }

    $('#tipo').change(()=>{
        var valid = $('#tipo').val();
        
        if(valid == 'moto'){
            $('#portas').hide();
            $('#labelPortas').hide();

            $('#passageiros').show();
            $('#labelPassageiros').show();
        }else{
            $('#portas').show();
            $('#labelPortas').show();

            $('#passageiros').hide();
            $('#labelPassageiros').hide();
        }
        
    })

    async function viewCars(){
        var link = 'http://localhost:8080/veiculos';
        var response = await axiosGet(link);
        var results = response.items;
        var list = ''
        results.forEach(e => {
            if(e.tipo == 'carro'){
                list += `
                <div class="carro">
                    <img src="./img/carro.png" class="car-img" alt="">
                    <div class="infos">
                        <p>Modelo: <b>${e.modelo}</b></p>
                        <p>Marca: <b>${e.marca}</b></p>
                        <p>Ano: <b>${e.ano}</b></p>
                        <p>Portas: <b>${e.portas}</b></p>
                    </div>
                </div> 
                
                `
            }else{
                list += `
                <div class="moto">
                    <img src="./img/moto.png" class="moto-img" alt="">
                    <div class="infos">
                    <p>Modelo: <b>${e.modelo}</b></p>
                    <p>Marca: <b>${e.marca}</b></p>
                    <p>Ano: <b>${e.ano}</b></p>
                    <p>Passageiros: <b>${e.passageiros}</b></p>
                    </div>
                </div> 
                `
            }
          
        });

        $('#cars').html(list);
    }


    //Palindromos
    $('#enviarpalindromos').click(() => {
        palindromosRequest();
    });

    //Caixa
    $('#calcularTroco').click(() => {
        axiosTroco();
    });

    //CEP
    $('#adicionarCep').click(() => {
        mainCep();
    });

    //Carro
    $('#criarCarro').click(() => {
        saveCarros();
    });

    $('#verCarros').click(() => {
        viewCars();
    });
    
    viewCars();
});

