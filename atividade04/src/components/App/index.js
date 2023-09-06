import React from 'react';
import { withFirebase } from '../Firebase';

import ListProds from './listProds.js'

const applicaiton=(props)=>{

    return(
        <div >
        <div className='titlePage'>
            Produtos
        </div>
        <ListProds firebase={props.firebase}></ListProds>
    </div>);
}

const App = withFirebase(applicaiton)
export default App;