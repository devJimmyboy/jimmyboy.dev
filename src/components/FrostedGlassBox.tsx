import { Box, BoxProps } from '@mantine/core'
import React from 'react'

type Props = {}

export default function FrostedGlassBox({ children, ...props }: React.PropsWithChildren<BoxProps>) {
  return (
    <Box
      {...props}
      sx={{
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.4)',
          zIndex: -1,
          background: 'inherit',
          backdropFilter: 'blur(10px)',
          borderRadius: '5px',
        },
        background: 'inherit',
        borderRadius: '5px',
        position: 'relative',
        // backdropFilter: 'blur(10px)',
        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .2)',

        ...props.sx,
      }}>
      {children}
    </Box>
  )
}
