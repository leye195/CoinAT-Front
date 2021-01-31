import React, {useMemo} from 'react';
import styled from 'styled-components';
import {range,clamp} from 'lodash';
import { faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
    padding: 1.5rem;
`;

const PaginationUl = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    list-style: none;
`;

const PaginationLi = styled.li``;

const Button = styled.button``;


const Pagination = ({pagesLength = 0,pagesToShow,callback, currentPage}) => {
    const pages = useMemo(() => {
        const halfPageToShow = Math.floor(pagesToShow / 2);
        const startPage = clamp(currentPage - halfPageToShow, 1, pagesLength - pagesToShow + 1);
        const endPage = Math.min(startPage + pagesToShow - 1, pagesLength);
    
        return range(startPage, endPage + 1);
      }, [currentPage, pagesToShow, pagesLength]);

    function moveTo(e, page) {
        e.preventDefault();
    
        if (page < 1 || page > pagesLength) return;
        callback(page);
    }

    return (
    <Container>
        <PaginationUl>
            <PaginationLi>
                <Button type="button"  onClick={(e) => moveTo(e, 1)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                </Button>
            </PaginationLi>
            <PaginationLi>
                <Button type="button" onClick={(e) => moveTo(e, currentPage - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
            </PaginationLi>
            {pages.map((page)=><PaginationLi>
                <Button type="button" 
                onClick={(e) => {
                  moveTo(e, page);
                }}>
                  {page}
                </Button>
            </PaginationLi>)}
            <PaginationLi>
                <Button type="button" onClick={(e) => moveTo(e, currentPage + 1)}>
                    <FontAwesomeIcon icon={faAngleRight}/>
                </Button>
            </PaginationLi>
            <PaginationLi>
                <Button type="button">
                    <FontAwesomeIcon icon={faAngleDoubleRight} onClick={(e) => moveTo(e, pagesLength)}/>
                </Button>
            </PaginationLi>
        </PaginationUl>
    </Container>
    )
};

export default Pagination;