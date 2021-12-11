import styled from "styled-components";
import { colors } from "styles/_variables";

export const Container = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  min-height: 744px;
`;

export const EventHeader = styled.div`
  height: 50px;
  background-color: ${colors.white}
  border-bottom: 1.5px solid rgb(222 222 222 / 50%);

  & > div {
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 50px;
    width: 90vw;

    & a {
      color: ${colors.black};
      text-decoration: none;
    }

    & .event-notice {
      font-weight: bold;
    }
  }
`;

export const NoticeSection = styled.section`
  width: 100%;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 4px, rgb(0 0 0 / 23%) 0px 0px 4px;
`;

export const NoticeArticle = styled.article`
  position: relative;
  min-height: 600px;
  margin-bottom: 10px;
`;

export const NoticeHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;
  background: ${colors.blueSky};
  color: ${colors.white};
`;

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 5px 0 5px;
  width: auto;
`;
