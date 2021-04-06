//Função para cadastrar valores via jSON
function GravaPessoa(id) {
    // conecta ao servidor
    var xmlhttp = new XMLHttpRequest();

    /* Abaixo, as variáveis que serão passadas para o arquivo PHP.
       seu arquivo PHP deverá capturar os dados usando $_GET[]; */

    let pessoa_nome = document.getElementById('pessoa_nome').value;
    let pessoa_sobrenome = document.getElementById('pessoa_sobrenome').value;
    let pessoa_ano = document.getElementById('pessoa_ano').value;
    // let pessoa_ano = new Date($("pessoa_ano").val()).toLocaleDateString("pt-br", {
    //     timeZone: "UTC"
    // })
    let pessoa_formacao = document.getElementById('pessoa_formacao').value;

    //ATENÇÃO PARA O ENDEREÇO DO SEU ARQUIVO PHP, PRESTE MUITA ATENÇÃO...
    var url = 'http://localhost/crud-mysql-javascript/core/gravar-pessoa.php?';

    if (id === undefined) {
        url += 'pessoa_id=' + '&pessoa_nome=' + pessoa_nome + '&pessoa_sobrenome=' + pessoa_sobrenome + '&pessoa_ano=' + pessoa_ano + '&pessoa_formacao=' + pessoa_formacao;
    } else {
        url += 'pessoa_id=' + id + '&pessoa_nome=' + pessoa_nome + '&pessoa_sobrenome=' + pessoa_sobrenome + '&pessoa_ano=' + pessoa_ano + '&pessoa_formacao=' + pessoa_formacao;
    }

    //monto a url com os parametros.
    console.log(url); // teste, ajuda a encontrar erros na hora de programar a url.
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    //alert("Gravado com sucesso no servidor"); /* OPCIONAL, Remova as barras do início */

    if (id === undefined) {
        alert("Registro salvo com sucesso")
    } else {
        alert("Registro alterado com sucesso")
    }

    $("#modalRegistro").modal("hide") //fecha a modal após clicar em salvar

    ConsultaPessoa();
    document.getElementById('pessoa_nome').value = "";
    document.getElementById('pessoa_sobrenome').value = "";
    document.getElementById('pessoa_ano').value = "";
    document.getElementById('pessoa_formacao').value = "";
    document.getElementById('pessoa_nome').focus();
}

//Função para consultado dados via jSON
function ConsultaPessoa() {

    // conecta ao servidor
    var xmlhttp = new XMLHttpRequest();

    //ATENÇÃO PARA O ENDEREÇO DO SEU ARQUIVO PHP, PRESTE MUITA ATENÇÃO...
    var url = "http://localhost/crud-mysql-javascript/core/consulta-pessoa.php";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                ConectaServidor(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function ConectaServidor(response) {
        if(response === ' ') {
            document.getElementById("btnExcel").disabled = true
            return false
        } else{
            document.getElementById("btnExcel").disabled = false
            var dados = JSON.parse(response); //faz a conversão do texto da WEB para JSON
        }
        
        //Vamos montar uma tabela (<TABLE>) para ser exibida no index.html
        var conteudo = "<table class='table'><tr>" +
            "<th>ID</th>" +
            "<th>Nome</th>" +
            "<th>Sobrenome</th>" +
            "<th>Ano</th>" +
            "<th>Formação</th>" +
            "<th>Editar</th>" +
            "<th>Excluir</th>" +
            "</tr>";

        // O for() vai montar a linha (<TR>) da tabela
        for (let i = 0; i < dados.length; i++) //dados.length retorna o tamanho do vetor.
        {
            // SEM TEMPLATE STRING
            // conteudo += "<tr><td>" + dados[i].pessoa_id +
            //     "</td><td>" + dados[i].pessoa_nome +
            //     "</td><td>" + dados[i].pessoa_sobrenome +
            //     "</td><td>" + dados[i].pessoa_ano +
            //     "</td><td>" + dados[i].pessoa_formacao +
            //     "<td><button type='button' class='btn btn-primary' onclick='AlterarRegistro(" + dados[i].pessoa_id + ")'><i class='fa fa-edit' /></button></td>" +
            //     "<td><button type='button' class='btn btn-danger' onclick='ApagarRegistro(" + dados[i].pessoa_id + ");'><i class='fa fa-trash' /></button></td>" +
            //     "</tr>";

            // COM TEMPLATE STRING
            conteudo += `<tr>
            <td>${dados[i].pessoa_id}</td>
            <td>${dados[i].pessoa_nome}</td>
            <td>${dados[i].pessoa_sobrenome}</td>
            <td>${dados[i].pessoa_ano.substr(8, 2) + '/' + dados[i].pessoa_ano.substr(5, 2) + '/' + dados[i].pessoa_ano.substr(0, 4)}</td>
            <td>${dados[i].pessoa_formacao}</td>
            <td><button type='button' class='btn btn-primary' onclick='AlterarRegistro( ${dados[i].pessoa_id} )'><i class='fa fa-edit' /></button></td>
            <td><button type='button' class='btn btn-danger' onclick='ApagarRegistro( ${dados[i].pessoa_id} );'><i class='fa fa-trash' /></button></td>
            </tr>`;
        }
        conteudo += "</table>";
        // console.log(conteudo); // este é apenas um teste, te ajuda a encontrar os erros na hora de montar a tabela, use o console do navegador para depurar.
        document.getElementById("conteudoJSON").innerHTML = conteudo;
    }

}

function ApagarRegistro(id) {

    let _confirm = confirm("Deseja realmente excluir esse registro?")

    if (_confirm) { //procurar o id dentro do array
        // conecta ao servidor
        var xmlhttp = new XMLHttpRequest();

        //ATENÇÃO PARA O ENDEREÇO DO SEU ARQUIVO PHP, PRESTE MUITA ATENÇÃO...
        var url = "http://localhost/crud-mysql-javascript/core/deletar-pessoa.php";

        //monto a url com os parametros.
        url += "?" + 'pessoa_id=' + id
        console.log(url); // teste, ajuda a encontrar erros na hora de programar a url.
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        //alert("Gravado com sucesso no servidor"); /* OPCIONAL, Remova as barras do início */

        setTimeout(function () {
            ConsultaPessoa();
        }, 500); //5000 = 5 segundos

    }
}

function AlterarRegistro(id) {
    $("#modalRegistro").modal("show") //exibe modal

    // conecta ao servidor
    var xmlhttp = new XMLHttpRequest();

    //ATENÇÃO PARA O ENDEREÇO DO SEU ARQUIVO PHP, PRESTE MUITA ATENÇÃO...
    var url = "http://localhost/crud-mysql-javascript/core/alterar-pessoa.php";

    //monto a url com os parametros.
    url += "?" + 'pessoa_id=' + id

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            ConectaServidor(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function ConectaServidor(response) {
        var dados = JSON.parse(response); //faz a conversão do texto da WEB para JSON

        //Populando o modal
        for (let i = 0; i < dados.length; i++) //dados.length retorna o tamanho do vetor.
        {
            $("#pessoa_nome").val(dados[i].pessoa_nome)
            $("#pessoa_sobrenome").val(dados[i].pessoa_sobrenome)
            $("#pessoa_ano").val(dados[i].pessoa_ano.substr(0, 10))
            $("#pessoa_formacao").val(dados[i].pessoa_formacao)
            alert(pessoa_ano.val())
        }
    }

    document.getElementById("btnSalvar").innerHTML = "Alterar"
    // document.getElementById("btnSalvar").removeAttribute("onClick");
    document.getElementById("btnSalvar").setAttribute('onClick', 'GravaPessoa(' + id + ')');
}

function LimpaCamposModal() {
    document.getElementById('pessoa_nome').value = "";
    document.getElementById('pessoa_sobrenome').value = "";
    document.getElementById('pessoa_ano').value = "";
    document.getElementById('pessoa_formacao').value = "";
    document.getElementById('pessoa_nome').focus();

    document.getElementById("btnSalvar").innerHTML = "Salvar"
    // document.getElementById("btnSalvar").removeAttribute("onClick");
    document.getElementById("btnSalvar").setAttribute('onClick', 'GravaPessoa()');
}

window.onload = ConsultaPessoa(); //Carrega a tabela junto com a página.