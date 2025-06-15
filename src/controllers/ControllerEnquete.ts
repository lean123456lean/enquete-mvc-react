// controllers/EnqueteController.ts
import { EnqueteModel } from "../models/EnqueteModel";

export class EnqueteController {
    private model = new EnqueteModel();

    listarOpcoes() {
        return this.model.listarOpcoes();
    }

    adicionarOpcao(texto: string) {
        this.model.adicionarOpcao(texto);
    }

    votarPorId(id: number) {
        this.model.votar(id);
    }

    totalVotos() {
        return this.model.totalVotos();
    }
}
