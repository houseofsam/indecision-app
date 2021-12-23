class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }
  // create handleDeleteOptions methods & pass into component
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  // handlePick to randomly choose and alert one of the user submitted options
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAddOption(option) {
    // add validation
    if (!option) {
      return 'Input field cannot be left blank!';
    } else if (this.state.options.indexOf(option) > -1 ) {
      // if this particular option already exists in the array
      return 'This option already exists!';
    }

    this.setState((prevState) => {
      return {
        options: [...prevState.options, option]
      }
    });
  }
  render() {
    const title = 'Indecision App';
    const subtitle = 'Feeling indecisive? You\'ve come to the right place :)';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}


class Header extends React.Component {
  // React class components require render method to be defined
  render() {
    // console.log(this.props);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}



class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          Help me decide!
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {
          this.props.options.map((option, index) => <Option key={index} optionText={option} />)
        }
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>Option: {this.props.optionText} </p>
      </div>
    );
  }
}


class AddOption extends React.Component {
  constructor(props) {
    super(props),
    this.handleAddOption = this.handleAddOption.bind(this),
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    // wouldn't make sense to have the following lines in parent so keep this function here
    // and call this.props.handleAddOption() inside of it
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    e.target.elements.option.value = '';

    this.setState(() => {
      return { error };
    });
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
