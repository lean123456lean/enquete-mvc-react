import React, { useState } from "react";
import { EnqueteController } from "../controllers/EnqueteController";

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

// Controller único fora do componente
const controller = new EnqueteController();
controller.adicionarOpcao("React");
controller.adicionarOpcao("Vue");
controller.adicionarOpcao("Angular");

export const EnqueteViews: React.FC = () => {
  const [update, setUpdate] = useState(0);
  const [novaOpcao, setNovaOpcao] = useState<string>("");

  const opcoes = controller.listarOpcoes();

  const votar = (opcao: string) => {
    controller.votar(opcao);
    setUpdate(update + 1);
  };

  const adicionarOpcao = () => {
    if (novaOpcao.trim() === "") return;
    controller.adicionarOpcao(novaOpcao.trim());
    setNovaOpcao("");
    setUpdate(update + 1);
  };

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
            Sistema de Enquete
          </Typography>

          <Stack direction="row" spacing={1} mb={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite uma nova opção"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarOpcao()}
              size="medium"
              sx={{
                bgcolor: "#f0f4ff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={adicionarOpcao}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
              aria-label="Adicionar opção"
            >
              <AddIcon fontSize="large" />
            </Button>
          </Stack>

          <Stack spacing={3}>
            {opcoes.map((opcao) => (
              <Paper
                key={opcao}
                elevation={6}
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 3,
                  bgcolor: "primary.light",
                  boxShadow:
                    "0 4px 10px rgba(37, 117, 252, 0.3), 0 2px 5px rgba(106, 17, 203, 0.15)",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow:
                      "0 8px 20px rgba(37, 117, 252, 0.5), 0 4px 10px rgba(106, 17, 203, 0.3)",
                  },
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="600" color="primary.dark">
                    {opcao}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {controller.totalVotos(opcao)} voto
                    {controller.totalVotos(opcao) !== 1 ? "s" : ""}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<HowToVoteIcon />}
                  onClick={() => votar(opcao)}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow:
                      "0 3px 7px rgba(255, 64, 129, 0.5), 0 2px 4px rgba(255, 64, 129, 0.3)",
                    "&:hover": {
                      boxShadow:
                        "0 5px 15px rgba(255, 64, 129, 0.7), 0 3px 8px rgba(255, 64, 129, 0.5)",
                      backgroundColor: "#ff4081cc",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Votar em ${opcao}`}
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
            Total de votos:{" "}
            {opcoes.reduce((sum, opcao) => sum + controller.totalVotos(opcao), 0)}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
