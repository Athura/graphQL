import React from 'react';
import Header from './Header';

//This is a functional component because its only used to display header and children components
//props.children makes sure body is always displaying the correct information
const App = (props) => {
    return(
        <div className="container" >
            <Header />
            {props.children}
        </div>
    )
};

export default App;