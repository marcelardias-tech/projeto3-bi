'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function contato() {
    const [cont, setCont] = useState(0);
    const [nome, setNome] = useState('');
    const [msg, setMsg] = useState('');

    const somar = () => {
        setCont(cont + 1);
        console.log(cont);
    }
    return(
        <main>
            <h1 className={styles.h1}>Contato</h1>
            <p>Cont: {cont}</p>
            <button type='button' onClick={somar}>Somar</button>

            <form>
                <fieldset>
                    <p>Nome digitado: {nome}</p>
                    <label htmlFor='nome'>Nome:</label>
                    <input type="text" id='nome' name='nome' onKeyUp={e => setNome(e.target.value)}/>
                    <label htmlFor='msg'>Mensagem: </label>
                    <input type="text" id='msg' onKeyUp={e => setMsg(e.target.value)}/>
                    <button type='button' onClick={()=> alert(msg)}>OK</button>
                </fieldset>
            </form>
        </main>
    )
}