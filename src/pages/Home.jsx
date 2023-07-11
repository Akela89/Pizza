import React from 'react';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../Redux/Slices/FilterSlice';

import Sort, { sortList } from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Categories from '../Components/Categories';

import axios from 'axios';

import { Skeleton } from '../Components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';

import Pagination from '../Components/Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'ask' : 'desc';
    const categories = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    axios
      .get(
        `https://649ad76dbf7c145d0239920e.mockapi.io/items?page=${currentPage}&limit=4&${categories}&sortBy=${sortBy}&order=${order}&${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategories={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePages={onChangePage} />
    </div>
  );
}

export default Home;
