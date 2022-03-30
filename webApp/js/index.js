$(()=>{

    //Palindromos
    $('#enviarpalindromos').click(() => {
        var inter1 = $('#inter1').val();
        var inter2 = $('#inter2').val();
        var post = {
            inter1,
            inter2
        }
        var list = '';

        axios.post('http://localhost:8080/palindromos', post).then(response => {
            var palindromos = response.data;

            for(let i = 0; i < palindromos.length; i++){
                list += "<li>"+ palindromos[i] +"</li>";
            }
            
            $('#palindromos').html(list);
        }).catch(err => {
            console.log(err);
        });
    });

    //Caixa
    $('#calcularTroco').click(() => {
        
        var val1 = $('#valorCompra').val();
        var val2 = $('#valorEntregue').val();
        
        $('#compra').html(val1);
        $('#entregue').html(val2);

        var post = {val1, val2}
        axiosTroco(post);
        
    });

    async function axiosTroco(obj){
        axios.post('http://localhost:8080/calculoTroco',obj).then(response => {
            var troco = response.data.trocoTotal;    
            var notas100 = response.data.notas100;
            var notas10 = response.data.notas10;
            var notas1 = response.data.notas1;

            $('#troco').html(troco);
            $('#notas100').html(notas100);
            $('#notas10').html(notas10);
            $('#notas1').html(notas1);
        });
    }

    //CEP
    var arrCeps = [];
    var listCep = '';

    $('#adicionarCep').click(() => {

        var cep = $('#cep').val();
        cep = cep.replace(/\D/g, '');

        if(cep.length == 8){
            arrCeps.push(cep);

            listCep += '<li>'+cep+'</li>'
            $('#ceps').html(listCep);

            if(arrCeps.length == 5){
                $('#adicionarCep').attr('disabled', '');
                mainCeps(arrCeps);
            }
        }else{
            alert('Informe um cep valido!');
        }

    });

    async function cepsList(arr){
        return new Promise((resolve, reject) => {
            post = {
                ceps: arr
            }
            axios.post('http://localhost:8080/ceps', post).then(result => {
                resolve(result.data);
            }).catch(err => {
                console.log(err);
                reject(false);
            });
        });
    }

    async function mainCeps(arr){
        var newlistCep = '';

        var result = await cepsList(arr);
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
    }



});
