

const Filter = ({ filter, onChange }) => (
    <input type="text" name="filter" value={filter} onChange={onChange} placeholder="Search contacts"/>
  );
  
  export default Filter;