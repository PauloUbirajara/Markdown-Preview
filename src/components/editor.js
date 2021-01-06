import React, { Component } from 'react';

import Markdown from './markdown';
import './editor.css'

export default class Editor extends Component {

    constructor() {
        super();
        this.placeholder = 'Type anything and it will be automatically converted to Markdown!';
        this.state = {
            text: ''
        };

        this.handleFile = this.handleFile.bind(this);
        this.clearFile = this.clearFile.bind(this);
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

            try {
                const text = (e.target.result);

                if (text) {
                    this.setState({ text });
                }
            } catch (err) {
                window.alert("Error during file processing!");
                console.err("Error during file processing!");
            }
        }

        reader.readAsText(e.target.files[0], 'utf8')
    }

    clearFile() {
        this.setState({
            text: ''
        });
    }

    async getTextAsHTML() {
        try {
            const markdownText = document.getElementById('markdown-text');

            await navigator.clipboard.writeText(markdownText.outerHTML);

            window.alert("Text copied to your clipboard!");
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return <>
            <h1>Markdown Preview</h1>
            <p id='hint'>You can also submit a file and Markdown Preview will read the content! (Try using only text files or it can cause some performance issues)</p>
            <div id='controls'>
                <button id='copy-html' onClick={this.getTextAsHTML}>Copy Markdown as HTML</button>
                <input type='file' onChange={this.handleFile} id='submit-file' />
                <button onClick={this.clearFile}>Reset text</button>
            </div>
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
        </>;
    }
}