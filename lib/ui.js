var ora = require('ora');

module.exports = {
  makeSpinner: makeSpinner,
  error: error,
  log: log
};

function makeSpinner() {
  return ora({
    text: '',
    spinner: {
      interval: 100,
      frames: [
        '⠄ NPM Installing .',
        '⠆ NPM Installing ..',
        '⠇ NPM Installing ...',
        '⠋ NPM Installing ....',
        '⠙ NPM Installing .....',
        '⠸ NPM Installing ......',
        '⠰ NPM Installing .......',
        '⠠ NPM Installing ......',
        '⠰ NPM Installing .....',
        '⠸ NPM Installing ....',
        '⠙ NPM Installing ...',
        '⠋ NPM Installing ..',
        '⠇ NPM Installing .',
        '⠆ NPM Installing '
      ]
    }
  });
}

function log(messages) {
  if (typeof messages === 'string') {
    console.log(messages);
  } else {
    messages.forEach(function(msg) {
      console.log(msg);
    });
  }
}

function error(messages) {
  console.log();
  if (typeof messages === 'string') {
    console.error(messages);
  } else {
    messages.forEach(function(msg) {
      console.error(msg);
    });
  }
  console.log();
};
