"use client";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const TopPagination = ({ current_page, total, per_page, setPage }) => {
  let pages = [];
  let totalPages = Math.ceil(total / per_page);
  let startpage =
    totalPages === 4
      ? 1
      : current_page === 1 || current_page - 2 === 0
      ? 1
      : current_page === totalPages
      ? current_page - 2
      : current_page - 1;
  let endPage =
    totalPages === 4
      ? 4
      : current_page === 1
      ? current_page + 2
      : current_page + 1 <= totalPages
      ? current_page + 1
      : current_page;
  for (let i = startpage; i <= endPage; i++) {
    i <= totalPages && pages.push(i);
  }

  return (
    <>
      {total / per_page > 1 ? (
        <ul className="pagination justify-content-center">
          <li className={`page-item ${current_page === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => {
                setPage(current_page - 1);
              }}
            >
              <RiArrowLeftSLine />
            </a>
          </li>
          <li className="page-item">
            <select
              className="page-link active"
              onChange={(e) => setPage(Number(e.target.value))}
              value={current_page}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <option
                    key={page}
                    value={page}
                    onClick={() => setPage(page)}
                    selected={current_page === page}
                  >
                    {page}
                  </option>
                )
              )}
            </select>
          </li>

          <li
            className={`page-item ${
              current_page === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              onClick={() => {
                setPage(current_page + 1);
              }}
            >
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      ) : (
        <ul className="pagination justify-content-center">
          <li className={`page-item disabled`}>
            <a className="page-link">
              <RiArrowLeftSLine />
            </a>
          </li>
          <li className="page-item ">
            <a className={`page-link active`}>1</a>
          </li>
          <li className={`page-item disabled`}>
            <a className="page-link">
              <RiArrowRightSLine />
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

export default TopPagination;
