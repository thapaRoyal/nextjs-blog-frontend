import React from 'react';
import { AxiosResponse } from 'axios';
import { IArticle, ICollectionResponse } from '../../types';
import { fetchArticleBySlug } from '../../http';
import qs from 'qs';
import { GetServerSideProps } from 'next';

interface IPropType {
  article: IArticle;
  notFound: boolean;
}

const slug = ({ article, notFound = false }: IPropType) => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryString = qs.stringify({
    populate: ['Image', 'author.avatar'],
    filters: {
      Slug: {
        $eq: query.slug,
      },
    },
  });

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticleBySlug(queryString);

  if (articles.data.length === 0) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      article: articles.data[0],
    },
  };
};

export default slug;
