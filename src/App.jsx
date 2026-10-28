
import { useEffect, useState } from "react";
import {
  getTaches,
  ajouterTache,
  modifierTache,
  supprimerTache,
} from "./api";
import "./App.css";

function App() {
  const [taches, setTaches] = useState([]);
  const [titre, setTitre] = useState("");
  const [recherche, setRecherche] = useState("");
  const [editId, setEditId] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // Charger les tâches depuis le serveur
  useEffect(() => {
    getTaches()
      .then((response) => setTaches(response.data))
      .catch(() => setErreur("Impossible de charger les tâches."))
      .finally(() => setChargement(false));
  }, []);

  // Ajouter ou modifier une tâche
  const enregistrer = async (e) => {
    e.preventDefault();
    const texte = titre.trim();

    if (!texte) return;

    try {
      setErreur("");

      if (editId !== null) {
        const response = await modifierTache(editId, {
          titre: texte,
        });

        setTaches((ancienne) =>
          ancienne.map((t) =>
            t.id === editId ? response.data : t
          )
        );
      } else {
        const response = await ajouterTache(texte);
        setTaches((ancienne) => [...ancienne, response.data]);
      }

      setTitre("");
      setEditId(null);
    } catch {
      setErreur("Impossible d'enregistrer la tâche.");
    }
  };

  // Préparer la modification
  const editer = (tache) => {
    setTitre(tache.titre);
    setEditId(tache.id);
  };

  // Annuler la modification
  const annuler = () => {
    setTitre("");
    setEditId(null);
  };

  // Supprimer une tâche
  const supprimer = async (id) => {
    try {
      setErreur("");
      await supprimerTache(id);

      setTaches((ancienne) =>
        ancienne.filter((t) => t.id !== id)
      );

      if (editId === id) annuler();
    } catch {
      setErreur("Impossible de supprimer la tâche.");
    }
  };

  // Marquer une tâche comme terminée
  const terminer = async (tache) => {
    try {
      setErreur("");

      const response = await modifierTache(tache.id, {
        terminee: !tache.terminee,
      });

      setTaches((ancienne) =>
        ancienne.map((t) =>
          t.id === tache.id ? response.data : t
        )
      );
    } catch {
      setErreur("Impossible de modifier l'état de la tâche.");
    }
  };

  // Rechercher par titre
  const listeFiltree = taches.filter((t) =>
    t.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  if (chargement) return <p className="loading">Chargement...</p>;

  return (
    <main className="app">
      <h1>Liste de choses à faire</h1>
      <p className="subtitle">Organisez vos tâches simplement</p>

      {erreur && <p className="error">{erreur}</p>}

      <form onSubmit={enregistrer} className="add-form">
        <input
          type="text"
          placeholder="Nom de la tâche..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <div className="task-actions">

          <button type="submit" className="btn-edit">
            {editId !== null ? "Enregistrer" : "Ajouter"}
          </button>

          {editId !== null && (
            <button type="button" className="btn-delete" onClick={annuler}>
              Annuler
            </button>
          )}
        </div>
      </form>

      <input
        className="search"
        type="search"
        placeholder="Rechercher une tâche..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <div className="stats">
        Total : {taches.length} | Terminées :{" "}
        {taches.filter((t) => t.terminee).length} | Restantes :{" "}
        {taches.filter((t) => !t.terminee).length}
      </div>

      {listeFiltree.length === 0 ? (
        <p className="empty">Aucune tâche trouvée.</p>
      ) : (
        <ul className="task-list">
          {listeFiltree.map((tache) => (
            <li key={tache.id} className={`task-item ${tache.terminee ? "done" : ""}`}>
              <label className="task-title">
                <input
                  type="checkbox"
                  checked={tache.terminee}  
                  onChange={() => terminer(tache)}
                />

                <span className={tache.terminee ? "done" : ""}>
                  {tache.titre}
                </span>
              </label>

              <div className="task-actions">
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => editer(tache)}
                >
                  Modifier
                </button>

                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => supprimer(tache.id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
