const Persons = ({ persons, searchBy, handleDelete }) => {

  const numbersToShow =
    searchBy === ""
      ? persons
      : persons.filter((person) => {
        const name = person.name.toUpperCase();

        return name.includes(searchBy.toUpperCase());
      });

  return numbersToShow.map((person) => (
    <div key={person.id}>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  ));
};

export default Persons;
