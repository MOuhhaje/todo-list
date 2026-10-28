
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTaches = () => api.get("/taches");

export const ajouterTache = (titre) =>
  api.post("/taches", { titre });

export const modifierTache = (id, donnees) =>
  api.put(`/taches/${id}`, donnees);

export const supprimerTache = (id) =>
  api.delete(`/taches/${id}`);
