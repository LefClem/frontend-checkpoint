import Link from "next/link";
import { styled } from "styled-components";

export default function Header() {
  return (
    <StyledHeader className="header">
      <h1>Checkpoint : frontend</h1>
      <StyledLink href="/">Countries</StyledLink>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  text-align: center;
  background: #e3376c;
  padding: 30px;
  margin-bottom: 20px;  
  color: #FFF;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF;
`