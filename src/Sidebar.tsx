import React from "react";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <StyledSB>
      <button>Collapse SB</button>
      <section>Add elements</section>
      <section>Edit elements</section>
    </StyledSB>
  );
};

const StyledSB = styled.aside`
  padding: 40px 16px;
  position: absolute;
  z-index: 100;
  width: 300px;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: var(--sb-bg);
  backdrop-filter: blur(10px);
  color: white;
`;

export default Sidebar;
