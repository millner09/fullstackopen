import { useState } from "react";

const Anectdote = ({ header, anecdote, numVotes }) => {
  return (
    <>
      <h1>{header}</h1>
      <div>{anecdote}</div>
      <div>has {numVotes} votes</div>
    </>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const anecdotesWithVotesInit = anecdotes.map((anecdote) => {
    return { numVotes: 0, anecdote: anecdote };
  });

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(null);
  const [anecdotesWithVotes, setAnecdotesWithVotes] = useState(
    anecdotesWithVotesInit
  );

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const incrementVote = () => {
    let temp = [...anecdotesWithVotes];
    temp[selected].numVotes++;
    setAnecdotesWithVotes(temp);

    if (mostVoted === null) setMostVoted(selected);
    else if (
      anecdotesWithVotes[selected].numVotes >
      anecdotesWithVotes[mostVoted].numVotes
    )
      setMostVoted(selected);
  };

  return (
    <>
      <Anectdote
        header="Anecdote of the day"
        anecdote={anecdotesWithVotes[selected].anecdote}
        numVotes={anecdotesWithVotes[selected].numVotes}
      />
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <button onClick={incrementVote}>vote</button>

      {mostVoted !== null && (
        <>
          <Anectdote
            header="Anecdote with the most votes"
            anecdote={anecdotesWithVotes[mostVoted].anecdote}
            numVotes={anecdotesWithVotes[mostVoted].numVotes}
          />
        </>
      )}
    </>
  );
};

export default App;
