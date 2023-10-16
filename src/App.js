import { useRef, useState } from "react";
import "./App.css";

function fetchRepos(q) {
  return fetch(`https://api.github.com/search/repositories?q=${q}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.items.map((item) => {
        return item.full_name;
      });
    });
}

function App() {
  const [q, setQ] = useState("");
  const [options, setOptions] = useState([]);

  const timeoutRef = useRef(undefined);
  // let timeout = undefined;

  return (
    <div>
      <input
        type="text"
        list="fruits"
        value={q}
        onChange={(event) => {
          const value = event.target.value;

          setQ(value);

          // if a timeout exists
          if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current);
          }

          if (value) {
            timeoutRef.current = setTimeout(() => {
              fetchRepos(value).then((repoNames) => {
                setOptions(repoNames);
              });
            }, 1000);
          } else {
            setOptions([]);
          }
        }}
      />
      <datalist id="fruits">
        {options.map((option) => {
          return <option value={option} key={option} />;
        })}
      </datalist>
    </div>
  );
}

export default App;
