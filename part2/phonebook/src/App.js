import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/persons");
      setPersons(res.data);
    };

    fetchData();
  }, []);
  const [persons, setPersons] = useState([]);
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
