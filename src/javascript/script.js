const respostas = document.querySelectorAll('.evento-botao');
const proximaQuestao = document.querySelector('.botao-proxima');
const botaoCerto = document.querySelector('#botao-certo');
const botaoErrado = document.querySelector('#botao-errado1');
const botaoDesafio = document.querySelector('.desafio-numero');
const cardStyle = document.querySelectorAll('.card-style');
const cardCorreto = document.querySelectorAll('.card-correto');
const botaoFlip = document.querySelector('.botao-evento-proxima');
const botaoReiniciar = document.querySelector('#reiniciar');
const resultado = document.getElementById('resultado');



const pagina =  window.location.pathname;
const chavepagina = `resolvida ${pagina}`;

let resolvido = localStorage.getItem(chavepagina) === 'true';

let respostaCerta =  Number(localStorage.getItem('certo')) || 0;

if(pagina.includes('index.html')){
    if(localStorage.length > 0){
        localStorage.clear()
    }
}

respostas.forEach(resposta =>{
    resposta.addEventListener('click', ()=>{
        if(resolvido){
             proximaQuestao.classList.add('proxima-ativo');
             alert('Questão ja resolvida pode seguir');
            return;
        }

        respostas.forEach(item =>{
            if(item.id === botaoCerto.id){
                item.style.backgroundColor = "#2b8303";
            }else{
                item.style.backgroundColor = "#ad1b10";
                resolvido = true;
                proximaQuestao.classList.add('proxima-ativo');

            }
        });

        if(resposta.id === botaoCerto.id){
                respostaCerta++;
                localStorage.setItem('certo', respostaCerta);
                localStorage.setItem(chavepagina, 'true');
                resolvido = true;
                proximaQuestao.classList.add('proxima-ativo');
        }
    });
});     



//evento do flipcard
//percorre o pai 


let correto = 0;



cardStyle.forEach(card =>{
    card.addEventListener('click', ()=>{
        if(card.classList.contains('marcado')){
            return;
        }
            card.classList.add('marcado');  
            card.style.transform = "rotateY(180deg)"
            card.style.outline = "1px dashed #000";

        if(card.classList.contains('card-correto')){ 
            correto++;
            if(correto === cardCorreto.length){
                respostaCerta++;
                localStorage.setItem('certo', respostaCerta);
                localStorage.setItem(chavepagina, 'true');
                botaoFlip.classList.add('proxima-ativo');  
                console.log(correto);
            }
        }

    });
}); 

//botao-flip mostrar pagina winner com resultado também 



if(botaoFlip){
    botaoFlip.addEventListener('click', () =>{

        if(respostaCerta.valueOf() <= 3){
            window.location.href = 'loser.html';
        }else{
            window.location.href = 'winner.html';
        }

    });
}

 resultado.textContent = respostaCerta;


if(botaoReiniciar){
    botaoReiniciar.addEventListener('click', () =>{
        window.location.href = 'index.html';
    });
}
