"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    //seleciona o botão e adiciona um lister de eventos
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', event => {
        var _a, _b;
        const nomeVeiculo = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placaVeiculo = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nomeVeiculo || !placaVeiculo) {
            alert('Os campos nome e placa são obrigatórios!');
            return;
        }
    });
})();
