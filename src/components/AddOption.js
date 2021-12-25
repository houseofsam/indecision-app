import React from 'react';

export default class AddOption extends React.Component {
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