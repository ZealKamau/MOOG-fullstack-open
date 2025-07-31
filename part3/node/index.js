const express = require("express");

const app = express();

app.use(express.json());

let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Get all notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// Delete a note
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length === initialLength) {
    return response.status(404).json({ error: "Note not found" });
  }
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
