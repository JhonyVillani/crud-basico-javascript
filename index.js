var dados = []

function PopulaTabela(){ //busca os dados do cache
    if (Array.isArray(dados)){

        $("#tblDados tbody").html("") //jquery, limpa conteúdo da tabela (id + tabela)
        dados.forEach(function (item) {
            //Template String
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Formacao}</td>
            </tr>`)
        })
    }
}

$(function (){
    //Executa ao carregar
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela
    }
})