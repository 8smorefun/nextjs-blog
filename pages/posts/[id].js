import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return <Layout>
    <Head>
      <title>{postData.title} | {siteTitle}</title>
      <meta
        name="description"
        content={postData.title + ' - ' + postData.excerpt}
      />
      <meta name="og:title" content={postData.title} />
      <meta name="og:description" content={postData.excerpt} />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(postData.title)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={postData.title} />
      <meta name="twitter:description" content={postData.excerpt} />
      <meta 
        name="twitter:image"
        content={`https://og-image.now.sh/${encodeURI(postData.title)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} 
      />
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML = {{ __html: postData.contentHtml }} />
    </article>
  </Layout>
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}