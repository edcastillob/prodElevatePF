import styled, { css } from "styled-components";

export const StyledApp = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffff" : "#333")};
`;

export const StyledButton = styled.button`
  // background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#ddd")};
  color: ${({ theme }) => (theme === "dark" ? "yellow" : "#fff")};
  background: ${({ theme }) => (theme === "dark" ? "none" : "none")};
  border: ${({ theme }) => (theme === "dark" ? "none" : "none")};
  margin-top: ${({ theme }) => (theme === "dark" ? "0.5rem" : "0.5rem")};
  margin-left: ${({ theme }) => (theme === "dark" ? "0.5rem" : "0.5rem")};
 

  // Otros estilos
`;