import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;

  height: 7rem;
  width: 100%;
  padding: 3rem;

  user-select: none;
  background: linear-gradient(
    90deg,
    rgba(184, 0, 0, 1) 0%,
    rgba(255, 33, 33, 1) 93%
  );
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);
  border-radius: 0 0 50px 50px;

  h1 {
    margin-right: 2rem;

    color: white;
  }
`;

const Input = styled.input`
  margin-right: 1rem;
  padding: 0.5rem 1rem;

  border-radius: 12px;
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;

  font-weight: 600;

  border-radius: 12px;
  color: ${(props) => (props.secondary ? "#00bbff" : "white")};
  background: ${(props) =>
    props.secondary
      ? "linear-gradient(90deg, rgba(181,203,208,1) 0%, rgba(255,255,255,1) 100%)"
      : "linear-gradient(0deg,rgba(34, 193, 195, 1) 0%,rgba(45, 253, 88, 1) 100%)"};
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  &:active {
    transition: all 0.1s ease-in-out;
    box-shadow: none;
    filter: brightness(0.8);
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export default function Navbar({ currentUser, setCurrentUser, setUserData }) {
  const [username, setUsername] = useState("");

  const history = useHistory();
  const { pathname } = useLocation();

  function handleSubmit() {
    setCurrentUser(username);
    setUsername("");
  }

  function handleLogout() {
    setCurrentUser("");
    setUserData({});
  }

  return (
    <NavbarContainer>
      {currentUser ? (
        <>
          <Flex>
            <h1>{currentUser}</h1>
            <Button onClick={handleLogout} secondary>
              Sair
            </Button>
          </Flex>

          {pathname === "/" ? (
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                history.push("/liked-pokemons");
              }}
            >
              Favoritos
            </Button>
          ) : (
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                history.push("/");
              }}
            >
              Voltar
            </Button>
          )}
        </>
      ) : (
        <Flex>
          <form>
            <Input
              placeholder="Nome de usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button onClick={handleSubmit}>Login</Button>
          </form>
        </Flex>
      )}
    </NavbarContainer>
  );
}
