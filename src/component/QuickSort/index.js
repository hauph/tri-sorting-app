import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.js';
import './style.css';

export default class QuickSort extends React.Component {


    render() {

        return (
            <div className="sketch-wrapper quick-sort">
                <h1 className="title">Quick Sort</h1>
                <P5Wrapper sketch={sketch} />
            </div>
        )
    }
}