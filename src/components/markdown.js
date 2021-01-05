import { parse } from 'marked';

import './markdown.css';

export default function Markdown(props) {
    function parseTextAsMarkdown(str) {
        return parse(str);
    }

    return <div id='markdown-text' dangerouslySetInnerHTML={{ __html: parseTextAsMarkdown(props.text) }} />;
}