import { MDXRemote } from 'next-mdx-remote/rsc'

const MovieDetailContent = ({ content }: { content: string }) => {
  return <MDXRemote source={content} />
}

export { MovieDetailContent }
