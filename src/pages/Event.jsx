import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs'
import EventContainer from 'components/Event/EventContainer';
import EventSideBar from 'components/Event/EventSidebar';
import NoticeTable from 'components/Event/NoticeTable';
import Loading from 'components/Loading';
import LoadMore from 'components/Event/LoadMore';
import { loadNotice } from 'reducers/notice';
import { colors } from 'styles/_variables';

const convertTitle = {
  'notice': '공지사항',
  'disclosure': '프로젝트 공시'  
};

const Container = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  min-height: 744px;
`;

const EventHeader = styled.div`
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1.5px solid rgb(222 222 222 / 50%);

  & > div {
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 50px;
    width: 90vw;

    & a {
      color: black;
      text-decoration: none;
    }

    & .event-notice {
      font-weight: bold;
    }
  }
`;

const NoticeSection= styled.section`
  width:100%;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 4px, rgb(0 0 0 / 23%) 0px 0px 4px;
`;

const NoticeArticle = styled.article`
  position: relative;
  min-height: 600px;
  margin-bottom: 10px;
`;

const NoticeHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;
  background:${colors['blueSky']};
  color:${colors['white']};
`; 

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 5px 0 5px;
  width: auto;
`;

const Event = () => {
    const [type, setType] = useState('notice');
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    const dispatch = useDispatch();
    const {notices = [], isLoading = true, more} = useSelector((state)=>state.notice);
    const {params} = match;

    const handleLoadMore = () =>{
      dispatch(loadNotice({page: currentPage+1,type}));
      setCurrentPage(currentPage+1);
    }
    
    useEffect(() => {
 
      const type = qs.parse(location.search)['?type'];

      if(!type){
        history.replace(`${location.pathname}?type=notice`);
        return;
      }
      setType(type);
    },[location, history]);

    useEffect(()=>{
      dispatch(loadNotice({page:1,type: type? type:'notice'}));
    },[dispatch,type]);
    return (
    <>
      <EventHeader>
        <div>
          <NavLink activeClassName={params.name==='upbit'&&"event-notice"} to={`/event/upbit`}>업비트</NavLink>
        </div>
      </EventHeader>
      <Container>
        <EventContainer>
            <EventSideBar name={params.name}/>
            <NoticeSection>
                <NoticeArticle>
                  <NoticeHeader>{convertTitle[type]}</NoticeHeader>
                  {notices?.length>0&&(
                    <>
                      <NoticeTable items={notices} type={type}/>
                      <LoadMoreContainer>
                        <LoadMore isMore={more} handleLoadMore={handleLoadMore}/>
                      </LoadMoreContainer>
                    </>
                   )
                  }
                </NoticeArticle>
            </NoticeSection>
        </EventContainer>
        {isLoading&&<Loading isLoading={true}/>}
      </Container>
    </>
    )
};
export default Event;