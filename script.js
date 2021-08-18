function adicionarDado(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl){
    var tabela = document.getElementById("tabela") /// Realizo a chamada da tabela

    if(usuarioEl.value == '' || emailEl.value == '' || telefoneEl.value == '' || dataEl.value == ''){ /// Realiza tratamento caso algum campo esteja vazio
        alert('Preencha todos os campos para realizar o cadastro.')
        return
    }

    var result = dataAtual() /// Função que pega data atual para tratamento da data inserida pelo usuário
    if(dataEl.value > result){ /// Caso o valor retornado na variável result(data do dia de hoje, atualizando dia a dia) seja menor a data inserida pelo usuário, o mesmo recebe um alerta informando que a data é invalida, sendo necessário informar novamente
        alert('A data de nascimento informada é inválida, por favor, verifique e tente novamente.')
        return
    }

    var nomesCadastrados = document.getElementsByClassName("nomes"); /// Busca todos as classes "nomes" e armazena na variável 'nomesCadastrados'
    for(var j = 0; j < nomesCadastrados.length; j++){  /// Laço percorre todo o elemento para tentar identificar se tem algum email repetido
        if(nomesCadastrados[j].innerHTML === usuarioEl.value){ /// Caso ele encontre, irá emitir um alerta ao usuário e retornar, impedindo o cadastrado do nome caso já esteja no sistema
            alert('O nome inserido é inválido, pois já foi utilizado para o cadastro, verifique e tente novamente.')
            return
        }
    }

    var valida_Email = validaEmail(emailEl.value) /// Variável recebe valor da função que valida o email
    if(valida_Email == false){ /// Caso retorne falso, significa que o email não é valido, sendo assim, informando ao usuário e solicitando a correção
        alert('O email inserido é inválido, verifique e tente novamente.')
        return
    }

    var emailsCadastrados = document.getElementsByClassName("emails"); /// Busca todos as classes "emails" e armazena na variável 'emailsCadastrados'
    for(var i = 0; i < emailsCadastrados.length; i++){  /// Laço percorre todo o elemento para tentar identificar se tem algum email repetido
        if(emailsCadastrados[i].innerHTML === emailEl.value){ /// Caso ele encontre, irá emitir um alerta ao usuário e retornar, impedindo o cadastrado do email caso já esteja no sistema
            alert('O email inserido é inválido, pois já foi utilizado para o cadastro, verifique e tente novamente.')
            return
        }
    }

    var valida_Telefone = validaTelefone(telefoneEl.value) /// A variável recebe um valor da função que valida o telefone
    if(valida_Telefone == false){ /// Caso retorno falso, significa que o telefone é invalido, sendo assim, informa ao usuário para que seja feito a correção
        alert('O telefone inserido é inválido, verifique e tente novamente.')
        return
    }

    var quantidadeLinhas = tabela.rows.length /// Verifico a quantidade de linhas usando o row.length
    var linha = tabela.insertRow(quantidadeLinhas) /// Insiro uma linha ao chamar a função
    // linha.addEventListener('click', excluirDado)

    /// insertCell realiza a inserção de um <td> hna tabela
    var cellUsuario = linha.insertCell(0)
    var cellEmail = linha.insertCell(1)
    var cellTelefone = linha.insertCell(2)
    var cellData = linha.insertCell(3)
    var cellSexo = linha.insertCell(4)
    var lixo = linha.insertCell(5)

    /// Atribui o valor inserido no formulário a tabela com seu respectivo valor e linha, assim como foi definido acima
    cellUsuario.innerHTML = usuarioEl.value
    cellEmail.innerHTML = emailEl.value
    cellTelefone.innerHTML = telefoneEl.value
    cellData.innerHTML = dataEl.value
    cellSexo.innerHTML = sexoEl.value
    lixo.innerHTML = '<i class="fas fa-trash-alt"></i>'

    console.log(dataEl.value)

    cellData.innerHTML = new Date(dataEl.value).toLocaleDateString('pt-br', {timeZone: 'UTC'}) /// Realiza a troca da data do padrão yyyy-mm-dd para o padrão brasileiro dd/mm/yyyy
    /// OBS: {timeZone: 'UTC'} = https://stackoverflow.com/questions/32877278/tolocaledatestring-is-subtracting-a-day/32877402

    lixo.setAttribute('onclick', `excluirDado(this)`) /// Atribui esse atributo ao "lixo", que será o conteudo na linha 33
    cellEmail.setAttribute('class', `emails`) /// Atribui a 'class' emails em todos os <td> que serão armazenados o email na tabela
    cellUsuario.setAttribute('class', `nomes`) /// Atribui a 'class' nomes em todos os <td> que serão armazenados o usuario na tabela

    alert('Cadastrado realizado com sucesso.')

    limparFormulario(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl) /// Chamada da função para limpeza do formulário após o preenchimento
}

function excluirDado(element){
    var resultado = confirm('Você realmente deseja deletar esse cadastro?') /// Verifico com o usuário se ele confirma essa ação, retornando true ou false
    if(resultado == true){
        // document.getElementById("tabela").deleteRow(numRow);
        element.parentElement.remove() /// Pego o pai/mae do element, que neste caso, é o tr, sendo assim, realizo a exclusão do mesmo
        alert('Cadastro deletado com sucesso!')
    }
    else{
        alert('Cadastro não deletado.')
    }
}

function limparFormulario(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl){
    if(usuarioEl.value == '' && emailEl.value == '' && telefoneEl.value == '' && dataEl.value == ''){ /// Realiza tratamento caso algum campo esteja vazio
        alert('Não existe nenhum dado para ser limpado.')
    }
    else{
        usuarioEl.value = ''
        emailEl.value = ''
        telefoneEl.value = ''
        dataEl.value = ''
        sexoEl.value = 'Outros'
    }
}

function validaEmail(email){
    var condicoes = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; /// Utilizando regex, atribuio quais são os valores aceitaveis, onde esses são armazenados na variável condições
    return condicoes.test(email) /// Realiza um teste do email que é recebido por parâmetro e faz a verificacão se o mesmo é aceitável dentro das condições da variável condições, com isso, irá retornar o valor false ou true, onde é tratado da maneira correta dentro da função 'adicionarDado' 
}

function validaTelefone(telefone){
    var condicoes = /^\({0,1}[1-9]{2}\){0,1} {0,1}9 {0,1}[0-9]{4}-{0,1}[0-9]{4}$/; /// Utilizando regex, atribuio quais são os valores aceitaveis, onde esses são armazenados na variável condições
    return condicoes.test(telefone) /// Realiza um teste do email que é recebido por parâmetro e faz a verificacão se o mesmo é aceitável dentro das condições da variável condições, com isso, irá retornar o valor false ou true, onde é tratado da maneira correta dentro da função 'adicionarDado' 
}

function dataAtual(){ /// Lógica utilizada para sempre retornar a data do dia atualizado
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    if(dia < 10){
        dia = '0'+dia
    }
    if(mes < 10){
        mes = '0'+mes
    }

    var result = ano +'-'+ mes +'-'+ dia

    return result
}

function mascara(inputEl){ /// Função que realiza 'preenchimento autoático' no momento que o usuário inserir os dados relacionado ao seu telefone
    var telefoneDigitado = inputEl.value

    var telefone = telefoneDigitado.replace(/\D/g, "");
    telefone = telefone.replace(/^0/, "");

    if(telefone.length > 10){
        telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    else if(telefone.length > 5){
        telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    else if(telefone.length > 2){
        telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    else{
        telefone = telefone.replace(/^(\d*)/, "($1");
    }

    if(telefone != inputEl.value){
        inputEl.value = telefone;
    }
}


function formatPattern(str, pattern, format, example) {
    if(!str || !pattern || !format || !example)
        return false

    const exToComplete = example.slice(str.length)
    const strCompleted = str + exToComplete
    const strCompletedFormated = strCompleted.replace(pattern, format)
    const strFormated = [...exToComplete].reverse().reduce((acc, e)=> 
        acc.slice(0, acc.lastIndexOf(e)), strCompletedFormated)
    
    return strCompletedFormated == strCompleted ? false : strFormated
}

function applyMaskTel({target:inputEl, data:lastChar}) {
    const pattern = /^(\d{2})(\d)(\d{4})(\d{4})$/
    const format = '($1) $2 $3-$4'
    const example = '11911111111'

    if(lastChar) {
        let value = inputEl.value.replace(/\D/g,'')
        if(value.length > example.length) {
            inputEl.value = inputEl.value.slice(0,-1)
            value = inputEl.value.replace(/\D/g,'')
        }

        const valFormated = formatPattern(value, pattern, format, example)
        inputEl.value = valFormated || inputEl.value.slice(0,-1)
        inputEl.selectionStart = inputEl.value.length
    }
}