
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
const tbody = document.querySelector('tbody');
const form = document.getElementById('novoItem')

form.addEventListener('submit',function(event){
    event.preventDefault()

    const descricao = event.target.elements['descricao'];
    const valor = event.target.elements['valor'];
    const data = event.target.elements['data'];
    //console.log(descricao.value, typeof(valor.value), data.value);


    const classcor = Number(valor.value) < 0 ? "gasto" : "entrada"
    //console.log(classcor)
    const itemAtual = {
        "descricao":descricao.value,
        "valor": valor.value,
        "classcor": classcor,
        "data": data.value
    }

    transacao.push(itemAtual);


    criaTransacao(itemAtual);
    balanco()
})



function criaTransacao(item) {
     const tr = document.createElement('tr');
     tr.innerHTML=displayTransacao(item);
    tbody.appendChild(tr);

}    
function displayTransacao(item) {
        const itemValor =  trataDinheiro(item.valor)
        const itemData = trataData(item.data)
    
    const html = ` <td class="descricao">${item.descricao}</td>
        <td class="${item.classcor}">${itemValor}</td>
        <td class="data">${itemData}</td>
        <td><img src="img/svg/minus.svg" alt=""></td>`

        return html
    }
    
transacao.forEach(criaTransacao)

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
let entradas = document.querySelector('.entradas'); 
console.log(entradas.innerHTML)
let saidas = document.querySelector('.saidas');
let total = document.querySelector('.balanco');
function balanco(){
    transacao.forEach(function(item){
        if(item.classcor === 'entrada'){
            balancoEntradas = Number(balancoEntradas) +  Number(item.valor);
        } else if(item.classcor === 'gasto'){
            balancoSaidas = Number(balancoSaidas) +  Number(item.valor);;
        }
    })
    entradas.innerHTML = trataDinheiro(balancoEntradas) ;
    saidas.innerHTML = trataDinheiro(balancoSaidas);
    total.innerHTML =trataDinheiro( balancoEntradas + balancoSaidas);
    balancoEntradas = balancoSaidas = 0;
}





