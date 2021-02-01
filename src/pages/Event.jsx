import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EventContainer from '../components/Event/EventContainer';
import NoticeTable from '../components/Event/NoticeTable';
import Pagination from '../components/Event/Pagination';
import { loadNotice } from '../reducers/notice';

const Container = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 2rem;
`;

const NoticeSection= styled.section`
    width:100%;
`;

const NoticeArticle = styled.article`
   position: relative;
    min-height: 800px;
    margin-bottom: 10px;
`;

const NoticeHeader = styled.header`
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bold;
    background: #525f6e;
    color:white;
`; 


const Event = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pagesLength, setPagesLength] = useState(0);
    
    const dispatch = useDispatch();
    const {notices,totalPage} = useSelector((state)=>state.notice);

    const handlePagination = (page) =>{
        dispatch(loadNotice({page}));
        setCurrentPage(page);
    }

    useEffect(()=>{
        dispatch(loadNotice({page:1}));
    },[dispatch]);
    return <Container>
        <EventContainer>
            <NoticeSection>
                <NoticeArticle>
                    <NoticeHeader>공지사항</NoticeHeader>
                    <NoticeTable items={notices}/>
                    <Pagination currentPage={currentPage} pagesToShow={totalPage} pagesLength={totalPage} callback={handlePagination}/>
                </NoticeArticle>
            </NoticeSection>

        </EventContainer>
    </Container>
};
export default Event;