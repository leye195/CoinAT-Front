import React from 'react';
import styled from 'styled-components';
import EventContainer from '../components/Event/EventContainer';
import NoticeTable from '../components/Event/NoticeTable';
import Pagination from '../components/Event/Pagination';

const Container = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 2rem;
`;

const NoticeSection= styled.section`
    width:100%;
`;

const NoticeArticle = styled.article`
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
    const handlePagination = (page) =>{
        console.log(page);
    }

    return <Container>
        <EventContainer>
            <NoticeSection>
                <NoticeArticle>
                    <NoticeHeader>공지사항</NoticeHeader>
                    <NoticeTable/>
                    <Pagination currentPage={1} pagesToShow={5} pagesLength={5} callback={handlePagination}/>
                </NoticeArticle>
            </NoticeSection>

        </EventContainer>
    </Container>
};
export default Event;