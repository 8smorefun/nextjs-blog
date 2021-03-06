import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>Digital web coder and nature wanderer</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a className={utilStyles.noUnderlineOnHover}>
                  <span className={utilStyles.underlineOnLinkHover}>
                    {title}
                  </span>
                  <br />
                  <small className={utilStyles.lightText}><Date dateString={date} /> - </small>
                  <small className={utilStyles.noLinkColor}>
                    {excerpt}
                  </small>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}