import React, { useEffect, useState } from "react";
import {
  EnqueteController,
  type Enquete,
  type Opcao,
} from "../controllers/EnqueteController";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

// Controller instanciado
const controller = new EnqueteController();

export const EnqueteViews: React.FC = () => {
  const [novaPergunta, setNovaPergunta] = useState<string>("");
  const [novaOpcao, setNovaOpcao] = useState<string>("");
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [enqueteSelecionada, setEnqueteSelecionada] = useState<number | null>(
    null,
  );

  // Carrega as enquetes ao abrir a página
  useEffect(() => {
    carregarEnquetes();
  }, []);

  const carregarEnquetes = async () => {
    const data = await controller.listarEnquetes();
    console.log("Enquetes carregadas: ", data);
    setEnquetes(data);
    console.log("State atualizado:", data);
  };

  const carregarOpcoes = async (enqueteId: number) => {
    const data = await controller.listarOpcoes(enqueteId);
    setOpcoes(data);
    setEnqueteSelecionada(enqueteId);
  };

  const criarEnquete = async () => {
    if (novaPergunta.trim() === "") return;
    console.log("Enquete criada com a pergunta:", novaPergunta);
    console.log("Chamando criarEnquete...");
    await controller.criarEnquete(novaPergunta);
    setNovaPergunta("");
    await carregarEnquetes();
  };

  const adicionarOpcao = async () => {
    if (!enqueteSelecionada || novaOpcao.trim() === "") return;
    await controller.adicionarOpcao(enqueteSelecionada, novaOpcao);
    setNovaOpcao("");
    await carregarOpcoes(enqueteSelecionada);
  };

  const votar = async (opcaoId: number) => {
    await controller.votar(opcaoId);
    if (enqueteSelecionada) {
      await carregarOpcoes(enqueteSelecionada);
    }
  };

  const totalVotos = opcoes.reduce((sum, opcao) => sum + opcao.votos, 0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
            color="primary.dark"
          >
            Crie sua enquete
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <TextField
              fullWidth
              placeholder="Nova pergunta"
              value={novaPergunta}
              onChange={(e) => setNovaPergunta(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && criarEnquete()}
              size="medium"
              sx={{ bgcolor: "#f0f4ff", borderRadius: 2 }}
            />
            <Button variant="contained" color="success" onClick={criarEnquete}>
              <AddIcon />
            </Button>
          </Stack>

          <Stack spacing={1} mb={3}>
            {enquetes.map((enquete) => (
              <Button
                key={enquete.id}
                variant="outlined"
                onClick={() => carregarOpcoes(enquete.id)}
              >
                {enquete.pergunta}
              </Button>
            ))}
          </Stack>

          {enqueteSelecionada && (
            <>
              <Stack direction="row" spacing={1} mb={4}>
                <TextField
                  fullWidth
                  placeholder="Nova opção"
                  value={novaOpcao}
                  onChange={(e) => setNovaOpcao(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && adicionarOpcao()}
                  size="medium"
                  sx={{ bgcolor: "#f0f4ff", borderRadius: 2 }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={adicionarOpcao}
                >
                  <AddIcon />
                </Button>
              </Stack>

              <Stack spacing={3}>
                {opcoes.map((opcao) => (
                  <Paper
                    key={opcao.id}
                    elevation={6}
                    sx={{
                      p: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 3,
                      bgcolor: "primary.light",
                      boxShadow: "0 4px 10px rgba(37, 117, 252, 0.3)",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="primary.dark"
                      >
                        {opcao.texto}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        {opcao.votos} voto{opcao.votos !== 1 ? "s" : ""}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<HowToVoteIcon />}
                      onClick={() => votar(opcao.id)}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Votar
                    </Button>
                  </Paper>
                ))}
              </Stack>

              <Typography
                variant="h6"
                align="center"
                mt={5}
                fontWeight="bold"
                color="primary.dark"
              >
                Total de votos: {totalVotos}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};
