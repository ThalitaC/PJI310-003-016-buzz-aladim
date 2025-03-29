import { db } from "../db.js";

export const getAlunos = (req, res) => {
    const sqlQuery = "SELECT * FROM alunos";
    db.query(sqlQuery, (err, result) => {
        const parsedResult = result.map(item => ({
            ...item,
            data_nascimento: new Date(item.data_nascimento).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
            horario_entrada: new Date(`01/01/2000 ${item.horario_entrada}`).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }),
            horario_saida: new Date(`01/01/2000 ${item.horario_saida}`).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }),
            mensalidade: "R$ " + parseFloat(item.mensalidade).toFixed(2).replace(".", ","),
        }));

        if (err) {
            return res.json(err);
        } else {
            console.log("Itens recuperados com sucesso!");
            res.status(200).json(parsedResult);
        }
    });
};

export const addAluno = (req, res) => {
    const sqlQuery = "INSERT INTO alunos (`nome_aluno`, `data_nascimento`, `horario_entrada`, `horario_saida`, `nome_responsavel`, `endereco`, `telefone`, `escola`, `mensalidade`) VALUES (?)";

    const values = [
        req.body.nome_aluno,
        req.body.data_nascimento,
        req.body.horario_entrada,
        req.body.horario_saida,
        req.body.nome_responsavel,
        req.body.endereco,
        req.body.telefone,
        req.body.escola,
        req.body.mensalidade,
    ];

    db.query(sqlQuery, [values], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(200).json("Aluno adicionado com sucesso!");
        }
    });
};
