import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  
  // create handleDeleteOptions methods & pass into component
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }
  
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }
  
  // handlePick to randomly choose and alert one of the user submitted options
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  }
  
  handleAddOption = (option) => {
    // add validation
    if (!option) {
      return 'Input field cannot be left blank!';
    } else if (this.state.options.indexOf(option) > -1 ) {
      // if this particular option already exists in the array
      return 'This option already exists!';
    }
    
    this.setState((prevState) => ({ options: [...prevState.options, option] }))
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  }

  // fetch data from local storage
  componentDidMount() {
    // Protect against edge case: If data inside of Options isn't valid JSON.
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      
      // Protect against edge case: If there is no valid data inside of options
      if (options) {
        // will only run if options is a truthy value. not null
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
  
  render() {
    const subtitle = 'Feeling indecisive? You\'ve come to the right place 😬';
    
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
};

export default IndecisionApp;