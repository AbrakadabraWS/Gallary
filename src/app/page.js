
import { Inter } from '@next/font/google';
import Base from '@/components/Base/Base';
import { getPicturesList } from '@/lib/getPicturesList/getPicturesList';


const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const data = await getPicturesList()
  return (
    <Base>
      {data}
    </Base>
  )
}
