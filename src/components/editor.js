import { Component } from 'react';

import Markdown from './markdown';
import './editor.css'

// export default function Editor() {

//     // const placeholder = 'Type anything and it will be automatically converted to Markdown!';
//     // const lastText = localStorage.getItem('last-text');
//     // const [text, setText] = useState(lastText ? JSON.stringify(lastText) : '');

//     // function handleChange(e) {
//     //     // localStorage.setItem('last-text', JSON.parse(text));
//     // }
// }

export default class Editor extends Component {

    placeholder = 'Type anything and it will be automatically converted to Markdown!';
    state = {
        text: ''
    };

    componentDidMount() {
        const lastText = localStorage.getItem('last-text');

        if (lastText) this.setState({ text: JSON.parse(lastText) });
    }

    componentDidUpdate() {
        localStorage.setItem('last-text', JSON.stringify(this.state.text));
    }

    componentWillUnmount() {
        if (this.state.text) localStorage.setItem('last-text', JSON.parse(this.state.text));
    }

    handleFile(e) {
        console.log(e);
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
            <input type='file' onChange={this.handleFile} />
        </>
    }
}