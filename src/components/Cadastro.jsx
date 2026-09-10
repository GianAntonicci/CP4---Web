import { useEffect, useState } from "react"

const Cadastro = () => {
  // Inicializa o estado com as tarefas salvas no navegador.
  const [tarefas, setTarefas] = useState(() => {
    const dadosSalvos = localStorage.getItem("tarefas");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Armazena os valores controlados pelo formulário.
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  // Executa sempre que "tarefas" muda para atualizar o localStorage.
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Callback chamado quando o formulário é enviado.
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

  // Callback que remove a tarefa cujo id foi recebido.
  const removerTarefa = (id) => {
    // filter cria uma lista sem a tarefa selecionada.
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
          // Callback que atualiza o estado do nome conforme o usuário digita.
          onChange={(event) => setNome(event.target.value)}
        />

        <input
          type="date"
          value={data}
          // Callback que atualiza o estado da data.
          onChange={(event) => setData(event.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          // Callback que atualiza o estado da descrição.
          onChange={(event) => setDescricao(event.target.value)}
        />

        <select
          value={prioridade}
          // Callback que atualiza o estado da prioridade.
          onChange={(event) => setPrioridade(event.target.value)}
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {/* map executa um callback para renderizar cada tarefa da lista. */}
      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <p>Nome: {tarefa.nome}</p>
          <p>Data: {tarefa.data}</p>
          <p>Descrição: {tarefa.descricao}</p>
          <p>Prioridade: {tarefa.prioridade}</p>

          {/* Callback que envia o id da tarefa para a função de remoção. */}
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
