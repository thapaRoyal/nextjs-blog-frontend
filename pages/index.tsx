import { AxiosResponse } from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import ArticleList from '../components/ArticleList';
import Tabs from '../components/Tabs';
import { fetchArticles, fetchCategories } from '../http';
import { IArticle, ICategory, ICollectionResponse } from '../types';
import qs from 'qs';

interface IPropTypes {
  categories: {
    items: ICategory[];
  };
  articles: {
    items: IArticle[];
  };
}

const Home: NextPage<IPropTypes> = ({ categories, articles }) => {
  console.log('categories', categories);
  return (
    <div>
      <Head>
        <title>.blog | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Tabs */}
      <Tabs categories={categories.items} />

      {/* Articles */}
      <ArticleList articles={articles.items} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Articles
  const options = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
  };

  const queryString = qs.stringify(options);

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  // categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  console.log('Categories', categories);
  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
    },
  };
};

export default Home;
