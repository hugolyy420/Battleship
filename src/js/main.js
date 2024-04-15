import DOMModule from './DOM';
import '../style.css';

window.addEventListener('load', () => {
  DOMModule.setUpNameSubmitEventListener();
});
