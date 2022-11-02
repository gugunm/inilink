import { prisma } from '../../../lib/prisma';

export default async function handle(req: any, res: any) {
  try {
    const { email } = req.query;
    // console.log('--> REQ DATA EMAIL: ');
    // console.log(email);

    const data = await prisma.user.findUnique({
      where: { email },
      include: {
        pages: true,
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
