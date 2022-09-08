import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import phoneService from "./services/phoneService";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await phoneService.getAll();
      setPersons(res);
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
      phoneService
        .update(found.id, { name: found.name, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) => {
              return person.id !== updatedPerson.id
                ? person
                : {
                    id: updatedPerson.id,
                    name: updatedPerson.name,
                    number: updatedPerson.number,
                  };
            })
          );

          setNewName("");
          setNewNumber("");
        });
    } else {
      // const newPersonArray = persons.concat({
      //   name: newName,
      //   number: newNumber,
      // });

      phoneService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          console.log(newPerson);
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleDelete = (id) => {
    var confirm = window.confirm(
      `Are you sure you want to delete ${persons.find((x) => x.id === id).name}`
    );

    if (confirm) {
      console.log(`Deleting: ${id}`);
      phoneService.delete(id).then(() => {
        setPersons(persons.filter((x) => x.id !== id));
      });
    }
  };

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
      <Persons
        persons={persons}
        searchBy={searchBy}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
