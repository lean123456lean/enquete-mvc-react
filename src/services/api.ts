import axios from "axios";
//Qaundo for rodar em produção é necessário mudar a URL base para o servidor onde a API está hospedada.
// Por exemplo, se a API estiver hospedada em 'https://api.example.com', você deve alterar a baseURL para isso.
const api = axios.create({
  baseURL: "http://localhost:3000/api/enquete",
});

export default api;
