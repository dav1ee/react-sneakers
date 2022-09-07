import { FC, useState, useEffect, useRef, memo } from 'react';

import { SortType, SortEnum } from '../redux/slices/filterSlice';

type SortProps = {
  sort: SortType;
  onSetSort: (obj: SortType) => void;
};

export const sortList: SortType[] = [
  { name: 'популярности', type: SortEnum.RATING },
  { name: 'убыванию цены', type: SortEnum.PRICE_DESC },
  { name: 'возрастанию цены', type: SortEnum.PRICE_ASC },
];

const Sort: FC<SortProps> = memo(({ sort, onSetSort }) => {
  const [open, setOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSort = (obj: SortType) => {
    onSetSort(obj);
    setOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={open ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировать по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList &&
              sortList.map((obj, index) => (
                <li
                  key={index}
                  className={obj.name === sort.name ? 'active' : ''}
                  onClick={() => onClickSort(obj)}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
