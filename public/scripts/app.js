'use strict';

console.log('App.js is running');

var app = {
  title: 'Indecision App',
  subtitle: 'Feeling indecisive? You\'ve come to the right place :)',
  options: ['one', 'two']
};

// JSX
var template = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    app.title && app.title
  ),
  React.createElement(
    'p',
    null,
    app.subtitle && app.subtitle
  ),
  React.createElement(
    'p',
    null,
    app.options.length > 0 ? 'Here are your options' : 'No options'
  ),
  React.createElement(
    'ol',
    null,
    React.createElement(
      'li',
      null,
      'Item one'
    ),
    React.createElement(
      'li',
      null,
      'Item two'
    )
  )
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
