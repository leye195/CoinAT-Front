import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {breakDown} from '../../styles/_mixin';

const TableRow = styled.tr`

`;
const TableCell = styled.td`
  border-bottom: 1px solid #e3e3e3;
  ${breakDown.sm`
    &:firstchild{
      width: 60%;
      word-break: keep-all;
    }

    &:nth-child(2){
      width: 40%;
    }
  `}
`;
const NoticeTitle = styled.p`
  padding: 0.8rem 0.4rem;
  margin: 0;
  font-weight: bold;
  word-break: break-word;
  cursor: pointer;
  ${breakDown.lg`
    font-size:0.8rem;
  `}
`;
const NoticeDate = styled.p`
  padding: 0.8rem 0.4rem;
  margin: 0;
  text-align: center;
  font-weight: 400;
  ${breakDown.lg`
    font-size:0.8rem;
  `}
`;
const NoticeItem = ({title,updatedAt}) => {
    return <>
        <TableRow>
            <TableCell>
                <NoticeTitle>{title}</NoticeTitle>
            </TableCell>
            <TableCell>
                <NoticeDate>{moment(updatedAt).format('YYYY-MM-DD')}</NoticeDate>
            </TableCell>
        </TableRow>
    </>
};

export default NoticeItem;
