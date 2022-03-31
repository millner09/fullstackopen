const Sum = ({ parts }) => {
  console.log("Parts: ", parts);
  const sum = parts.reduce((previousVal, currentVal) => {
    return { exercises: previousVal.exercises + currentVal.exercises };
  });
  return <div>total of {sum.exercises} exercises</div>;
};

export default Sum;
