import React from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ active, pageNumber, list }) => {
  let items = [];
  for (let number = 1; number <= list.length / 30; number++) {
    items.push(
      <Pagination.Item
        onClick={() => pageNumber(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
  return <div>{paginationBasic}</div>;
};

export default Paginator;
