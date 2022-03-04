import * as React from "react"
import type { NextPage } from "next"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Copyright from "../src/Copyright"
import useSWR from "swr"
import { motion, useAnimation, useCycle, Variants } from "framer-motion"
import { Footer, ProjectView, RepoLink, ThemeColor } from "../components/util"
import moment from "moment"
import { useBoolean, useInterval } from "react-use"
import { Palette, PaletteColor, Stack } from "@mui/material"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const variants: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 20, scale: 0.75 }),
  visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.1 } },
  breathing: { scale: 1.1, transition: { duration: 0.2 } },
}

interface Project {
  key: ThemeColor
  name: string
  url: string
  icon?: string | React.ReactElement
  description?: string
}
const projects: Project[] = [
  { key: "peepo", name: "Peepo Sings", url: "https://sings.peepo.dev", description: "A Twitch-Centric Music Player." },
  {
    key: "secondary",
    name: "PokeSmash",
    url: "https://pokesmash.xyz",
    description: "The only way to Smash or Pass Pokemon & compare your findings to others.",
  },
  {
    key: "success",
    name: "EZ Clip",
    url: "https://clips.jimmyboy.tv",
    description: "A simple way to browse through a creator's Twitch Clips.",
  },
]

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
        <Box className="py-12 w-2/3 flex-grow">
          <Stack className="w-full h-full items-center justify-around " direction="column">
            {projects.map((project, i) => (
              <ProjectView
                className="user-select"
                key={`${project.key}-${i}`}
                href={project.url}
                target="_blank"
                project={project.key}
                description={project.description}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {project.name}
                </Typography>
              </ProjectView>
            ))}
          </Stack>
        </Box>
        <Footer>
          <Copyright />
        </Footer>
      </Box>
    </Container>
  )
}

export default Home
