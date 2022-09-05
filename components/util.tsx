import { Box, Palette, styled, Tooltip } from '@mui/material'
import { deepmerge } from '@mui/utils'
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'
import Link, { LinkProps } from '../src/Link'

export const Footer = styled('footer')`
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

export const RepoBlock = styled(Box)`
  font-family: 'DM Sans', sans-serif;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 4px #f2f2f25a;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.25em;
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 0.5em;
  //rainbow gradient
  background-image: repeating-linear-gradient(30deg, #ff5555 0%, #ff7f55, #ffff55, #55ff55, #5555ff, #4b3382, #9455d3, #4b3382, #5555ff, #55ff55, #ffff55, #ff7f55, #ff5555 50%);
  background-size: 200% 200%;
  background-position: bottom left;
  /* background-repeat: repeat; */
  user-select: none;
  background-clip: text;
  border: 2px solid ${(props) => props.theme.palette.text.secondary};
  animation: glorious 6s linear infinite;

  // keyframes for animation called glorious that is a sliding gradient
  @keyframes glorious {
    100% {
      background-position: top right;
    }
  }
`

export const RepoLink = styled(Link)`
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.25em;
  display: inline-block;
  padding: 0.5em 0.75em;
  border-radius: 0.5em;
  background-image: repeating-linear-gradient(30deg, #ff5555 0%, #ff7f55, #ffff55, #55ff55, #5555ff, #4b3382, #9455d3, #4b3382, #5555ff, #55ff55, #ffff55, #ff7f55, #ff5555 50%);
  background-size: 200% 200%;
  background-position: bottom left;
  text-shadow: 0 0 4px #f2f2f25a;
  -webkit-text-fill-color: transparent;
  /* background-repeat: repeat; */
  background-clip: text;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease-in-out;
  border: 2px solid ${(props) => props.theme.palette.text.secondary};
  &:hover {
    border-width: 3px;
    transform: translate3d(0, 0, 0) scale(1.1);
    margin-left: 0.5em;
    margin-right: 0.5em;
    text-decoration: underline;
    color: ${(props) => props.theme.palette.primary.main + '4a'};
  }

  &:active {
    transform: translate3d(0, 0, 0) scale(0.9);
  }

  animation: glorious 6s linear infinite;

  // keyframes for animation called glorious that is a sliding gradient
  @keyframes glorious {
    100% {
      background-position: top right;
    }
  }
`
const ProjectBase = styled<ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<'a'> & { projectColor: string }>>(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5em;
  background-color: ${(props) => props.projectColor};
  color: ${(props) => props.theme.palette.getContrastText(props.projectColor)};
  padding: 0.5em 1em;
  user-select: none;
  font-size: 2em;
  vertical-align: text-top;
  outline-style: solid;
  outline-width: 4px;
  outline-color: ${(props) => props.theme.palette.getContrastText(props.projectColor)};
  outline-offset: -4px;
  /* transition: all 0.2s ease-in-out; */
`
export const ProjectView = ({ description, ...props }: React.PropsWithChildren<React.ComponentProps<typeof ProjectBase> & { className: string; description?: string }>) => {
  const propsCombined = {
    ...props,
    whileHover: props.whileHover ? deepmerge({ scale: 1.1, outlineWidth: 10 }, props.whileHover) : { scale: 1.1, outlineWidth: 10 },
    whileTap: props.whileTap ? deepmerge({ scale: 0.9 }, props.whileTap) : { scale: 0.9 },
    animate: props.animate ? deepmerge({ scale: 1 }, props.animate) : { scale: 1 },
  }
  return (
    <Tooltip
      followCursor
      title={description}
      placement="left"
      sx={{
        fontSize: '1.25em',
      }}>
      <ProjectBase {...propsCombined} />
    </Tooltip>
  )
}
export type ThemeColor =
  | 'peepo'
  | keyof Omit<Palette, 'tonalOffset' | 'getContrastText' | 'action' | 'augmentColor' | 'background' | 'divider' | 'mode' | 'text' | 'common' | 'contrastThreshold' | 'grey'>
