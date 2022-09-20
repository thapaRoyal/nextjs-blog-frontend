export const formatDate = (dateString: string): string => {
  const date = new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return date;
};

export const makeCategory = (slug: string) => {
  if (typeof slug === 'string') {
    return slug.split('-').join(' ');
  }
  return '';
};

export const capitalizeFirstLetter = () => {};
