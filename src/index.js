import React from 'react';
import { render } from 'react-dom';
import timelineItems from './timelineItems';

const App = () => (
    <div style={{padding: 20}}>
        <h1>Timeline Viewer</h1>
        <Timeline items={timelineItems}/>
    </div>
);

render(<App/>, document.getElementById('root'));
