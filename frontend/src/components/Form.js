import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({ onEdit, setOnEdit }) => {
    const ref = useRef();
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    useEffect(() => {
        if (onEdit) {
            const aluno = ref.current;
            aluno.nome_aluno = onEdit.nome_aluno;
            aluno.data_nascimento = parseDate(onEdit.data_nascimento);
            aluno.horario_entrada = onEdit.horario_entrada;
            aluno.horario_saida = onEdit.horario_saida;
            aluno.nome_responsavel = onEdit.nome_responsavel;
            aluno.endereco = onEdit.endereco;
            aluno.telefone = onEdit.telefone.replace(/\D/g, '');
            aluno.escola = onEdit.escola;
            aluno.mensalidade = parseFloat(onEdit.mensalidade.replace(/[^\d,-]/g, ''));
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const aluno = Object.fromEntries(formData.entries());
        if (
            !aluno.nome_aluno ||
            !aluno.data_nascimento ||
            !aluno.horario_entrada ||
            !aluno.horario_saida ||
            !aluno.nome_responsavel ||
            !aluno.endereco ||
            !aluno.telefone ||
            !aluno.escola ||
            !aluno.mensalidade
        ) {
            return toast.warn("Preencha todos os campos obrigatórios!");
        }

        if (onEdit) {

            const updatedData = {
                nome_aluno: aluno.nome_aluno,
                data_nascimento: aluno.data_nascimento,
                horario_entrada: aluno.horario_entrada,
                horario_saida: aluno.horario_saida,
                nome_responsavel: aluno.nome_responsavel,
                endereco: aluno.endereco,
                telefone: aluno.telefone,
                escola: aluno.escola,
                mensalidade: parseFloat(aluno.mensalidade.replace(/[^\d,-]/g, '')),
            };

            await axios
                .put(process.env.REACT_APP_URL || `http://localhost:8080` + `/${onEdit.id}`, updatedData)
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post(process.env.REACT_APP_URL || "http://localhost:8080", {
                    nome_aluno: aluno.nome_aluno,
                    data_nascimento: aluno.data_nascimento,
                    horario_entrada: aluno.horario_entrada,
                    horario_saida: aluno.horario_saida,
                    nome_responsavel: aluno.nome_responsavel,
                    endereco: aluno.endereco,
                    telefone: aluno.telefone,
                    escola: aluno.escola,
                    mensalidade: parseFloat(aluno.mensalidade.replace(/[^\d,-]/g, '')),
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        // Limpar os campos
        e.target.reset();
        setOnEdit(null);
    };

    return (
        <div className="container mt-4">
            <form ref={ref} onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_aluno" className="form-label">Nome do Aluno</label>
                        <input name="nome_aluno" id="nome_aluno" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="data_nascimento" className="form-label">Data de Nascimento</label>
                        <input name="data_nascimento" id="data_nascimento" type="date" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_entrada" className="form-label">Horário de Entrada</label>
                        <input name="horario_entrada" id="horario_entrada" type="time" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_saida" className="form-label">Horário de Saída</label>
                        <input name="horario_saida" id="horario_saida" type="time" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_responsavel" className="form-label">Responsavel</label>
                        <input name="nome_responsavel" id="nome_responsavel" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input name="endereco" id="endereco" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input name="telefone" id="telefone" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="escola" className="form-label">Escola</label>
                        <input name="escola" id="escola" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="mensalidade" className="form-label">Mensalidade</label>
                        <input name="mensalidade" id="mensalidade" type="number" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"> <i className="fas fa-check"></i>Salvar</button>
            </form>
        </div>
    );
};

export default Form;
