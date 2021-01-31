import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0 auto;
    width: 90vw;
    box-shadow: rgb(0 0 0 / 16%) 0px 0px 4px, rgb(0 0 0 / 23%) 0px 0px 4px;

    @media (min-width:992px){
        width:970px;
    }
`;

const EventContainer = ({children}) => {
    return <Container>
        {children}
    </Container>
};
export default EventContainer;
