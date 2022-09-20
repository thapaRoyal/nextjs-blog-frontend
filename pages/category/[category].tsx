import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Tabs from '../../components/Tabs';
import { fetchArticles, fetchCategories } from '../../http';
import {
  IArticle,
  ICategory,
  ICollectionResponse,
  IPagination,
} from '../../types';
import qs from 'qs';
import ArticleList from '../../components/ArticleList';
import { makeCategory } from '../../utils';

interface IPropType {
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
  slug: string;
}

const category = ({ categories, articles, slug }: IPropType) => {
  const formattedCategory = () => {
    return makeCategory(slug);
  };
  return (
    <>
      <Head>
        <title>.blog | {formattedCategory()}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs categories={categories.items} />
      <ArticleList articles={articles.items} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const options = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
    filters: {
      category: {
        slug: query.category,
      },
    },
  };

  const queryString = qs.stringify(options);

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
        pagination: categories.meta.pagination,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
      slug: query.category,
    },
  };
};

export default category;
