function adicionarDado(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl){
    var tabela = document.getElementById("tabela")

    if(usuarioEl.value == '' || emailEl.value == '' || telefoneEl.value == '' || dataEl.value == ''){
        alert('Preencha todos os campos para realizar o cadastro.')
        return
    }

    var result = dataAtual()
    if(dataEl.value > result){
        alert('A data de nascimento informada é inválida, por favor, verifique e tente novamente.')
        return
    }

    var nomesCadastrados = document.getElementsByClassName("nomes");
    for(var j = 0; j < nomesCadastrados.length; j++){
        if(nomesCadastrados[j].innerHTML === usuarioEl.value){
            alert('O nome inserido é inválido, pois já foi utilizado para o cadastro, verifique e tente novamente.')
            return
        }
    }

    var valida_Email = validaEmail(emailEl.value)
    if(valida_Email == false){
        alert('O email inserido é inválido, verifique e tente novamente.')
        return
    }

    var emailsCadastrados = document.getElementsByClassName("emails");
    for(var i = 0; i < emailsCadastrados.length; i++){
        if(emailsCadastrados[i].innerHTML === emailEl.value){
            alert('O email inserido é inválido, pois já foi utilizado para o cadastro, verifique e tente novamente.')
            return
        }
    }

    var valida_Telefone = validaTelefone(telefoneEl.value)
    if(valida_Telefone == false){
        alert('O telefone inserido é inválido, verifique e tente novamente.')
        return
    }

    var quantidadeLinhas = tabela.rows.length
    var linha = tabela.insertRow(quantidadeLinhas)

    var cellUsuario = linha.insertCell(0)
    var cellEmail = linha.insertCell(1)
    var cellTelefone = linha.insertCell(2)
    var cellData = linha.insertCell(3)
    var cellSexo = linha.insertCell(4)
    var lixo = linha.insertCell(5)

    cellUsuario.innerHTML = usuarioEl.value
    cellEmail.innerHTML = emailEl.value
    cellTelefone.innerHTML = telefoneEl.value
    cellData.innerHTML = dataEl.value
    cellSexo.innerHTML = sexoEl.value
    lixo.innerHTML = '<i class="fas fa-trash-alt"></i>'

    console.log(dataEl.value)

    cellData.innerHTML = new Date(dataEl.value).toLocaleDateString('pt-br', {timeZone: 'UTC'})

    lixo.setAttribute('onclick', `excluirDado(this)`)
    cellEmail.setAttribute('class', `emails`)
    cellUsuario.setAttribute('class', `nomes`)

    alert('Cadastrado realizado com sucesso.')

    limparFormulario(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl)
}

function excluirDado(element){
    var resultado = confirm('Você realmente deseja deletar esse cadastro?')
    if(resultado == true){
        element.parentElement.remove()
        alert('Cadastro deletado com sucesso!')
    }
    else{
        alert('Cadastro não deletado.')
    }
}

function limparFormulario(usuarioEl, emailEl, telefoneEl, dataEl, sexoEl){
    if(usuarioEl.value == '' && emailEl.value == '' && telefoneEl.value == '' && dataEl.value == ''){
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
    var condicoes = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return condicoes.test(email)
}

function validaTelefone(telefone){
    var condicoes = /^\({0,1}[1-9]{2}\){0,1} {0,1}9 {0,1}[0-9]{4}-{0,1}[0-9]{4}$/;
    return condicoes.test(telefone)
}

function dataAtual(){
    var data = new Date();

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

function mascara(inputEl){
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