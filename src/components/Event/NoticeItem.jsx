import React from "react";
import styled from "styled-components";
import moment from "moment";
import { breakDown } from "../../styles/_mixin";
import { colors } from "../../styles/_variables";

const TableRow = styled.tr``;
const TableCell = styled.td`
  border-bottom: 1px solid ${colors["gray-100"]};

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

  & > a {
    color: black;
  }
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
const NoticeItem = ({ title, updated_at: updatedAt, id, type }) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <NoticeTitle>
            {type === "notice" ? (
              <a href={`https://upbit.com/service_center/notice?id=${id}`}>
                {title}
              </a>
            ) : (
              title
            )}
          </NoticeTitle>
        </TableCell>
        <TableCell>
          <NoticeDate>{moment(updatedAt).format("YYYY-MM-DD")}</NoticeDate>
        </TableCell>
      </TableRow>
    </>
  );
};

export default NoticeItem;
