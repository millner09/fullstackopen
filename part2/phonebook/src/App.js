import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const updateNewName = (event) => {
    setNewName(event.target.value);
  };

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const updateSearchBy = (event) => {
    setSearchBy(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonArray = persons.concat({
        name: newName,
        number: newNumber,
      });
      setPersons(newPersonArray);
      setNewName("");
    }
  };

  const numbersToShow =
    searchBy === ""
      ? persons
      : persons.filter((person) => {
          const name = person.name.toUpperCase();

          return name.includes(searchBy.toUpperCase());
        });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchBy={searchBy} onChange={updateSearchBy} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        updateNewName={updateNewName}
        updateNewNumber={updateNewNumber}
        addNewPerson={addNewPerson}
      />

      <h2>Numbers</h2>
      <Persons personArr={numbersToShow} />
    </div>
  );
};

export default App;
