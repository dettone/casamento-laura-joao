import { useEffect } from "react";

export default function ListaDeConvidados(){
  const [ListaDeConvidados, setListaDeConvidados] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/v1/lista-de-convidados");
      const data = await response.json();
      setListaDeConvidados(data);
    }
    fetchData();
  }, []);


  return (
    <div>
      <h1>Lista de Convidados</h1>
      <ul>
        {ListaDeConvidados.map((convidado) => (
          <li key={convidado.id}>{convidado.nome}</li>
        ))}
      </ul>
    </div>
  );

}