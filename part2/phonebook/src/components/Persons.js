const Persons = ({ personArr }) => {
  return personArr.map((person, i) => (
    <p key={i}>
      {person.name} {person.number}
    </p>
  ));
};

export default Persons;
