import React from "react";
import { NavLink } from "react-router-dom";
import EventContainer from "components/Event/EventContainer";
import EventSideBar from "components/Event/EventSidebar";
import NoticeTable from "components/Event/NoticeTable";
import Loading from "components/Loading";
import LoadMore from "components/Event/LoadMore";
import {
  EventHeader,
  Container,
  NoticeSection,
  NoticeArticle,
  NoticeHeader,
  LoadMoreContainer,
} from "./styles";

const convertTitle = {
  notice: "공지사항",
  disclosure: "프로젝트 공시",
};

const EventPresentation = ({
  type,
  params,
  handleLoadMore,
  notices,
  more,
  isLoading,
}) => {
  return (
    <>
      <EventHeader>
        <div>
          <NavLink
            activeClassName={params.name === "upbit" && "event-notice"}
            to="/event/upbit"
          >
            업비트
          </NavLink>
        </div>
      </EventHeader>
      <Container>
        <EventContainer>
          <EventSideBar name={params.name} />
          <NoticeSection>
            <NoticeArticle>
              <NoticeHeader>{convertTitle[type]}</NoticeHeader>
              {notices?.length > 0 && (
                <>
                  <NoticeTable items={notices} type={type} />
                  <LoadMoreContainer>
                    <LoadMore isMore={more} handleLoadMore={handleLoadMore} />
                  </LoadMoreContainer>
                </>
              )}
            </NoticeArticle>
          </NoticeSection>
        </EventContainer>
        {isLoading && <Loading isLoading />}
      </Container>
    </>
  );
};
export default EventPresentation;
