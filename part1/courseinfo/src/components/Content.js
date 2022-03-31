import Part from "./Part";
import Sum from "./Sum";

const Content = ({ parts }) => {
  console.log("Parts: ", parts);
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <Sum parts={parts} />
    </>
  );
};

export default Content;
