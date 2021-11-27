import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

const Row = ({
  children,
  className = "",
  alignItems = "flex-start",
  justifyContent = "flex-start",
}) => {
  return (
    <Container
      className={className}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </Container>
  );
};

export default Row;
