import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

const App = () => {
  const [robotsArray, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  // const [count, setCount] = useState(0);

  useEffect(() => { //run every time app is rendered
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => { return response.json(); })
      .then(users => { setRobots(users); })
  }, []); //optional list tells React to only run if certain values have changed (if the list is empty, same as componentMount: only run once when app is rendered)

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  const filteredRobots = robotsArray.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  if (!robotsArray.length) {
    return <h1>Loading</h1>
  } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        {/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;