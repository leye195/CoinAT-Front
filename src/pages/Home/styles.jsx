import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SubNavLink = styled(NavLink)`
  flex: 1;
  padding: 0.5rem 0;
  text-decoration: none;
  text-align: center;
  color: ${(props) => (props.active ? "white" : "#ffffff70")};
  background-color: #525f6e;
  font-weight: bold;
`;
