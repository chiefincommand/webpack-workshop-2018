import football from './foo';
import {version} from '../package.json';

// import {a, b, c} from './bark';
//
// console.log(football, a, b, c);

import {a} from './bark';

import imgSrc from './materialdesign-principles-metaphor.png';
import './index.css';


console.log(football, a); //we just used tree shaking and removing dead code

console.log(`version ${version}`);


const button = document.createElement('button');
button.innerText = 'button';


const fancyImage = document.createElement('img');
fancyImage.src = imgSrc;

const body = document.querySelector('body');

body.appendChild(button);

body.appendChild(fancyImage);
