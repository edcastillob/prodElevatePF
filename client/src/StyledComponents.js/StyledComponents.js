import styled, { css } from "styled-components";

export const StyledApp = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffff" : "#333")};
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#ddd")};
  color: ${({ theme }) => (theme === "dark" ? "#ffff" : "#333")};

  // Otros estilos
`;
