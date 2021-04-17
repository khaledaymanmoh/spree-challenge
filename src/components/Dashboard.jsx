import { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';

const Dashboard = () => {
  // States
  const [sortValue, setSortValue] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Updating sort and filter values on change
  const sortUpdater = (e) => {
    setSortValue(e.target.value);
  };
  const filterUpdater = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <StyledDashboard>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id='search'
        type='text'
        placeholder='Search for a contact'
        style={{ width: '100%' }}
      />

      <div className='toolbar'>
        <h3>Requests</h3>
        <div className='sort-filter'>
          <div className='sort'>
            <p>Sort by: </p>
            <select name='sort' id='sort' onChange={sortUpdater}>
              <option value='None'></option>
              <option value='A-Z'>A-Z</option>
              <option value='Date'>Date</option>
            </select>
          </div>
          <div className='filter'>
            <p>Filter by: </p>
            <select name='filter' id='filter' onChange={filterUpdater}>
              <option value='None'></option>
              <option value='Pending'>Status: Pending</option>
              <option value='Confirmed'>Status: Confirmed</option>
            </select>
          </div>
        </div>
      </div>

      <Table
        sortValue={sortValue}
        filterValue={filterValue}
        searchValue={searchValue}
      />
    </StyledDashboard>
  );
};

// Styles
const StyledDashboard = styled.div`
  margin-left: 277px;
  #search {
    height: 60px;
    padding-left: 15px;
    outline: none;
    border: none;
    margin-bottom: 58px;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 23px;
    width: calc(100% - 96px);
    margin-left: 33px;
    margin-right: 63px;
    font-size: 14px;

    .sort-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        margin-left: 24px;
      }
      .sort,
      .filter {
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 18px;
        font-weight: 400;
      }
      #sort,
      #filter {
        height: 18px;
        border: none;
        outline: none;
        background: none;
        color: #109cf1;
        font-size: 12px;
      }
    }
  }
`;

export default Dashboard;
