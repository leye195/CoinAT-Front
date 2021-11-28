import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import qs from "qs";
import { loadNotice } from "reducers/notice";
import EventPresentation from "./EventPresentation";

const EventContainer = () => {
  const [type, setType] = useState("notice");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const {
    notices = [],
    isLoading = true,
    more,
  } = useSelector((state) => state.notice);
  const { params } = match;

  const handleLoadMore = () => {
    dispatch(loadNotice({ page: currentPage + 1, type }));
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const parseType = qs.parse(location.search)["?type"];

    if (!parseType) {
      history.replace(`${location.pathname}?type=notice`);
      return;
    }
    setType(parseType);
  }, [location, history]);

  useEffect(() => {
    dispatch(loadNotice({ page: 1, type: type || "notice" }));
  }, [dispatch, type]);

  return (
    <EventPresentation
      type={type}
      notices={notices}
      isLoading={isLoading}
      more={more}
      handleLoadMore={handleLoadMore}
      params={params}
    />
  );
};
export default EventContainer;
