console.log('App.js is running');

const app = {
  title: 'Indecision App',
  subtitle: 'Feeling indecisive? You\'ve come to the right place :)',
  options: []
};

// Handle form submission
const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    // append form data to array
    app.options.push(option);
    // reset form
    e.target.elements.option.value = '';
    render();
  }
};

// function to clear list when Remove All button is clicked
const removeAll = () => {
  app.options = [];
  render();
};

// grab html root div
let appRoot = document.getElementById('app');

// render function to be invoked upon page load and whenever data is changed (Manual Data Binding)
const render = () => {
  // JSX
  const template = (
    <div>
      <h1>{app.title && app.title}</h1>
      <p>{app.subtitle && app.subtitle}</p>
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        <li>Item one</li>
      </ol>

      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add Option</button>
      </form>
    </div>
  );

  // Grab root div and render JSX inside of it.
  ReactDOM.render(template, appRoot);
}

render();
