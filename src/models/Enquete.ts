export class Enquete {
  private opcoes: Map<string, number>;

  constructor() {
    this.opcoes = new Map<string, number>();
  }

  addOpcao(opcao: string): void {
    if (!this.opcoes.has(opcao)) {
      this.opcoes.set(opcao, 0);
    }
  }

  getOpcoes(): string[] {
    return Array.from(this.opcoes.keys());
  }

  votar(opcao: string): void {
    if (this.opcoes.has(opcao)) {
      const votosAtuais = this.opcoes.get(opcao) ?? 0;
      this.opcoes.set(opcao, votosAtuais + 1);
    }
  }

  getVotos(opcao: string): number {
    return this.opcoes.get(opcao) ?? 0;
  }
}
