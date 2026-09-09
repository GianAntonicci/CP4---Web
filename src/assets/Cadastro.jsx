import { useEffect, useState } from "react"

const Cadastro = () => {
  const [tarefas, setTarefas] = useState(() => {
    const dadosSalvos = localStorage.getItem("tarefas");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const cadastrarTarefa = (event) => {
    event.preventDefault();

    if (!nome || !data || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      nome,
      data,
      descricao,
      prioridade,
    };

    setTarefas([...tarefas, novaTarefa]);

    setNome("");
    setData("");
    setDescricao("");
    setPrioridade("Média");
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <>
      <h1>Tarefas</h1>

      <form onSubmit={cadastrarTarefa}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <input
          type="date"
          value={data}
          onChange={(event) => setData(event.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />

        <select
          value={prioridade}
          onChange={(event) => setPrioridade(event.target.value)}
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <p>Nome: {tarefa.nome}</p>
          <p>Data: {tarefa.data}</p>
          <p>Descrição: {tarefa.descricao}</p>
          <p>Prioridade: {tarefa.prioridade}</p>

          <button type="button" onClick={() => removerTarefa(tarefa.id)}>
            Apagar tarefa
          </button>

          <hr />
        </div>
      ))}
    </>
  );
};


export default Cadastro