import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
export default function Pagination(props) {
  const [rememberArray, setRememberArray] = useState([]);

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

  console.log("currentP", props.currentPage);

  return (
    <div className="pagination">
     <GrFormPrevious
        name="prev-button.png"
        id="prev-button-pagination"
        onClick={() =>
          props.currentPage > 1 && props.setCurrentPage(props.currentPage - 1)
        }
      />
     <GrFormNext
        name="next-button.png"
        id="next-button-pagination"
        onClick={() =>
          props.currentPage < props.totalPages &&
          props.setCurrentPage(props.currentPage + 1)
        }
      />

      <div className="pagination-box">
        {arrayOfPages.map((number, index) => (
          <>
            {index + 1 === arrayOfPages.length &&
              props.totalPages > 7 &&
              arrayOfPages[5] < props.totalPages - 1 && <p>...</p>}
            <button
              className={`pagination-button ${
                props.currentPage === number && "active-button"
              }`}
              onClick={() => props.setCurrentPage(number)}
            >
              {number}
            </button>
            {index + 1 === 1 && arrayOfPages[1] >= 4 && <p>...</p>}
          </>
        ))}
      </div>
    </div>
  );
}