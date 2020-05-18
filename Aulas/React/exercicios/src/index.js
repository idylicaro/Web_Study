import React from 'react';
import ReactDom from 'react-dom';

//import Primeiro from './componentes/Primeiro';
//import BomDia from './componentes/BomDia';

import Multi from './componentes/Multiplos'

ReactDom.render(
    <div>
        <Multi.BoaTarde nome="icaro" />
        <Multi.BoaNoite nome="igor" />
    </div>
 , document.getElementById('root'));