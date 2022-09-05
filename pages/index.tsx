import * as React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Copyright from '../src/Copyright'
import useSWR from 'swr'
import { motion, useAnimation, useCycle, Variants } from 'framer-motion'
import { Footer, ProjectView, RepoBlock, RepoLink, ThemeColor } from '../components/util'
import moment from 'moment'
import { useBoolean, useInterval } from 'react-use'
import { ButtonBase, Palette, PaletteColor, Stack, styled } from '@mui/material'
import { useRouter } from 'next/router'
import type { Octokit } from 'octokit'
import type { Endpoints, GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { Project } from '@prisma/client'
import prisma from '../lib/db'
import { gh } from '../lib/gh'
import { makeSerializable } from '../lib/util'

const variants: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 20, scale: 0.75 }),
  visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.1 } },
  breathing: { scale: 1.1, transition: { duration: 0.2 } },
}

// const projects: Project[] = [
//   { key: 'peepo', name: 'Peepo Sings', url: 'https://sings.peepo.dev', description: 'A Twitch-Centric Music Player.' },
//   {
//     key: 'secondary',
//     name: 'PokeSmash',
//     url: 'https://pokesmash.xyz',
//     description: 'The only way to Smash or Pass Pokemon & compare your findings to others.',
//   },
//   {
//     key: 'success',
//     name: 'EZ Clip',
//     url: 'https://clips.jimmyboy.tv',
//     description: "A simple way to browse through a creator's Twitch Clips.",
//   },
// ]

interface Props {
  projects: (Project & { config: ProjectConfig })[]
  mostRecentCommit: Endpoints['GET /users/{username}/events']['response']['data'][0]
}

const Home: NextPage<Props> = ({ mostRecentCommit, projects }) => {
  const router = useRouter()
  const api = useAnimation()
  const [breathing, cycle] = useBoolean(false)
  React.useEffect(() => {
    api.start('visible')
  }, [])
  useInterval(() => {
    if (breathing) api.start('breathing')
    else api.start('visible')
    cycle()
  }, 5000)
  const repo = mostRecentCommit?.repo.name
  const timeCreated = moment(mostRecentCommit?.created_at)
  return (
    <Container
      maxWidth="lg"
      sx={{
        pointerEvents: 'auto',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography className="text-center select-none" variant="h3" component="h1" gutterBottom>
          Welcome to{' '}
          <motion.div initial={'hidden'} animate={api} transition={{ staggerChildren: 0.1 }} style={{ width: '12ch', height: '1em' }}>
            {'Jimmyboy.dev'.split('').map((char, i) => (
              <motion.div
                style={{ display: 'inline-block' }}
                key={i}
                custom={i}
                variants={variants}
                transition={{
                  type: 'spring',
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
            Jimmy was last seen working{' '}
            <Typography display="inline-block" color="HighlightText" fontSize={24} fontWeight={600}>
              {timeCreated.fromNow()}
            </Typography>{' '}
            on{' '}
            {mostRecentCommit.public ? (
              <RepoLink target="_blank" fontWeight={700} href={`https://github.com/${repo}`}>
                {repo?.split('/')[1]}
              </RepoLink>
            ) : mostRecentCommit.repo.url ? (
              <RepoLink fontWeight={700} href={mostRecentCommit.repo.url}>
                {repo?.split('/')[1]}
              </RepoLink>
            ) : (
              <RepoBlock fontWeight={700}>{repo?.split('/')[1]}</RepoBlock>
            )}
          </Typography>
        )}
        <Box className="py-12 w-2/3 flex-grow">
          <Stack className="w-full h-full items-center justify-around " direction="column">
            {projects.map((project, i) => (
              <ProjectView
                className="user-select"
                key={`${project.repo}-${i}`}
                href={project.url}
                target="_blank"
                projectColor={project.color}
                description={(project.config as ProjectConfig)?.description ?? ''}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {project.repo}
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

const LoginButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme.palette.background.paper};
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border-radius: 0.4rem;
  border: 1px solid ${(props) => props.theme.palette.divider};
  transition: all 0.2s ease-in-out;
  transform-origin: top right;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    transform: scale(1.1);
  }
`

export const getStaticProps: GetStaticProps<Props> = async ({}) => {
  let mostRecentCommit: GetResponseDataTypeFromEndpointMethod<typeof gh.rest.activity.listEventsForAuthenticatedUser>[0] | null = null
  const activity = await gh.rest.activity.listEventsForAuthenticatedUser({ username: 'devjimmyboy' })

  const commit = activity?.data.find((event) => event.type === 'PushEvent')
  if (commit) {
    const repoInfo = await gh.request(`GET ${commit.repo.url}` as 'GET /repos/{owner}/{repo}')
    mostRecentCommit = { ...commit, repo: { ...commit.repo, url: repoInfo.data.homepage ?? null } }
  }
  const projects = (await prisma.project.findMany()).map((project) => makeSerializable<Props['projects'][0]>(project as any))
  const lastSaveTime = await prisma.updates.findFirst({ orderBy: { timestamp: 'desc' } })

  return {
    props: { projects, mostRecentCommit },
  }
}

interface ProjectConfig {
  description: string
}
