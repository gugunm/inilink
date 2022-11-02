import { prisma } from '../../../lib/prisma';

type DataPage = {
  title: string;
  description: string;
  unique_name: string;
  user_id: number;
};

export default async function handle(req: any, res: any) {
  try {
    const { title, desc, pid, email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const page = await prisma.page.create({
      data: <DataPage>{
        title: title,
        description: desc,
        unique_name: pid,
        user_id: user?.id,
      },
    });

    return res.status(200).json({ data: page });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
