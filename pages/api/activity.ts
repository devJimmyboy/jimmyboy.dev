import { Octokit, App } from "octokit";

const gh = new Octokit({ auth: process.env.GITHUB_TOKEN });

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let mostRecentCommit: any | null = null
  const activity = await gh.rest.activity.listEventsForAuthenticatedUser({ username: "devjimmyboy" }).catch((err) => { console.log("error: ", err); res.status(500).send("error") });

  activity?.data.forEach(event => {
    if (mostRecentCommit !== null) return;
    console.log(event.type);
    if (event.type === 'PushEvent') {
      mostRecentCommit = event
    }
  })

  // console.log(mostRecentCommit);

  res.status(200).json(mostRecentCommit)

}
