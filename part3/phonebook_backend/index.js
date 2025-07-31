const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());

morgan.token("post-data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const initialLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length === initialLength) {
    return response.status(404).json({ error: "Person not found" });
  }
  response.status(204).end();
});

// Generate random ID with low collision probability
const generateId = () => {
  return Math.floor(Math.random() * 1000000000).toString(); // 1 billion possible IDs
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check for missing fields
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: body.name ? "number is missing" : "name is missing",
    });
  }

  // Check for duplicate name (case-insensitive)
  const nameExists = persons.some(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  // Create new person entry
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.status(201).json(person); // 201 Created
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const phonebookEntries = persons.length;

  response.send(`
    <div>
      <p>Phonebook has info for ${phonebookEntries} people</p>
      <p>${currentTime}</p>
    </div>
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
