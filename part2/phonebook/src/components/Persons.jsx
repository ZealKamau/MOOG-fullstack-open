const Persons = ({ persons, filter, handleDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
