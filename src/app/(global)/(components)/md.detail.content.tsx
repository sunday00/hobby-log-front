import { MDXRemote } from 'next-mdx-remote/rsc'
import style from '@/app/(global)/(style)/md.module.scss'

const MDDetailContent = ({ content }: { content: string }) => {
  return (
    <section className={style['markdown-body']}>
      <MDXRemote source={content} />
    </section>
  )
}

export { MDDetailContent }
