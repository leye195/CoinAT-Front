import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => (props.full ? "100%" : "auto")};
`;

const Row = ({
  children,
  className = "",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  full = false,
}) => {
  return (
    <Container
      className={className}
      alignItems={alignItems}
      justifyContent={justifyContent}
      full={full}
    >
      {children}
    </Container>
  );
};

export default Row;
