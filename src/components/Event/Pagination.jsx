import React, { useMemo } from "react";
import styled from "styled-components";
import { range, clamp } from "lodash";
import {
  faAngleRight,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 0 1rem 0;
`;

const PaginationUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  list-style: none;
`;

const PaginationLi = styled.li`
  background-color: #2c3e50;

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 50px;
  height: 50px;
  font-weight: bold;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Pagination = ({
  pagesLength = 0,
  pagesToShow,
  callback,
  currentPage,
}) => {
  const pages = useMemo(() => {
    const halfPageToShow = Math.floor(pagesToShow / 2);
    const startPage = clamp(
      currentPage - halfPageToShow,
      1,
      pagesLength - pagesToShow + 1,
    );
    const endPage = Math.min(startPage + pagesToShow - 1, pagesLength);

    return range(startPage, endPage + 1);
  }, [currentPage, pagesToShow, pagesLength]);

  const handleMoveTo = (page) => (e) => {
    e.preventDefault();
    if (page < 1 || page > pagesLength) return;
    callback(page);
  };

  return (
    <Container>
      <PaginationUl>
        <PaginationLi>
          <Button type="button" onClick={handleMoveTo(1)}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </Button>
        </PaginationLi>
        <PaginationLi>
          <Button type="button" onClick={handleMoveTo(currentPage - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
        </PaginationLi>
        {pages.map((page) => (
          <PaginationLi key={page}>
            <Button type="button" onClick={handleMoveTo(page)}>
              {page}
            </Button>
          </PaginationLi>
        ))}
        <PaginationLi>
          <Button type="button" onClick={handleMoveTo(currentPage + 1)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        </PaginationLi>
        <PaginationLi>
          <Button type="button">
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              onClick={handleMoveTo(pagesLength)}
            />
          </Button>
        </PaginationLi>
      </PaginationUl>
    </Container>
  );
};

export default Pagination;
