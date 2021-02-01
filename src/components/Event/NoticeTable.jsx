import React from 'react';
import styled from 'styled-components';
import NoticeItem from './NoticeItem';

const Table = styled.table`
    width: 100%;
    margin: 0 auto;
    border-spacing: 0;
    background: white;
`;
const TableHead = styled.thead`
  background-color: #f9fafc;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
`;
const TableHeadCell = styled.th`
    padding: 10px 0;
    border-bottom: 1px solid #e3e3e3;
`; 

const NoticeTable = ({items=[]}) => {
    return <Table>
        <TableHead>
            <TableRow>
                <TableHeadCell>제목</TableHeadCell>
                <TableHeadCell>등록일</TableHeadCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {items.map((item)=><NoticeItem key={item._id} {...item} />)}
        </TableBody>
    </Table>
};

export default NoticeTable;
