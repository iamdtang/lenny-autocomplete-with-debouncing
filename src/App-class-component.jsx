import { Component } from "react";
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

export default class App extends Component {
  #timeout = undefined; // previously was useRef

  constructor(props) {
    super(props);

    this.state = {
      q: "",
      options: [],
    };
  }

  render() {
    return (
      <div>
        <input
          type="text"
          list="fruits"
          value={this.state.q}
          onChange={(event) => {
            const value = event.target.value;

            this.setState({
              q: value,
            });

            // if a timeout exists
            if (this.#timeout !== undefined) {
              clearTimeout(this.#timeout);
            }

            if (value) {
              this.timeout = setTimeout(() => {
                fetchRepos(value).then((repoNames) => {
                  this.setState({
                    options: repoNames,
                  });
                });
              }, 1000);
            } else {
              this.setState({
                options: [],
              });
            }
          }}
        />
        <datalist id="fruits">
          {this.state.options.map((option) => {
            return <option value={option} key={option} />;
          })}
        </datalist>
      </div>
    );
  }
}
