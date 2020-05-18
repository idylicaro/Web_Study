import React from 'react';
import ReactDom from 'react-dom';

//import Primeiro from './componentes/Primeiro';
//import BomDia from './componentes/BomDia';
//import Multi from './componentes/Multiplos'
//import Saudacao from './componentes/Saudacao'
import Pai from './componentes/Pai';
import Filho from './componentes/Filho';

ReactDom.render(
    <div>
        <Pai nome="Higino" sobrenome="Santos">
            {/* Como passo os componentes filhos aqui? */}
            <Filho nome="Icaro" />
            <Filho nome="Carla" />    
        </Pai>
    </div>
 , document.getElementById('root'));