// import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma';

export default async function handle(req: any, res: any) {
  if (req.method === 'POST') {
    await handleCreateUser(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user
async function handleCreateUser(res: any, req: any) {
  console.log('--> creating user', {
    ...req.body,
  });

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  console.log('--> is user existtt', isUserExist);

  if (isUserExist) {
    return res
      .status(200)
      .json({ data: { ...req.body }, message: 'Email is duplicated' });
  } else {
    const user = await prisma.user.create({
      data: { ...req.body },
    });
    return res.status(201).json({ data: user });
  }
}
