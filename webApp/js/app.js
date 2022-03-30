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
            var palindromos = response.data.palindromos;
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
        
        console.log(val1, val2);

        $('#compra').html(val1);
        $('#entregue').html(val2);

        var post = {val1, val2}
        axios.post('http://localhost:8080/calculoTroco',post).then(response => {
            var troco = response.data.trocoTotal;    
            var notas100 = response.data.notas100;
            var notas10 = response.data.notas10;
            var notas1 = response.data.notas1;
            
            $('#troco').html(troco);
            $('#notas100').html(notas100);
            $('#notas10').html(notas10);
            $('#notas1').html(notas1);



        }).catch(err => {
            if(err){
                alert('Erro ao realizar o calculo, verifique se o valor entregue é suficiente para realizar o pagamento!');
            }
        })
    });

    //CEP
    var arrCeps = [];
    var listCep = '';
    $('#adicionarCep').click(() => {
        var cep = $('#cep').val();
        cep = cep.replace(/\D/g, '');
       
        if(cep.length < 8 || cep.length > 8){
            alert('Informe um cep valido!');
        }else{
            arrCeps.push(cep);
            console.log(arrCeps);
            listCep += '<li>'+cep+'</li>'
            $('#ceps').html(listCep);
            if(arrCeps.length == 5){
                post = {
                    ceps: arrCeps
                }

                axios.post('http://localhost:8080/ceps', post).then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err);
                });
                                
                $('#cep').attr('disabled', '');
                alert('Numero de CEPS atingido!');
            }
        }

    });
});