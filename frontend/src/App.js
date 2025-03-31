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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [onEdit, setOnEdit] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef();

  return (
    <>
      <Container>
        <Title>Buzz Aladim</Title>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Novo passageiro</Button>
          <Grid ref={gridRef} setOnEdit={setOnEdit} alunos={alunos} setAlunos={setAlunos} setIsModalOpen={setIsModalOpen}/>
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
