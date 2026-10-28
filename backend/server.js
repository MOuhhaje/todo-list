
const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 5000;
const FILE = path.join(__dirname, "tasks.json");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Read tasks from the JSON file
async function lireTaches() {
  const contenu = await fs.readFile(FILE, "utf8");
  return JSON.parse(contenu);
}

// Write tasks to the JSON file
async function sauvegarderTaches(taches) {
  await fs.writeFile(
    FILE,
    JSON.stringify(taches, null, 2),
    "utf8"
  );
}

// GET: display all tasks
app.get("/api/taches", async (req, res) => {
  try {
    res.json(await lireTaches());
  } catch (error) {
    res.status(500).json({ message: "Erreur de lecture du fichier." });
  }
});

// POST: add a task
app.post("/api/taches", async (req, res) => {
  try {
    const titre = req.body.titre?.trim();

    if (!titre) {
      return res.status(400).json({ message: "Titre obligatoire." });
    }

    const taches = await lireTaches();

    const nouvelleTache = {
      id: Date.now().toString(),
      titre,
      terminee: false,
    };

    taches.push(nouvelleTache);
    await sauvegarderTaches(taches);

    res.status(201).json(nouvelleTache);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout." });
  }
});

// PUT: edit a task
app.put("/api/taches/:id", async (req, res) => {
  try {
    const taches = await lireTaches();
    const index = taches.findIndex(
      (t) => t.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Tâche introuvable." });
    }

    const { titre, terminee } = req.body;

    if (titre !== undefined) {
      if (typeof titre !== "string" || !titre.trim()) {
        return res.status(400).json({ message: "Titre invalide." });
      }
      taches[index].titre = titre.trim();
    }

    if (terminee !== undefined) {
      if (typeof terminee !== "boolean") {
        return res.status(400).json({ message: "État invalide." });
      }
      taches[index].terminee = terminee;
    }

    await sauvegarderTaches(taches);
    res.json(taches[index]);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification." });
  }
});

// DELETE: delete a task
app.delete("/api/taches/:id", async (req, res) => {
  try {
    const taches = await lireTaches();
    const resultat = taches.filter(
      (t) => t.id !== req.params.id
    );

    if (resultat.length === taches.length) {
      return res.status(404).json({ message: "Tâche introuvable." });
    }

    await sauvegarderTaches(resultat);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
});

app.listen(PORT, () => {
  console.log(`API disponible sur http://localhost:${PORT}`);
});
