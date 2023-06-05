import React from 'react';
import QuickChat from '~/QuickChat';

function App() {
    return (
        <div className="App">
            <QuickChat socketUrl="http://localhost:5005" />
        </div>
    );
}

export default App;
