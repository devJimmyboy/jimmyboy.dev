import { styled } from "@mui/material"
import Link from "../src/Link"

export const Footer = styled("footer")`
  position: fixed;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  & > * {
    pointer-events: auto;
    padding: 0.5em;
    background-color: #2a2a2a2a;
  }
`

export const RepoLink = styled(Link)`
  font-family: "DM Sans", sans-serif;
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: 700;
  text-decoration: none;
  font-size: 1.25em;
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 0.5em;
  background-color: #2a2a2a2a;
  transition: all 0.2s ease-in-out;
  border: 2px solid ${(props) => props.theme.palette.text.secondary};
  &:hover {
    border-width: 3px;
    transform: scale(1.1);
    margin-left: 0.5em;
    margin-right: 0.5em;
    text-decoration: underline;
    background-color: ${(props) => props.theme.palette.action.hover};
    color: ${(props) => props.theme.palette.primary.main};
  }

  &:active {
    transform: scale(0.9);
  }
`
