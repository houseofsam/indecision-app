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

// Pick an option randomly
const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  // Temp. solution. I'll look into modals later
  alert(option);
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
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>Help me decide!</button>
      <button onClick={removeAll}>Remove All</button>

      <ol>
        {/* Map over app.options and print them out as list items in browser */}
        {
          app.options.map((option, index) => <li key={index}>{option}</li>)
        }
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
