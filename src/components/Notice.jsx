import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { colors } from "styles/_variables";

const Container = styled.section`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  min-height: 40px;
  width: 100vw;
  border-top: 1px solid ${colors["gray-100"]};
  margin: 0 auto;
  background-color: ${colors["gray-100"]};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 30px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  height: 25px;
  white-space: pre;
  font-weight: bolder;
  background-color: ${colors.white};
`;

const Title = styled.p`
  display: inline-block;
  margin: 0;
  width: ${(props) => `${props.innerWidth}px`};
  text-align: center;
  overflow: hidden;
`;

const Listing = () => {
  const dispatch = useDispatch();

  const { upbitNewListing } = useSelector((state) => state.coin);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const listRef = useRef(null);
  const cnt = useRef(0);

  const handleNoticeAnimation = useCallback(() => {
    setInterval(() => {
      if (cnt.current > 5) {
        listRef.current.animate(
          [
            { transform: `translateY(${(cnt.current - 1) * -35}px)` },
            { transform: `translateY(${(cnt.current - 1) * -35}px)` },
          ],
          {
            fill: "forwards",
            duration: 1500,
            delay: 1000,
          },
        );
        listRef.current.animate(
          [
            { transform: `translateY(${0 * -35}px)` },
            { transform: `translateY(${0 * -35}px)` },
          ],
          {
            fill: "forwards",
            duration: 1500,
            delay: 2000,
          },
        );
        cnt.current = 0;
      } else {
        listRef.current.animate(
          [
            { transform: `translateY(${cnt.current * -35}px)` },
            { transform: `translateY(${(cnt.current + 1) * -35}px)` },
          ],
          {
            fill: "forwards",
            duration: 1500,
            delay: 2000,
          },
        );
        cnt.current += 1;
      }
    }, 4000);
  }, []);

  const handleResize = () => {
    if (window && window.innerWidth) setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleNoticeAnimation();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, handleNoticeAnimation]);

  return (
    <Container>
      <ListContainer
        ref={listRef}
        count={upbitNewListing.length}
        innerWidth={innerWidth}
      >
        {upbitNewListing.map((item) => (
          <ListItem key={v4()}>
            <Title innerWidth={innerWidth}>{`${
              item.notice.title.length >= 30
                ? `${item.notice.title.substr(0, 30)}...`
                : `${item.notice.title}`
            }`}</Title>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};
export default Listing;
