import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from '../views/mensagem-view.js';
export class NegociacaoController {
    constructor() {
        this.negociacioes = new Negociacoes;
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.MensagemView = new MensagemView('#mensagemView');
        this.DOMINGO = 0;
        this.SABADO = 6;
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacioes);
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        if (negociacao.data.getDay() > this.DOMINGO && negociacao.data.getDay() < this.SABADO) {
            this.negociacioes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
        }
        else {
            this.MensagemView.update('Só aceitamos negociações em dias úteis!');
        }
    }
    criaNegociacao() {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacioes);
        this.MensagemView.update('Negociação adicionada com sucesso');
    }
}
