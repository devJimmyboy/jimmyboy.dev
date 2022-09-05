import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import { Project } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { gh } from '../../lib/gh'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  let { category, color, config, owner, repo, url } = req.body as Project

  const repository = await gh.rest.repos.get({ owner, repo }).catch((err) => {
    console.error('error: ', err)
    res.status(500).send('Internal Server Error')
  })
  if (!repository) return
  const project = await prisma.project.upsert({
    where: { owner_repo: { owner, repo } },
    update: {
      url: url ?? (repository.data.private ? repository.data.homepage ?? null : repository.data.html_url),
      category,
      color,
      config: config ?? undefined,
      owner,
      repo,
    },
    create: {
      owner,
      repo,
      category,
      color,
      config,
      url: url ?? (repository.data.private ? repository.data.homepage ?? null : repository.data.html_url),
    },
  })

  // console.log(mostRecentCommit);

  res.status(200).json(project)
}
