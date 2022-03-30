$(()=>{
    //Axios
    async function axiosPost(link, obj){
        return new Promise((resolve, reject) => {
            axios.post(link, obj).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
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
            list += "<li>"+ palindromos[i] +"</li>";
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

        $('#troco').html(response.data.trocoTotal);
        $('#notas100').html(response.data.notas100);
        $('#notas10').html(response.data.notas10);
        $('#notas1').html(response.data.notas1);
        $('#compra').html(val1);
        $('#entregue').html(val2);

    }

    //CEPS
    async function cepsList(arr){
        var link = 'http://localhost:8080/ceps';
        var post = {
            ceps: arr
        } 
        var response = await axiosPost(link, post);
        var result = response.data;
        var newlistCep = '';
        for(let i = 0; i < result.length; i++){
            var cep = result[i];
            newlistCep +=
            `<li> 
            Cep: ${cep.cep}
            UF: ${cep.uf}
            Cidade: ${cep.localidade}
            Bairro: ${cep.bairro}
            Rua: ${cep.logradouro}
            DDD: ${cep.ddd}
            </li>`                        
        }
        $('#ceps').html(newlistCep);
        resolve(true);
    }

    var listCep = '';
    function cepArrayValidation(str){
        if(str.length == 8){
            listCep += `<li> ${str} </li>`
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

        if(tipo == "" || modelo == "" || ano == "" || portas > 4 || portas < 2 || marca == "" ){
            alert('Verifique os campos e tente novamente!');
        }else{
            var post = {tipo, modelo, ano, portas, marca};
            axiosPost(link, post);
        }
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
    $('#criarCarro').click(()=>{
        saveCarros();
    })
    
});

