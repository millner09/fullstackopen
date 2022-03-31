const Part = ({ part }) => {
  const { name, id, exercises } = part;
  return (
    <div>
      {name} {exercises}
    </div>
  );
};

export default Part;
