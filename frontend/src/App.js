import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Grid from "./components/Grid";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";
import Form from "./components/Form";

const Container = styled.div`
  width: 100%;
  max-width: 90%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;

const Title = styled.h2``;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 0.2em;
`;

const SearchInput = styled.input`
  display: flex;
  padding: 0.3em;
  border: 1px solid #ccc;
  border-radius: 0.2em;
  width: 30%;
  font-size: 1em;
  &:focus {
    outline: none;
    border-color: #0D6EFD;
  }
`;

function App() {
  const [onEdit, setOnEdit] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const gridRef = useRef();

  return (
    <>
      <Container>
        <Title>Buzz Aladim</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar aluno por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Novo passageiro</Button>
        </SearchContainer>
        <Grid 
          ref={gridRef} 
          setOnEdit={setOnEdit} 
          alunos={alunos} 
          setAlunos={setAlunos} 
          setIsModalOpen={setIsModalOpen}
          searchTerm={searchTerm}
        />
        <Modal show={isModalOpen} onHide={() => {
            setIsModalOpen(false);
            setOnEdit(null);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{onEdit ? "Editar Passageiro" : "Novo Passageiro"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getAlunos={gridRef.current?.getAlunos} setIsModalOpen={setIsModalOpen} />
            </Modal.Body>
        </Modal>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
