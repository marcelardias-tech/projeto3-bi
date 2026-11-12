'use client'
import { handler } from "next/dist/build/templates/app-route";
import { useState } from "react";

export default function NovoProduto() {

const [nome, setNome]= useState('');
const [preco, setPreco]= useState('');
const [erro, setErro] = useState('')
const enviar = async (e) => {
    e.preventDefault();
    const precoNumber = Number(preco);
    if (nome.trim().length==0 || preco.Number ==0) {
        setErro()
        return;
    }
    const produto = {
        nome: nome,
        preco: precoNumber,
    }
    try {
        const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(produto),
        });
        if (!response.ok) throw new Error('Erro ao adicionar o produto');
        alert(`Produto ${nome} Salvo`)
        setNome('')
        setNome('')
    } catch {
        console.log('Erro ao adicionar o produto'(erro))
    }
}

    return (
        <div>
            <h1>CADASTRO DE PRODUTO</h1>
            {erro && <p>style={{color:'red'}}{erro}!!!</p>}
            <form>
                <fieldset onSubmit={enviar}>
                    <label>Nome: </label>
                    <imput type="text" placeholder = "Digite o nome" required id="nome" 
                    onChange={(e) => setNome(e.target.value)}/>
                    
                     <label>Preço: </label>
                    <imput type="text" placeholder = "Digite o preço" required id="preco"
                    onChange={(e) => setPreco(e.target.value)}/>
                </fieldset>
                <button type="submit" onClick={enviar}>Salvar</button>
                <button type="reset" onClick={()=> {setNome(''); setPreco('')}}>Limpar</button>
            </form>
        </div>
    )
}