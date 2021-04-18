import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Table = ({ sortValue, filterValue, searchValue }) => {
  // States
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([...data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Manipulating data (Sort and Filter Logic)
  const sortAndFilter = (data, sortValue, filterValue) => {
    let output = [];
    // Sort
    switch (sortValue) {
      case 'A-Z':
        output = [...data].sort((a, b) => {
          if (a.customer.fname.toLowerCase() < b.customer.fname.toLowerCase())
            return -1;
          if (a.customer.fname.toLowerCase() > b.customer.fname.toLowerCase())
            return 1;
          return 0;
        });
        break;
      case 'Date':
        output = [...data].sort((a, b) => {
          if (a.created_at < b.created_at) return -1;
          if (a.created_at > b.created_at) return 1;
          return 0;
        });
        break;

      default:
        output = [...data];
    }

    // Filter
    switch (filterValue) {
      case 'Pending':
        console.log('Pending');
        output = [...output].filter(
          (entry) => entry.status.toLowerCase() === 'pending_confirmation'
        );
        break;
      case 'Confirmed':
        output = [...output].filter(
          (entry) => entry.status.toLowerCase() === 'confirmed'
        );
        break;
      default:
        break;
    }

    return output;
  };

  // Fetching data and update state
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        'https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders'
      );
      setData(data.data.orders);
      setSortedData(data.data.orders);
    };
    fetchData();
  }, []);

  // Sort and filter data whenever an option selected in either
  useEffect(() => {
    setSortedData(sortAndFilter(data, sortValue, filterValue));
  }, [sortValue, filterValue, data]);

  // View relevent data whenever search bar is edited
  useEffect(() => {
    if (searchValue !== '')
      setSortedData(
        sortAndFilter(data, sortValue, filterValue).filter((item) =>
          `${item.customer.fname} ${item.customer.lname}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    else {
      setSortedData(sortAndFilter(data, sortValue, filterValue));
    }
  }, [searchValue, data, filterValue, sortValue]);

  // Pagination
  // Getting the items for the current page
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = sortedData.slice(indexFirst, indexLast);

  // Forming an array of the pages numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <StyledTable>
        <tr>
          <th></th>
          <th>ID Number</th>
          <th> </th>
          <th>Status</th>
          <th>Supplier</th>
          <th>Date</th>
        </tr>
        {currentItems.length
          ? currentItems.map((order) => (
              <tr className='row' key={order.id}>
                <td>
                  <input type='checkbox' />
                </td>
                <td className='order-id'>#{order.id}</td>
                <td>{`${order.customer.fname} ${order.customer.lname}`}</td>
                <td>{order.status.split('_').join(' ')}</td>
                <td>{order.supplier}</td>
                <td>
                  {new Date(order.created_at).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
              </tr>
            ))
          : ''}
      </StyledTable>
      <Pagination className='pagination'>
        <ul className='page-links'>
          {pageNumbers.map((number) => (
            <p
              className={
                currentPage === number ? 'page-link active' : 'page-link'
              }
              key={number}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </p>
          ))}
        </ul>
      </Pagination>
    </div>
  );
};

// Styles
const StyledTable = styled.table`
  color: #707683;
  font-size: 13px;
  background-color: white;
  width: calc(100% - 35px);
  margin-left: 15px;
  margin-right: 38px;
  padding: 22px;
  tr {
    height: 64px;
    text-align: left;
    .order-id {
      color: black;
      font-size: 15px;
    }
  }
  .row {
    &:hover {
      background: #f3f7fb;
    }
  }
`;

const Pagination = styled.nav`
  width: calc(100% - 35px);
  margin: 10px 38px 20px 15px;
  background: white;
  .page-links {
    font-size: 13px;
    height: 25px;
    display: flex;
    align-items: center;

    .page-link {
      width: 20px;
      text-align: center;
      color: #0a47c4;
      margin-left: 15px;
      cursor: pointer;
      &:hover {
        border: 1px solid #043495;
        background: #f3f7fb;
      }
    }
    .active {
      border: 1px solid #043495;
      color: #043495;
    }
  }
`;

export default Table;
