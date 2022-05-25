(function () {
    var _a, _b;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a;
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
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            $('#patio').appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O Veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    //seleciona o botão e adiciona um listener de eventos
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
        var _a, _b;
        let nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        let placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        let randonNumber = Math.random() * 1000;
        let id = Math.trunc(randonNumber);
        if (!nome || !placa) {
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }
        patio().adicionar({ id, nome, placa, entrada: new Date().toISOString() }, true);
        $("#nome").value = '';
        $("#placa").value = '';
    });
    //adiciona carro com o enter
    (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.addEventListener('keyup', event => {
        var _a, _b;
        if (event.key === 'Enter') {
            let nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
            let placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
            let randonNumber = Math.random() * 1000;
            let id = Math.trunc(randonNumber);
            if (!nome || !placa) {
                alert('Os campos nome e placa são obrigatórios!');
                return;
            }
            patio().adicionar({ id, nome, placa, entrada: new Date().toISOString() }, true);
            $("#nome").value = '';
            $("#placa").value = '';
        }
    });
})();
