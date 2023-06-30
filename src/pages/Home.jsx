import React from 'react';

import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Categories from '../Components/Categories';
import { Skeleton } from '../Components/PizzaBlock/Skeleton';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoriesID, setCategoriesID] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'ask' : 'desc';
    const catigories = categoriesID > 0 ? `categories=${categoriesID}` : '';
    fetch(
      `https://649ad76dbf7c145d0239920e.mockapi.io/items?${catigories}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoriesID, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoriesID}
          onClickCategories={(indexCategories) => setCategoriesID(indexCategories)}
        />
        <Sort value={sortType} onClickSort={(indexCategories) => setSortType(indexCategories)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
