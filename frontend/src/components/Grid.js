import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  white-space: nowrap;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 100%;
  margin: 20px auto;
  font-size: 0.75em;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding:5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding:5px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({setOnEdit}) => {
    const [alunos, setAlunos] = useState([]);

    const getAlunos = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_URL || "http://localhost:8080");
            setAlunos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getAlunos();
    }, []);

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete(process.env.REACT_APP_URL || "http://localhost:8080" + "/" + id)
            .then(({ data }) => {
                const newArray = alunos.filter((aluno) => aluno.id !== id);

                setAlunos(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table className="table table-bordered table-striped">
            <Thead className="thead-dark">
                <Tr>
                    <Th>Aluno</Th>
                    <Th>Nascimento</Th>
                    <Th>Responsável</Th>
                    <Th>Telefone</Th>
                    <Th>Endereço</Th>
                    <Th>Escola</Th>
                    <Th>Entrada</Th>
                    <Th>Saída</Th>
                    <Th>Mensalidade</Th>
                </Tr>
            </Thead>
            <Tbody>
                {alunos.length > 0 ? (
                    alunos.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.nome_aluno}</Td>
                            <Td>{item.data_nascimento}</Td>
                            <Td>{item.nome_responsavel}</Td>
                            <Td>{item.telefone}</Td>
                            <Td>{item.endereco}</Td>
                            <Td>{item.escola}</Td>
                            <Td>{item.horario_entrada}</Td>
                            <Td>{item.horario_saida}</Td>
                            <Td>{item.mensalidade}</Td>
                            <Td>
                                <FaEdit
                                    className="icon"
                                    onClick={() => handleEdit(item)}
                                />
                            </Td>
                            <Td>
                                <FaTrash
                                    className="icon"
                                    onClick={() => handleDelete(item.id)}
                                />
                            </Td>
                        </Tr>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Tbody>
        </Table>
    );

};

export default Grid;