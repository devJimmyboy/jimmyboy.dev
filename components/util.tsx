import { Palette, styled, Theme, Tooltip } from "@mui/material"
import { deepmerge } from "@mui/utils"
import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion"
import React from "react"
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
const ProjectBase = styled<ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<"a"> & { project: ThemeColor }>>(
  motion.a
)`
  cursor: pointer;
  border-radius: 0.5em;
  background-color: ${(props) => props.theme.palette[props.project].main};
  color: ${(props) => props.theme.palette[props.project].contrastText};
  padding: 0.5em 1em;
  user-select: none;
  font-size: 2em;
  vertical-align: text-bottom;
`
export const ProjectView = ({
  description,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof ProjectBase> & { className: string; description?: string }>) => {
  const propsCombined = {
    ...props,
    whileHover: props.whileHover ? deepmerge({ scale: 1.1 }, props.whileHover) : { scale: 1.1 },
    whileTap: props.whileTap ? deepmerge({ scale: 0.9 }, props.whileTap) : { scale: 0.9 },
  }
  return (
    <Tooltip
      followCursor
      title={description || props.project}
      placement="left"
      sx={{
        fontSize: "1.25em",
      }}>
      <ProjectBase {...propsCombined} />
    </Tooltip>
  )
}
export type ThemeColor =
  | "peepo"
  | keyof Omit<
      Palette,
      | "tonalOffset"
      | "getContrastText"
      | "action"
      | "augmentColor"
      | "background"
      | "divider"
      | "mode"
      | "text"
      | "common"
      | "contrastThreshold"
      | "grey"
    >
