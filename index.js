var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse registro?")

    if (_confirm) { //procurar o id dentro do array
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }

        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtNome").val(item.Nome)
            $("#txtSobrenome").val(item.Sobrenome)
            $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
            $("#txtFormacao").val(item.Formacao)
        }
    })
}

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
                <td><button type ="button" class="btn btn-primary" onclick="javascript: EditaRegistro(${item.ID})"><i class="fa fa-edit" /></button></td>
                <td><button type ="button" class="btn btn-danger" onclick="javascript: ApagaRegistro(${item.ID})"><i class="fa fa-trash" /></button></td>
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

    $("#btnSalvar").click(function () {
        //Evento do botão salvar

        let _id = $("#hdID").val()
        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", {
            timeZone: "UTC"
        })
        let Formacao = $("#txtFormacao").val()

        if (!_id || _id == "0") { //verifica se _id é vazio, e faz o cadastro

            let registro = {}

            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.DtNascimento = DtNascimento
            registro.Formacao = Formacao

            //atribuiremos o tamanho do array + 1 como ID
            if (dados != null) {
                registro.ID = dados.length + 1
            } else {
                registro.ID = 1
            }

            if (dados) { //verifica se é nulo
                dados.push(registro)
            } else {
                dados = [registro]
            }

            alert("Registro salvo com sucesso")
        } else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.DtNascimento = DtNascimento
                    item.Formacao = Formacao
                }
            })
            alert("Registro alterado com sucesso")
        }

        $("#modalRegistro").modal("hide") //fecha a modal após clicar em salvar

        //limpar campos do modal
        $("#hdID").val("0") //importante zerar o hidden field para evitar ações indeejadas por sujeira
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtDtNascimento").val("")
        $("#txtFormacao").val("")

        PopulaTabela()
    })
})