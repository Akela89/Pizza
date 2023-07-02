import React from 'react';

import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Categories from '../Components/Categories';
import { Skeleton } from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoriesID, setCategoriesID] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'ask' : 'desc';
    const categories = categoriesID > 0 ? `category=${categoriesID}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    fetch(
      `https://649ad76dbf7c145d0239920e.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}&${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoriesID, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoriesID}
          onClickCategories={(indexCategories) => setCategoriesID(indexCategories)}
        />
        <Sort value={sortType} onClickSort={(indexSort) => setSortType(indexSort)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        onChangePages={(number) => {
          setCurrentPage(number);
        }}
      />
    </div>
  );
}

export default Home;
