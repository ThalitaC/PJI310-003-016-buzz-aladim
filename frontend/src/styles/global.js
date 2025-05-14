import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }

  html {
    font-size: ${({ fontSize }) => fontSize}%;
    scroll-behavior: smooth;
  }

  body {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  input, textarea {
    background-color: ${({ theme }) => theme.inputBackground || "#fff"};
    color: ${({ theme }) => theme.text};
    border: 1px solid #ccc;
    padding: 0.5em;
    border-radius: 0.3em;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
    }
  }

  button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    border-radius: 5px;
    padding: 0.8em 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.primaryHover};
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(13,110,253,0.5);
    }
  }

  .icon {
    transition: transform 0.2s ease;
  }

  .icon:hover {
    transform: scale(1.2);
  }

  .modal-content {
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export default Global;
