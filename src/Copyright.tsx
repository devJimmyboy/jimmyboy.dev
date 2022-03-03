import * as React from "react"
import Typography from "@mui/material/Typography"
import MuiLink from "@mui/material/Link"

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      width="max-content"
      borderRadius="1em 1em 0 0"
      ml={4}
      p={2}
      fontSize="1.25em"
      color="text.secondary"
      align="center">
      {"Made by "}
      <MuiLink fontWeight={700} color="inherit" href="https://jimmyboy.tv">
        Jimmyboy
      </MuiLink>
    </Typography>
  )
}
