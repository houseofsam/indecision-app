console.log('App.js is running');

const app = {
  title: 'Indecision App',
  subtitle: 'Feeling indecisive? You\'ve come to the right place :)',
  options: ['one', 'two']
};

// JSX
const template = (
  <div>
    <h1>{app.title && app.title}</h1>
    <p>{app.subtitle && app.subtitle}</p>
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

let appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);