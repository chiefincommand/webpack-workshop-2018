//import football from './foo';
import {version} from '../package.json';
//import 'lodash-es'; //DO NOT DO THIS, Webpack won't be able to tree shake
//const lodash1 = (() => require('lodash-es'))(); //this line will add many many chunks to demonstrate code splitting

//import text from './file.txt';

//text();

const football = () => import(/* webpackChunkName: "foo" */ './foo').then((module) => module.default);
const bark = () => import(/* webpackChunkName: "foo" */ './bark').then((module) => module.default);


// import {a, b, c} from './bark';
//
// console.log(football, a, b, c);

//import {a} from './bark';

import imgSrc from './materialdesign-principles-metaphor.png'; //after it's been analyzed by webpack loader url-loader!/materialdesign-principles-metaphor.png
import './index.css';


//console.log(football, a); //we just used tree shaking and removing dead code

//console.log(`version ${version}`);


const button = document.createElement('button');
button.innerText = 'button';
button.addEventListener('click', () => {

    Promise.all([
        football().then((module) => {}),
            bark().then((module) => {}),
            import('date-fns/add_days')
    ]).then(([, , {addDays}]) => {

        let today = new Date();
        console.log( addDays(today, 1)); //webpack 4 cannot treeshake date-fns if we were only using a few of the functions
        debugger;
    });


});


const div = document.createElement('div');
div.innerHTML = `
    <select>
        <option value=""></option>
        <option value="a">Theme A</option>
        <option value="b">Theme B</option>
    </select>
`;


const fancyImage = document.createElement('img');
fancyImage.src = imgSrc;

const body = document.querySelector('body');

body.appendChild(button);

body.appendChild(fancyImage);

body.appendChild(div);

const span = document.createElement('span');
span.innerText = `version ${version}`;

body.appendChild(span);

div.firstElementChild.addEventListener('change', (event) => {

    //this is called a Context Module
    import(`./theme/${event.target.value}`).then((module) => {
        module.applyTheme();
    });

});

