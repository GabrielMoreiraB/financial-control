
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

const transacao = JSON.parse(localStorage.getItem('transacao')) || []
const tbody = document.querySelector('tbody');
const form = document.getElementById('novoItem')

form.addEventListener('submit',function(event){
    event.preventDefault()

    const descricao = event.target.elements['descricao'];
    const valor = event.target.elements['valor'];
    const data = event.target.elements['data'];
    //console.log(descricao, valor, data);
    

    const classcor = Number(valor.value) < 0 ? "gasto" : "entrada"
    //console.log(classcor)
    const itemAtual = {
        "descricao":descricao.value,
        "valor": valor.value,
        "classcor": classcor,
        "data": data.value
    }

    itemAtual.id = transacao[transacao.length -1] ? (transacao[transacao.length-1]).id + 1 : 0;

    //console.log(itemAtual.id)
    transacao.push(itemAtual);


    criaTransacao(itemAtual);
    balanco()

    localStorage.setItem('transacao', JSON.stringify(transacao));
    descricao.value = "";
    valor.value = ";"
})



function criaTransacao(item,) {
     const tr = document.createElement('tr');
     tr.innerHTML=displayTransacao(item);
     tr.appendChild(botaoDeleta(item.id));
    tbody.appendChild(tr);
    
}

function displayTransacao(item) {
        const itemValor =  trataDinheiro(item.valor)
        const itemData = trataData(item.data)
        
    const html = ` <td class="descricao">${item.descricao}</td>
        <td class="${item.classcor}">${itemValor}</td>
        <td class="data">${itemData}</td>
       
        `

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
//console.log(entradas.innerHTML)
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


function botaoDeleta(id) {
    const elementoBotao = document.createElement("th");
    elementoBotao.classList.add("img-delet");
    elementoBotao.innerText = ""

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    transacao.splice(transacao.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem('transacao', JSON.stringify(transacao));
    balanco();
}

document.getElementById('darkMode').addEventListener('click', function(){ 
    document.body.classList.toggle("dark-mode");  
  })
 
balanco();




