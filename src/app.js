class IndecisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}


class Header extends React.Component {
  // React components require render method to be defined
  render() {
    return (
      <div>
        <h1>Indecision App</h1>
        <h2>Feeling indecisive? You've come to the right place :)</h2>
      </div>
    );
  }
}



class Action extends React.Component {
  render() {
    return (
      <div>
        <button>Help me decide!</button>
        <button>Remove All</button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>'Here are your options' / 'No options' </p>
        <Option />
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <ol>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ol>
      </div>
    );
  }
}


class AddOption extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
