import { v4 } from 'uuid';

import { type DataType, GalleryItemType } from './types';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = ['Кино', 'Спорт', 'Музыка', 'Мода', 'Культура', 'Технологии'];

export const generateData = () => {
  const dataItem: DataType[] = Array.from(
    { length: data.length },
    (_, index) => {
      const randomYear = getRandomInt(1700, 2006);
      const randomRange = getRandomInt(5, 15);

      const items: GalleryItemType[] = Array.from(
        { length: randomRange },
        (__, itemIndex) => ({
          id: v4(),
          year: randomYear + itemIndex,
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. Lorem ipsum dolor sit amet.'
        })
      );

      return {
        id: v4(),
        title: data[index],
        years: [randomYear, randomYear + randomRange - 1],
        items
      };
    }
  );

  return dataItem;
};
