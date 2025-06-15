import api from "../services/api";

// Aqui definimos as interfaces de tipos de dados
export interface Enquete {
  id: number;
  pergunta: string;
  criadaEm: string; // Ajuste conforme seu backend
}

export interface Opcao {
  id: number;
  texto: string;
  votos: number;
  enqueteId: number;
}

export class EnqueteController {
  async criarEnquete(
    pergunta: string,
  ): Promise<{ id: number; pergunta: string; criadaEm: string }> {
    const response = await api.post<Enquete>("/criar", { pergunta });
    return response.data;
  }

  async adicionarOpcao(enqueteId: number, texto: string): Promise<Opcao> {
    const response = await api.post<Opcao>("/adicionar-opcao", {
      enqueteId,
      texto,
    });
    return response.data;
  }

  async votar(opcaoId: number): Promise<{ sucesso: boolean }> {
    const response = await api.post<{ sucesso: boolean }>("/votar", {
      opcaoId,
    });
    return response.data;
  }

  async listarEnquetes() {
    const response = await api.get("/listar");
    return response.data;
  }

  async listarOpcoes(enqueteId: number): Promise<Opcao[]> {
    const response = await api.get<Opcao[]>(`/opcoes/${enqueteId}`);
    return response.data;
  }
}
