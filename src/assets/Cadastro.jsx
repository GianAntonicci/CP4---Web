import { useEffect, useState } from "react"

const Cadastro = () => {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  return (
    <>

    </>
  )
}

export default Cadastro