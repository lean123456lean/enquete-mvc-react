export interface Opcao {
    id: number;
    texto: string;
    votos: number;
}

export class EnqueteModel {
    private opcoes: Opcao[] = [];
    private nextId: number = 1;

    listarOpcoes() {
        return this.opcoes;
    }

    adicionarOpcao(texto: string) {
        if (texto.trim() === "") {
            this.opcoes.push({ id: this.nextId++, texto, votos: 0 });
        }
    }
}