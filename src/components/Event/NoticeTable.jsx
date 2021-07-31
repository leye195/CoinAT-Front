import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/_variables";
import NoticeItem from "./NoticeItem";

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-spacing: 0;
  background: ${colors.white};
`;
const TableHead = styled.thead`
  background-color: ${colors["gray-100"]};
`;
const TableBody = styled.tbody`
  height: 588px;
`;
const TableRow = styled.tr``;
const TableHeadCell = styled.th`
  padding: 10px 0;
  border-bottom: 1px solid ${colors["gray-100"]};
`;

const NoticeTable = ({ items = [], type }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>제목</TableHeadCell>
          <TableHeadCell>등록일</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, idx) => (
          <NoticeItem key={idx} type={type} {...item} />
        ))}
      </TableBody>
    </Table>
  );
};

export default NoticeTable;
