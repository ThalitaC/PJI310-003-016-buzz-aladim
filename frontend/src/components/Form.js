import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({ onEdit, setOnEdit, getAlunos, setIsModalOpen }) => {
    const [formData, setFormData] = useState({
        nome_aluno: "",
        data_nascimento: "",
        horario_entrada: "",
        horario_saida: "",
        nome_responsavel: "",
        endereco: "",
        telefone: "",
        escola: "",
        mensalidade: ""
    });

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    useEffect(() => {
        if (onEdit) {
            setFormData({
                nome_aluno: onEdit.nome_aluno,
                data_nascimento: parseDate(onEdit.data_nascimento),
                horario_entrada: onEdit.horario_entrada,
                horario_saida: onEdit.horario_saida,
                nome_responsavel: onEdit.nome_responsavel,
                endereco: onEdit.endereco,
                telefone: onEdit.telefone.replace(/\D/g, ''),
                escola: onEdit.escola,
                mensalidade: parseFloat(onEdit.mensalidade.replace(/[^\d,-]/g, ''))
            });
        } else {
            setFormData({
                nome_aluno: "",
                data_nascimento: "",
                horario_entrada: "",
                horario_saida: "",
                nome_responsavel: "",
                endereco: "",
                telefone: "",
                escola: "",
                mensalidade: ""
            });
        }
    }, [onEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nome_aluno ||
            !formData.data_nascimento ||
            !formData.horario_entrada ||
            !formData.horario_saida ||
            !formData.nome_responsavel ||
            !formData.endereco ||
            !formData.telefone ||
            !formData.escola ||
            !formData.mensalidade
        ) {
            return toast.warn("Preencha todos os campos obrigatórios!");
        }

        if (onEdit) {
            await axios
                .put(`${process.env.REACT_APP_URL || "http://localhost:8080"}${onEdit.id}`, formData)
                .then(({ data }) => {
                    toast.success(data);
                    getAlunos();
                    setOnEdit(null);
                    setIsModalOpen(false);
                })
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post(process.env.REACT_APP_URL || "http://localhost:8080", formData)
                .then(({ data }) => {
                    toast.success(data);
                    getAlunos();
                    setIsModalOpen(false);
                })
                .catch(({ data }) => toast.error(data));
        }

        // Limpar os campos
        setFormData({
            nome_aluno: "",
            data_nascimento: "",
            horario_entrada: "",
            horario_saida: "",
            nome_responsavel: "",
            endereco: "",
            telefone: "",
            escola: "",
            mensalidade: ""
        });
        setOnEdit(null);
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_aluno" className="form-label">Nome do Aluno</label>
                        <input 
                            name="nome_aluno" 
                            id="nome_aluno" 
                            className="form-control"
                            value={formData.nome_aluno}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="data_nascimento" className="form-label">Data de Nascimento</label>
                        <input 
                            name="data_nascimento" 
                            id="data_nascimento" 
                            type="date" 
                            className="form-control"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_entrada" className="form-label">Horário de Entrada</label>
                        <input 
                            name="horario_entrada" 
                            id="horario_entrada" 
                            type="time" 
                            className="form-control"
                            value={formData.horario_entrada}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="horario_saida" className="form-label">Horário de Saída</label>
                        <input 
                            name="horario_saida" 
                            id="horario_saida" 
                            type="time" 
                            className="form-control"
                            value={formData.horario_saida}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nome_responsavel" className="form-label">Responsavel</label>
                        <input 
                            name="nome_responsavel" 
                            id="nome_responsavel" 
                            className="form-control"
                            value={formData.nome_responsavel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input 
                            name="endereco" 
                            id="endereco" 
                            className="form-control"
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input 
                            name="telefone" 
                            id="telefone" 
                            className="form-control"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="escola" className="form-label">Escola</label>
                        <input 
                            name="escola" 
                            id="escola" 
                            className="form-control"
                            value={formData.escola}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="mensalidade" className="form-label">Mensalidade</label>
                        <input 
                            name="mensalidade" 
                            id="mensalidade" 
                            type="number" 
                            className="form-control"
                            value={formData.mensalidade}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-check"></i>Salvar
                </button>
            </form>
        </div>
    );
};

export default Form;
