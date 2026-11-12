'use client'; 
import { useState } from 'react';
import styles from './page.module.css';

export default function Sobre(){
// declare um estado booleano inicializado com true 'show'
const [show, setShow] = useState(false);
    return(
        <main>
            <h1>Sobre</h1>
            <button type='button' onClick={()=>setShow(!show)}>{show?'Esconder': 'Aparecer'}</button>
            { show &&
                <div>
                <h2>Estudo</h2>
                <p>Formação técnica em andamento no ifro</p>
            </div>
            }

        </main>
    )
}