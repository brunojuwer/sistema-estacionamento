interface IVeiculo {
    id: number;
    nome: string;
    placa: string;
    entrada: Date | string;
}


(function (){
     
    const $ = (query: string) => document.querySelector(query) as HTMLInputElement;
     
    function calcTempo(mil: number){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function patio(){
        function ler():IVeiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio): [];
        }

        function salvar(veiculos: IVeiculo[]){
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function adicionar(veiculo: IVeiculo, salva?: boolean){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${veiculo.id}</td>
            <td>${veiculo.nome}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.entrada}</td>
            <td>
                <button class="delete" data-placa="${veiculo.placa}">X</button>
            </td>
            `;

            row.querySelector('.delete')?.addEventListener('click', function(){
                remover(this.dataset.placa);
            })

            $('#patio').appendChild(row);

            if(salva) salvar([...ler(), veiculo]);
        }

        function remover(placa: string){
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);

            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if(
                !confirm(`O Veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)
                )
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }

        function render(){
            $('#patio').innerHTML = '';
            const patio = ler();

            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }

        }

        return { ler, adicionar, remover, salvar, render};
    }

    patio().render();

    //seleciona o botão e adiciona um listener de eventos
    $('#cadastrar')?.addEventListener('click', event =>{
        let nome = $('#nome')?.value;
        let placa = $('#placa')?.value;
        let randonNumber = Math.random() * 1000;
        let id = Math.trunc(randonNumber);
        
        if(!nome || !placa){
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }

        patio().adicionar({id, nome, placa, entrada: new Date().toISOString() }, true);
        
        $("#nome").value = ''
        $("#placa").value = ''
    })

    //adiciona carro com o enter
    $('#placa')?.addEventListener('keyup', event =>{

        if (event.key === 'Enter'){
            let nome = $('#nome')?.value;
            let placa = $('#placa')?.value;
            let randonNumber = Math.random() * 1000;
            let id = Math.trunc(randonNumber);
            
            if(!nome || !placa){
                alert('Os campos nome e placa são obrigatórios!');
                return;
            }
    
            patio().adicionar({id, nome, placa, entrada: new Date().toISOString() }, true);
            
            $("#nome").value = '';
            $("#placa").value = '';
        }
       
    })

})();