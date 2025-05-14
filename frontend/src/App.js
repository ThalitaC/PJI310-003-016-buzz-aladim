import GlobalStyle from "./styles/global";
import styled, { ThemeProvider } from "styled-components";
import Grid from "./components/Grid";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import Form from "./components/Form";
import { FontSizeProvider, useFontSize } from "./contexts/FontSizeContext";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./contexts/ThemeContext";

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 0.5em;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, #6610f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1em;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 0.3em;
  width: 60%;
  font-size: 1em;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: #0D6EFD;
    box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
  }
`;

const FontButtons = styled(ButtonGroup)`
  margin-bottom: 1em;
`;

function MainApp() {
  const [onEdit, setOnEdit] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const gridRef = useRef();

  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Buzz Aladim</Title>
        <FontButtons>
          <Button variant="secondary" onClick={decreaseFontSize}>A-</Button>
          <Button variant="secondary" onClick={increaseFontSize}>A+</Button>
          <Button variant="dark" onClick={toggleTheme}>
            {theme.name === 'light' ? '☀️🌙' : '🌙☀️'}
          </Button>
        </FontButtons>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar aluno por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="success" onClick={() => setIsModalOpen(true)}>Novo passageiro</Button>
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
            <Form
              onEdit={onEdit}
              setOnEdit={setOnEdit}
              getAlunos={gridRef.current?.getAlunos}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal.Body>
        </Modal>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle fontSize={fontSize} />
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <FontSizeProvider>
        <MainApp />
      </FontSizeProvider>
    </CustomThemeProvider>
  );
}

export default App;
