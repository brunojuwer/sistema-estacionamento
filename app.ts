 (function (){
     
    const $ = (query: string) => document.querySelector(query) as HTMLInputElement;
     
    

    //seleciona o botão e adiciona um lister de eventos
    $('#cadastrar')?.addEventListener('click', event =>{
        const nomeVeiculo = $('#nome')?.value;
        const placaVeiculo = $('#placa')?.value;

        if(!nomeVeiculo || !placaVeiculo){
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }
    })
 })();