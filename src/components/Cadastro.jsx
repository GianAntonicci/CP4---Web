import { useEffect, useState } from "react"

const corPrioridade = {
  Baixa: "bg-emerald-100 text-emerald-700",
  Média: "bg-amber-100 text-amber-700",
  Alta: "bg-rose-100 text-rose-700",
};
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
  const [prioridade, setPrioridade] = useState("Média")
  const [filtro, setFiltro] = useState("todas");

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
      concluida: false,
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

  const alternarConclusao = (id) => {
    setTarefas(tarefas.map((tarefa) =>
    tarefa.id === id ? {...tarefa,concluida: !tarefa.concluida} : tarefa));
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  })

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Tarefas
        </h1>

        <form
          onSubmit={cadastrarTarefa}
          className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md"
        >
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <input
            type="date"
            value={data}
            onChange={(event) => setData(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            className="min-h-[90px] resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <select
            value={prioridade}
            onChange={(event) => setPrioridade(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
          >
            Adicionar
          </button>
        </form>

        <div className="mb-6 flex justify-center gap">
          <button  type="button" onClick={() => setFiltro("todas")} className={`rounded-full px-4 py-1.5 text-sm font-medium transiton-colors ${filtro === "todas"
            ? "bg-indigo-600 text white" : "bg-white text-slate-600 hover:bg-slate-200"}`}>Todas</button>
          <button  type="button" onClick={() => setFiltro("pendentes")} className={`rounded-full px-4 py-1.5 text-sm font-medium transiton-colors ${filtro === "pendentes"
            ? "bg-indigo-600 text white" : "bg-white text-slate-600 hover:bg-slate-200"}`}>Pendentes</button>
          <button  type="button" onClick={() => setFiltro("concluidas")} className={`rounded-full px-4 py-1.5 text-sm font-medium transiton-colors ${filtro === "concluidas"
            ? "bg-indigo-600 text white" : "bg-white text-slate-600 hover:bg-slate-200"}`}>Concluidas</button>
        </div>

        <div className="flex flex-col gap-4">
          {tarefas.length === 0 && (
            <p className="text-center text-slate-400">
              Nenhuma tarefa cadastrada ainda.
            </p>
          )}

          {tarefasFiltradas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-800">
                  {tarefa.nome}
                </h2>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${corPrioridade[tarefa.prioridade]}`}
                >
                  {tarefa.prioridade}
                </span>
              </div>

              <p className="mb-1 text-sm text-slate-500">
                Data: <span className="text-slate-700">{tarefa.data}</span>
              </p>
              <p className="mb-4 text-sm text-slate-600">{tarefa.descricao}</p>

              <div className="flex gap-2">
                <button type="button" onClick={() => alternarConclusao(tarefa.id)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${tarefa.concluida ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>{tarefa.cooncluida ? "Marcar como pendente": "Marcar como concluida"} </button>

              <button
                type="button"
                onClick={() => removerTarefa(tarefa.id)}
                className="rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
              >
                Apagar tarefa
              </button>
            </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Cadastro
