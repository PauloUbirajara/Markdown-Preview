import { parse } from 'marked';

import './markdown.css';

export default function Markdown(props) {
    function parseTextAsMarkdown(str) {
        return parse(str);
    }

    // function getTextAsHTML() {
    //     const markdownText = document.getElementById('markdown-text');

    //     markdownText.select();
    //     markdownText.setSelectionRange(0, 99999);

    //     document.execCommand('copy');

    //     alert("Text copied to your clipboard!");
    // }

    return <>
        {/* <button id='copy-html' onClick={getTextAsHTML}>Copy as HTML</button> */}
        <div id='markdown-text' dangerouslySetInnerHTML={{ __html: parseTextAsMarkdown(props.text) }} />
    </>;
}