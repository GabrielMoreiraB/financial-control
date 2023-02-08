
//modal --------------------*
const modal = {
    open(){
        document.querySelector('.modal_total').classList.add('ative');
    },
    close(){
        document.querySelector('.modal_total').classList.remove('ative');
    }
}

document.querySelector('.close').addEventListener('click', () =>{
    modal.close();
})
document.querySelector('.cadastrar').addEventListener('click', () =>{
    modal.close();
})
document.querySelector('.open').addEventListener('click', () =>{
    modal.open();
})


//movimentação --------------------*

const transacao = []

const form = document.getElementById('novoItem')

form.addEventListener('submit',function(event){
    event.preventDefault()

    const descricao = event.target.elements['descricao'];
    let valor = event.target.elements['valor'].value;
    let data = event.target.elements['data'].value;
    //console.log(descricao.value, valor.value, data.value);

    const classcor = Number(valor) < 0 ? "gasto" : "entrada"

    valor = trataDinheiro(valor);
    data = trataData(data);

    const itemAtual = {
        "descricao":descricao.value,
        "valor": valor,
        "classcor": classcor,
        "data": data
    }

    transacao.push(itemAtual);


    criaTransacao(transacao);
    banaco();
})



function criaTransacao(transacao) {
    const novaTransacao = document.querySelector('tbody'); 
    
    let displayTransacao = transacao.map(function(item){
        return `<tr>
        <td class="descricao">${item.descricao}</td>
        <td class="${item.classcor}">${item.valor}</td>
        <td class="data">${item.data}</td>
        <td><img src="img/svg/minus.svg" alt=""></td>
        </tr>`
    })
    novaTransacao.innerHTML = displayTransacao.join("");
    //console.log(novaTransacao.innerHTML)
}

function trataDinheiro(valor){
    const sinal = Number(valor) < 0 ? "-" : " "
    valor = String(valor).replace(/-/,'');
    valor = Number(valor);
    valor = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    return (sinal + valor);
}

function trataData(data){
    const separaData = data.split("-");
    return `${separaData[2]}/${separaData[1]}/${separaData[0]}`;
}




let balancoEntradas ='';
let balancoSaidas = ''; 
let balancoTotal = ''; 
let entradas = document.querySelector('.entradas'); 
console.log(entradas.innerHTML)
let saidas = document.querySelector('.saidas');
let total = document.querySelector('.balanco');

function banaco(){
    transacao.forEach(function(item){;
        if(item.classcor === 'entrada'){
            balancoEntradas = balancoEntradas +  item.valor;
            console.log(balancoEntradas )
            console.log( item.valor )
        } else if(item.classcor === 'gasto'){
            let valor = Number(String(item.valor).replace(/-/,''));
            balancoSaidas += valor;
        }
    })
    entradas.innerHTML = "";
    entradas.innerHTML = balancoEntradas;
    saidas.innerHTML = balancoSaidas;
    total.innerHTML = balancoEntradas - balancoSaidas;
}





criaTransacao(transacao);

