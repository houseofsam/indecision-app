class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: props.options
    };
  }
  // fetch data from local storage
  componentDidMount() {
    // Protect against edge case: If data inside of Options isn't valid JSON.
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      
      // Protect against edge case: If there is no valid data inside of options
      if (options) {
        // will only run if options is a truthy value
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all. Fall back to empty array which is default value
    }
  }
  // save data to local storage
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  // create handleDeleteOptions methods & pass into component
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
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

    this.setState((prevState) => ({ options: [...prevState.options, option] }))
  }
  
  render() {
    const subtitle = 'Feeling indecisive? You\'ve come to the right place 😄';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};

const Action = (props) => {
    return (
      <div>
        <button
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >
          Help me decide!
        </button>
      </div>
    );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Add an option to get started!</p>}
      {
        props.options.map((option, index) => (
          <Option
            key={index}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
         />)
      )}
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      Option: {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

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
    
    // local state for AddOption component
    this.setState(() => ({ error }))

    // Only wipe input field if data was successfully added
    if (!error) {
      e.target.elements.option.value = '';
    }

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
