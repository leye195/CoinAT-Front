import React from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`

`;
const TableCell = styled.td`
    border-bottom: 1px solid #e3e3e3;
`;
const NoticeTitle = styled.p`
    padding: 0.8rem 0.4rem;
    margin: 0;
    font-weight: bold;
`;
const NoticeDate = styled.p`
  padding: 0.8rem 0.4rem;
  margin: 0;
  text-align: center;
  font-weight: 400;
`;
const NoticeItem = () => {
    return <>
        <TableRow>
            <TableCell>
                <NoticeTitle>[거래] 원화마켓 신규 상장 (샌드박스 SAND)</NoticeTitle>
            </TableCell>
            <TableCell>
                <NoticeDate>2021.01.21</NoticeDate>
            </TableCell>
        </TableRow>
    </>
};

export default NoticeItem;
