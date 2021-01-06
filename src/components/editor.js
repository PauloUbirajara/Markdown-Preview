import React, { Component } from 'react';

import Markdown from './markdown';
import './editor.css'

// const fs = require('fs');

export default class Editor extends Component {

    constructor() {
        super();
        this.placeholder = 'Type anything and it will be automatically converted to Markdown!';
        this.state = {
            text: ''
        };

        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        try {
            const lastText = localStorage.getItem('last-text');

            if (lastText) this.setState({ text: JSON.parse(lastText) });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate() {
        localStorage.setItem('last-text', JSON.stringify(this.state.text));
    }

    componentWillUnmount() {
        if (this.state.text) localStorage.setItem('last-text', JSON.parse(this.state.text));
    }

    async handleFile(e) {
        e.preventDefault();

        const reader = new FileReader();

        reader.onload = async (e) => {

            const text = (e.target.result);

            if (text) {
                this.setState({ text });
                // localStorage.setItem('last-text', text);
            }
        }

        reader.readAsText(e.target.files[0], 'utf8')
    }

    render() {
        return <>
            <div id='editor'>
                <div id='user-textarea'>
                    <textarea
                        cols='75'
                        rows='25'
                        onChange={(e) => this.setState({ text: e.target.value })}
                        value={this.state.text}
                        placeholder={this.placeholder} />
                </div>
                <Markdown text={this.state.text} />
            </div>
            <input type='file' onChange={this.handleFile} id='submit-file' />
        </>;
    }
}