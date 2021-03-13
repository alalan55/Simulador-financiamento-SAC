const campoValor = document.querySelector("#valor");
const campoPrazo = document.querySelector("#prazo");
const campojurosAoAno = document.querySelector("#juros__ano");
const btnCalcular = document.querySelector(".btn__simular");

const prazoResultado = document.querySelector("#prazo_res");
const jurosAoMes = document.querySelector("#juros__ao__mes");
const jurosAcumulados = document.querySelector("#juros__acl");
const jurosAno = 0.08333333333;

const cabecaTabela = document.querySelector(".conteudo__tbl");
const corpoTabela = document.querySelector(".body__table");


var tabelaHead = `
<table  class="bordered striped centered">
                   <thead>
                       <tr>
                           <th class="title__tbl">Prestação</th>
                           <th class="title__tbl">Armotização</th>
                           <th class="title__tbl">Juros</th>
                           <th class="title__tbl">Total</th>
                       </tr>

                   </thead>
`

const anosEmMeses = () => {
    var anos = campoPrazo.value;
    var meses = 12;
    var qtdMeses = anos * meses;

    return qtdMeses;
}
const preencheInputsEntrada = () => {
    campoValor.value = 200000.00;
    campoPrazo.value = 20;
    campojurosAoAno.value = jurosAno.toFixed(2);
}
preencheInputsEntrada();

const calcularJurosMensais = () => {

    let passo1 = 1 + (+campojurosAoAno.value);
    let passo2 = Math.pow(passo1, jurosAno);
    let jurosMensais = passo2 - 1;
    return jurosMensais;
}
const preencherInputsSaida = () => {
    prazoResultado.value = anosEmMeses();
    jurosAoMes.value = calcularJurosMensais();
}
const calcularAmortizacoes = () => { //Parcelas

    let valor = campoValor.value;
    let parcelas = prazoResultado.value;
    let armotizacao = valor / parcelas;
    return armotizacao.toFixed(2);

}
const preencherTabela = () => {

    for (var i = 0; i < anosEmMeses(); i++) {
        var jurosInicial = Number(campoValor.value) - (i * (+calcularAmortizacoes()));
        let juros = jurosInicial * calcularJurosMensais();
        console.log()
        let total = (+calcularAmortizacoes()) + juros;

        var tbl = `
        <tr>
        <td class="tbl__prestacao">${i}</td>
        <td class="tbl__armotizacao">${calcularAmortizacoes()}</td>
        <td class="tbl__juros">${juros.toFixed(2)}</td>
        <td class="tbl__total">${total.toFixed(2)}</td>
    </tr>
        `;
        corpoTabela.insertAdjacentHTML('beforeend', tbl)

    }
}
const jurosAcumuladosValor = () =>{

    var totalPagoemjuros = 0;

    for (var i = 0; i < anosEmMeses(); i++) {
        let jurosAC = (Number(campoValor.value) - (i * calcularAmortizacoes())) * calcularJurosMensais();
        totalPagoemjuros += jurosAC;
    }
    jurosAcumulados.value = totalPagoemjuros;
}

btnCalcular.addEventListener("click", () => {
    preencherInputsSaida();
    preencherTabela();
    jurosAcumuladosValor();

});


