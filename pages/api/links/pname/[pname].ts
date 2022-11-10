import { prisma } from '../../../../lib/prisma';

export default async function handle(req: any, res: any) {
  try {
    const { pname } = req.query;
    // console.log('--> REQ DATA PID: ');
    // console.log(pid);

    const data = await prisma.page.findUnique({
      where: { unique_name: pname },
      include: {
        links: true,
      },
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
