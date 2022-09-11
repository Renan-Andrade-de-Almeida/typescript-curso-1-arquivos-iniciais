import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from '../views/mensagem-view.js';
import { Negociacao } from '../models/negociacao';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacioes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private MensagemView = new MensagemView('#mensagemView');
    private readonly DOMINGO = 0;
    private readonly SABADO = 6;

    constructor(){
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacioes);
    }

    
    public adiciona(): void{
        const negociacao = this.criaNegociacao();
        if (!this.ehDiaUtil(negociacao.data)){
            this.MensagemView.update('Só aceitamos negociações em dias úteis!')
        }
            this.negociacioes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > this.DOMINGO && data.getDay() < this.SABADO
    }

    private criaNegociacao(): Negociacao{
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    
    private limparFormulario(): void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacioes);
        this.MensagemView.update('Negociação adicionada com sucesso');
    }

}