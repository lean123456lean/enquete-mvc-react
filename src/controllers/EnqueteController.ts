import { Enquete } from "../models/Enquete";

export class EnqueteController {
  private enquete: Enquete;

  constructor() {
    this.enquete = new Enquete();
  }

  adicionarOpcao(opcao: string): void {
    this.enquete.addOpcao(opcao);
  }

  votar(opcao: string): void {
    this.enquete.votar(opcao);
  }

  listarOpcoes(): string[] {
    return this.enquete.getOpcoes();
  }

  totalVotos(opcao: string): number {
    return this.enquete.getVotos(opcao);
  }
}
