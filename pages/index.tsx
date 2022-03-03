import * as React from "react"
import type { NextPage } from "next"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Copyright from "../src/Copyright"
import useSWR from "swr"
import { motion, useAnimation, useCycle, Variants } from "framer-motion"
import { Footer, RepoLink } from "../components/util"
import moment from "moment"
import { useBoolean, useInterval } from "react-use"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const variants: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 20, scale: 0.75 }),
  visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.1 } },
  breathing: { scale: 1.1, transition: { duration: 0.2 } },
}

const Home: NextPage = () => {
  const { data: mostRecentCommit, isValidating } = useSWR("/api/activity", fetcher)
  React.useEffect(() => {
    console.log(mostRecentCommit)
  }, [mostRecentCommit])
  const api = useAnimation()
  const [breathing, cycle] = useBoolean(false)
  React.useEffect(() => {
    api.start("visible")
  }, [])
  useInterval(() => {
    if (breathing) api.start("breathing")
    else api.start("visible")
    cycle()
  }, 5000)
  const repo = mostRecentCommit?.repo.name
  const timeCreated = moment(mostRecentCommit?.created_at)
  return (
    <Container
      maxWidth="lg"
      sx={{
        pointerEvents: "auto",
        height: "100%",
        width: "100%",
      }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography className="text-center select-none" variant="h3" component="h1" gutterBottom>
          Welcome to{" "}
          <motion.div
            initial={"hidden"}
            animate={api}
            transition={{ staggerChildren: 0.1 }}
            style={{ width: "12ch", height: "1em" }}>
            {"Jimmyboy.dev".split("").map((char, i) => (
              <motion.div
                style={{ display: "inline-block" }}
                key={i}
                custom={i}
                variants={variants}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}>
                {char}
              </motion.div>
            ))}
          </motion.div>
        </Typography>

        {mostRecentCommit && (
          <Typography component="div" fontSize={24} align="center" color="HighlightText">
            Jimmy was last seen working{" "}
            <Typography display="inline-block" color="HighlightText" fontSize={24} fontWeight={600}>
              {timeCreated.fromNow()}
            </Typography>{" "}
            on{" "}
            <RepoLink target="_blank" fontWeight={700} href={`https://github.com/${repo}`}>
              {repo.split("/")[1]}
            </RepoLink>
          </Typography>
        )}
        <div className="flex-grow" />
        <Footer>
          <Copyright />
        </Footer>
      </Box>
    </Container>
  )
}

export default Home
