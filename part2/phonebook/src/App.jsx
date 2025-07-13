import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]); // Start with empty array
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification({ message: null, isError: false }), 5000);
  };

  // Fetch data when component mounts
  useEffect(() => {
    phonebookService.getAll().then((personsArray) => {
      setPersons(personsArray);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} already exists. Replace old number?`)) {
        phonebookService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? updatedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification(
              `Updated ${updatedPerson.name}'s number successfully`
            );
          })
          .catch((error) => {
            showNotification(
              `Information of ${existingPerson.name} was already removed from server`,
              true
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      phonebookService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${newPerson.name} successfully`);
        })
        .catch((error) => {
          showNotification(
            `Failed to add ${newName}: ${
              error.response?.data?.error || "Unknown error"
            }`,
            true
          );
        });
    }
  };

  // Function to handle deletion of a person
  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Deleted ${personToDelete.name} successfully`);
        })
        .catch((error) => {
          showNotification(
            `${personToDelete.name} was already removed from server`,
            true
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <Notification
        message={notification.message}
        isError={notification.isError}
      />

      <h3>Add to phonebook</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
