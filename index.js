var dados = []

function PopulaTabela() { //busca os dados do cache
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("") //jquery, limpa conteúdo da tabela (id + tabela)

        dados.forEach(function (item) {
            //Template String
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Formacao}</td>
                <td><button type ="button" class="btn btn-primary"><i class="fa fa-edit" /></button></td>
                <td><button type ="button" class="btn btn-danger"><i class="fa fa-trash" /></button></td>
            </tr>`)
        })
    }
}

$(function () {

    //Executa ao carregar
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela()
    }

    $("#btnSalvar").click(function(){
        //Evento do botão salvar

        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Formacao = $("#txtFormacao").val()

        let registro = {}

        registro.Nome = Nome
        registro.Sobrenome = Sobrenome
        registro.DtNascimento = DtNascimento
        registro.Formacao = Formacao

        //atribuiremos o tamanho do array + 1 como ID
        if(dados != null){
            registro.ID = dados.length + 1
        }else {
            registro.ID = 1
        }

        if(dados){
            dados.push(registro)
        }else {
            dados = [registro]
        }
        
        alert("Registro salvo com sucesso")
        $("#modalRegistro").modal("hide") //fecha a modal após clicar em salvar

        //limpar campos do modal
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtDtNascimento").val("")
        $("#txtFormacao").val("")

        PopulaTabela()
    })
})