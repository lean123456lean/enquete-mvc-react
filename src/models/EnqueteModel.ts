export interface Opcao {
  id: number;
  texto: string;
  votos: number;
}

export interface Enquete {
  id: number;
  pergunta: string;
  criadaEm: string;
  opcoes: Opcao[];
}

export class EnqueteModel {
  private static enquetes: Enquete[] = [];
  private static nextEnqueteId = 1;
  private static nextOpcaoId = 1;

  static criarEnquete(pergunta: string): Enquete {
    const novaEnquete: Enquete = {
      id: this.nextEnqueteId++,
      pergunta,
      criadaEm: new Date().toISOString(),
      opcoes: [],
    };
    this.enquetes.push(novaEnquete);
    return novaEnquete;
  }

  static listarEnquetes(): Enquete[] {
    return this.enquetes;
  }

  static adicionarOpcao(enqueteId: number, texto: string): Opcao | null {
    const enquete = this.enquetes.find((e) => e.id === enqueteId);
    if (!enquete) return null;

    const novaOpcao: Opcao = {
      id: this.nextOpcaoId++,
      texto,
      votos: 0,
    };

    enquete.opcoes.push(novaOpcao);
    return novaOpcao;
  }

  static listarOpcoes(enqueteId: number): Opcao[] | null {
    const enquete = this.enquetes.find((e) => e.id === enqueteId);
    return enquete ? enquete.opcoes : null;
  }

  static votar(opcaoId: number): boolean {
    for (const enquete of this.enquetes) {
      const opcao = enquete.opcoes.find((o) => o.id === opcaoId);
      if (opcao) {
        opcao.votos++;
        return true;
      }
    }
    return false;
  }
}
