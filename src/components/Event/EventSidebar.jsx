import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";
import { colors } from "../../styles/_variables";

const Section = styled.section`
  width: 200px;
  height: fit-content;
  margin-right: 50px;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 4px, rgb(0 0 0 / 23%) 0px 0px 4px;

  @media (max-width: 991px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Aside = styled.aside`
  min-height: auto;
`;

const MenuListContainer = styled.div`
  padding: 0;
`;

const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Menu = styled.li`
  padding: 10px;
  background-color: ${({ isActive }) =>
    isActive === true ? `${colors["gray-50"]};` : "inherit"};

  & a {
    color: ${colors.black};
    text-decoration: none;

    &.event-active {
      color: #525f6e;
      font-weight: bold;
    }
  }
`;

const EventSideBar = ({ name }) => {
  const location = useLocation();
  const isActive = (type) => (match, currentLocation) => {
    return type === qs.parse(currentLocation.search)["?type"];
  };

  return (
    <Section>
      <Aside>
        <MenuListContainer>
          <MenuList>
            <Menu isActive={isActive("notice")("", location)}>
              <NavLink
                isActive={isActive("notice")}
                activeClassName="event-active"
                to={`/event/${name}?type=notice`}
              >
                공지사항
              </NavLink>
            </Menu>
            <Menu isActive={isActive("disclosure")("", location)}>
              <NavLink
                isActive={isActive("disclosure")}
                activeClassName="event-active"
                to={`/event/${name}?type=disclosure`}
              >
                프로젝트 공시
              </NavLink>
            </Menu>
          </MenuList>
        </MenuListContainer>
      </Aside>
    </Section>
  );
};

export default EventSideBar;
