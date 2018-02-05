import { render } from 'react-dom';
import React from 'react';
import { APP_CSS_ID } from './constants';
import Blink from './blink/Blink.jsx';
import './styles/index.scss';

const appRoot = document.getElementById(APP_CSS_ID);

render(<Blink />, appRoot);
