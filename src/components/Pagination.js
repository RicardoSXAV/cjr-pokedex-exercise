import { useState } from "react";
import styled from "styled-components";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useWindowDimensions from "../hooks/useWindowDimensions";

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  margin: auto;
  margin-top: 3rem;
  padding: 1rem 2rem;

  z-index: 4;

  border-radius: 50px 50px 0 0;
  background: linear-gradient(
    90deg,
    rgba(184, 0, 0, 1) 0%,
    rgba(255, 33, 33, 1) 93%
  );

  transition: all 0.5s ease-in-out;

  #pagination-arrow {
    font-size: 2.5rem;
    margin: 1rem;

    border-radius: 12px;
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(45, 253, 88, 1) 100%
    );
    box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      filter: brightness(1.2);
    }
  }

  p {
    font-weight: 600;
    color: white;
    user-select: none;
  }

  // Mobile Adaptation

  @media (max-width: 900px) {
    flex-wrap: wrap;
    padding: 1rem;
  }

  @media (max-width: 589px) {
    width: fit-content;
    padding: 2rem 1.2rem;

    p {
      display: none;
    }

    button {
      margin: 0 1rem;
    }
  }

  @media (max-width: 300px) {
    padding: 1rem;

    button {
      margin: 0.5rem;
    }
  }
`;

const Button = styled.button`
  width: 4rem;
  height: 4rem;

  margin: 1rem;
  user-select: none;

  font-size: 1.5rem;
  font-weight: 600;

  border-radius: 12px;
  color: ${(props) => (props.active ? "#00bbff" : "white")};
  background: ${(props) =>
    props.active
      ? "linear-gradient(90deg, rgba(181,203,208,1) 0%, rgba(255,255,255,1) 100%);"
      : "linear-gradient(90deg,rgba(0, 154, 209, 1) 0%,rgba(0, 187, 255, 1) 93%);"};
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(1.3);
  }

  &:active {
    box-shadow: none;
    filter: brightness(0.8);
  }

  @media (max-width: 900px) {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.5rem;
    font-size: 1rem;
  }

  @media (max-width: 589px) {
    display: none;
  }
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;

  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  border-radius: 12px;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(45, 253, 88, 1) 100%
  );
  box-shadow: 0px 8px 20px 3px rgba(0, 0, 0, 0.24);

  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  @media (max-width: 341px) {
    font-size: 1rem;
  }
`;

export default function Pagination(props) {
  const [rememberArray, setRememberArray] = useState([]);
  const { width } = useWindowDimensions();

  let arrayOfPages = [];

  if (props.totalPages > 7 && rememberArray.length === 0) {
    arrayOfPages = [1, 2, 3, 4, 5, 6, props.totalPages];
  } else if (rememberArray.length === 0) {
    for (let i = 0; i < props.totalPages; i++) {
      arrayOfPages.push(i + 1);
    }
  }

  if (rememberArray.length > 0) {
    arrayOfPages = [...rememberArray];
  }

  if (
    props.currentPage > arrayOfPages[4] &&
    arrayOfPages[5] < props.totalPages - 1
  ) {
    let auxiliaryArray1 = [...arrayOfPages];

    arrayOfPages = [];

    arrayOfPages.push(1);

    for (let i = auxiliaryArray1[3]; i < auxiliaryArray1[3] + 5; i++) {
      if (i === props.totalPages) {
        continue;
      }

      arrayOfPages.push(i);
    }

    arrayOfPages.push(props.totalPages);

    setRememberArray([...arrayOfPages]);
  }

  if (props.currentPage < arrayOfPages[2] && arrayOfPages[2] !== 3) {
    let auxiliaryArray2 = [...arrayOfPages];

    arrayOfPages = [];

    arrayOfPages.push(1);

    for (let i = auxiliaryArray2[3] - 4; i < auxiliaryArray2[3] + 1; i++) {
      arrayOfPages.push(i);
    }

    arrayOfPages.push(props.totalPages);

    setRememberArray([...arrayOfPages]);
  }

  return (
    <PaginationWrapper>
      {width > 589 ? (
        <MdKeyboardArrowLeft
          id="pagination-arrow"
          color="white"
          onClick={() =>
            props.currentPage > 1 && props.setCurrentPage(props.currentPage - 1)
          }
        />
      ) : (
        <PaginationButton
          onClick={() =>
            props.currentPage > 1 && props.setCurrentPage(props.currentPage - 1)
          }
        >
          Anterior
        </PaginationButton>
      )}

      {arrayOfPages.map((number, index) => (
        <>
          {index + 1 === arrayOfPages.length &&
            props.totalPages > 7 &&
            arrayOfPages[5] < props.totalPages - 1 && <p>. . .</p>}

          {props.currentPage === number ? (
            <Button
              key={number}
              active
              onClick={() => props.setCurrentPage(number)}
            >
              {number}
            </Button>
          ) : (
            <Button key={number} onClick={() => props.setCurrentPage(number)}>
              {number}
            </Button>
          )}
          {index + 1 === 1 && arrayOfPages[1] >= 4 && <p>. . .</p>}
        </>
      ))}

      {width > 589 ? (
        <MdKeyboardArrowRight
          id="pagination-arrow"
          color="white"
          onClick={() =>
            props.currentPage < props.totalPages &&
            props.setCurrentPage(props.currentPage + 1)
          }
        />
      ) : (
        <PaginationButton
          onClick={() =>
            props.currentPage < props.totalPages &&
            props.setCurrentPage(props.currentPage + 1)
          }
        >
          Próximo
        </PaginationButton>
      )}
    </PaginationWrapper>
  );
}
