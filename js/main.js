const audioElement = document.querySelector('audio');

document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
});

class Main {
  constructor() {
    this.button = document.querySelector('button');
    this._init();
  }

  _init() {
    this._addEvent();
  }

  // Disable/Enable Button
  _toggleButton() {
    this.button.disabled = !button.disabled;
  }

  // Passing Joke to to VoiceRSS API
  _tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
      key: '39a82d031069455eb4e2f86e8200b017',
      src: jokeString,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    });
  }

  // Get Jokes from Joke API
  async _getJokes() {
    let joke = '';
    const apiUrl =
      'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
        joke = data.joke;
      }

      // Text-to-Speech
      this._tellMe(joke);

      // Disable Button
      this._toggleButton();
    } catch (error) {
      // Catch Errors Here
      console.log('fetch failed', error);
    }
  }

  _addEvent() {
    // Event Listeners
    this.button.addEventListener('click', this._getJokes.bind(this));
    audioElement.addEventListener('ended', this._toggleButton.bind(this));
  }
}
