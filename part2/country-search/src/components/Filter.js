const Filter = ({ filterText, setFilterText }) => {
  const updateFilterText = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <>
      <h1>Filter</h1>
      <div>
        find countries <input value={filterText} onChange={updateFilterText} />
      </div>
    </>
  );
};

export default Filter;
