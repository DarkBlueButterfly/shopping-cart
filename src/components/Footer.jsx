import { mdiGithub } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  gap: 5px;
`;

const Footer = () => {
  return (
    <>
      <a href="https://github.com/DarkBlueButterfly">
        <StyledFooter>
          <Icon path={mdiGithub} size={1} />
          <span>Developed by DarkBlueButterFly</span>
        </StyledFooter>
      </a>
    </>
  );
};

export default Footer;
