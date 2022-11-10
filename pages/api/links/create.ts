import { prisma } from '../../../lib/prisma';

type DataLink = {
  url: string;
  link_title: string;
  page_id: number;
};

export default async function handle(req: any, res: any) {
  try {
    // console.log('--> Data Page : ', {
    //   ...req.body,
    // });

    const { page_id, link_title, url } = req.body;

    const page = await prisma.page.findUnique({
      where: { id: Number(page_id) },
    });

    // console.log('--> Data Page : ');
    // console.log(page);

    const link = await prisma.link.create({
      data: <DataLink>{
        url: url,
        link_title: link_title,
        user_id: page?.user_id,
        page_id: Number(page_id),
      },
    });

    return res.status(200).json({ data: link });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
