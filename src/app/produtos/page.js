'use client'
import { useEffect, useState } from "react";
import CardProd from "@/components/CardProd";
//se chamar de index não precisa por o arquivo uma vez que ele importa automáticamente

export default function Produtos() {

    const [prods, setProds] = useState(null);
    const [cats, setCats] = useState(null);
    const [prodSelected, setProdSelected] = useState(null);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const response = fetch('https://stock.dev.vilhena.ifro.edu.br/api');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar Produtos: ${await response.statusText}`)
                }
                const data = await response.json();//converte os dados json para a lista de objetos 
                console.log(data);
                setProds(data);
            } catch (e) {
                console.log(`${e.message}`);
            }

        }
        fetchProds();
    }, []);

    useEffect(()=>{
        const fetchCats = async () => {
        const response = await fetch('https://stock.dev.vilhena.ifro.edu.br/api')
            if (!response.ok) {
                throw new Error (`Erro ao buscar Categorias ${response.statusText}`);
            }
            const data = await response.json();
            console.log (data) 
        }
        fetchCats()        
    }, []);

    const getNomeCategoria = (id_categoria) => {
        const categoria = cats?.find(cat => cat.id === id_categoria);
        return categoria ? categoria.nome : 'Categoria Indefinida';
    }

    const filtro = prods?.filter( p => p.nome.toLowerCase().includes(busca.toLowerCase()));

    return (
        <div>
                
            <h1>Produtos</h1>

            {filtro &&
                filtro.map((f) => (
                    <p key={f.id}>{f.nome}</p>
                ))
            }

            <input type="text" placeholder="Busque um produto" onChange={(e) => setBusca(e.target.value)}/>

            {prods === null ?
                <p>Carregando lista de produtos...</p> :
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>DESCRIÇÃO</th>
                                <th>CATEGORIA</th>
                                <th>ESTOQUE</th>
                                <th>PREÇO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prods.map((prod) => (

                                <tr Key={prod.id} onClick = {() => setProdSelected(prod)}> 
                                    <td>{prod.id}</td>
                                    <td>{prod.nome}</td>
                                    <td>{prod.descricao}</td>
                                    <td>{getNomeCategoria(prod.categoria_id)}</td>
                                    <td>{prod.quantidade_estoque}</td>
                                    <td>{prod.preco}</td>
                            
                                </tr>
                            ))}
                        </tbody>
                    
                
                    </table>



                </div> 
                
                }
                {prodSelected && <CardProd produto = {prodSelected} />}

        </div>
    )
}