
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

const transacao = [
    {
        id: 1,
        descricao: 'salario',
        valor: 5000,
        classcor: 'entrada',
        data: '06/02/2023',
    },
    {
        id: 2,
        descricao: 'luz',
        valor: 120,
        classcor: 'gasto',
        data: '01/02/2023',
    },
    {
        id: 3,
        descricao:'internet',
        valor: 100.90,
        classcor: 'gasto',
        data: '01/02/2023',
    }
]

const form = document.getElementById('novoItem')

form.addEventListener('submit',function(event){
    event.preventDefault()

    const descricao = event.target.elements['descricao'];
    const valor = event.target.elements['valor'];
    const data = event.target.elements['data'];
    //console.log(descricao.value, valor.value, data.value);

    trataDinheiro(valor);
    trataData(data);

    const itemAtual = {
        "descricao":descricao.value,
        "valor": valor.value,
        "classcor":'gasto',
        "data": data.value,
    }

    transacao.push(itemAtual);
    criaTransacao(transacao);
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

}

function trataData(data){

}

criaTransacao(transacao);