import { Component } from 'react'

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters : [],
      searchField : ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => 
      this.setState(
        () => {
          return{ monsters : users };
        },
        () => {
          console.log(this.state);
        }
      )
    ); 
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        return { searchField };
      }
    );    
  }


  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input 
          className='search-box'
          type='search' 
          placeholder='search monsters'
          onChange={onSearchChange}
        />
        {
          filteredMonsters.map((monsters) => {
            return (
              <div key={monsters.id}>
                <h1 >{monsters.name}</h1>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default App;
