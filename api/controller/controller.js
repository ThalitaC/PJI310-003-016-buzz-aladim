import { db } from "../db.js";

export const getItens = (req, res) => {
    const sqlQuery = "SELECT * FROM alunos";
    db.query(sqlQuery, (err, result) => {
        const parsedResult = result.map(item => ({
            ...item,
        }));

        if (err) {
            console.log(err.code,err.message);
            return res.json(err);
        } else {
            console.log("Itens recuperados com sucesso!");
            res.status(200).json(parsedResult);
        }
    });
};