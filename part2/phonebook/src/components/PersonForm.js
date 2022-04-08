const PersonForm = ({
  addNewPerson,
  updateNewName,
  newName,
  newNumber,
  updateNewNumber,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={updateNewName} value={newName} />
        <div>
          number: <input value={newNumber} onChange={updateNewNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
