import React from 'react';
import styled from 'styled-components';

const SideBar = () => {
  return (
    <StyledBar className='side-bar'>
      <div className='contents'>
        <h1 className='logo'>XO.</h1>
        <div className='user-card'>
          <img src='images/profile-photo.png' alt='profile' />
          <div className='details'>
            <h3 className='user-name'>Ahmed Reda</h3>
            <p className='user-id'>#123456</p>
          </div>
        </div>
        <div className='bar-items'>
          <div className='bar-item'>
            <img src='icons/dashboard.svg' alt='' />
            <p>Dashboard</p>
          </div>
          <div className='bar-item'>
            <img src='icons/requests.svg' alt='' />
            <p>Requests</p>
          </div>
          <div className='bar-item'>
            <img src='icons/users.svg' alt='' />
            <p>Users</p>
          </div>
          <div className='bar-item'>
            <img src='icons/boxes.svg' alt='' />
            <p>Boxes</p>
          </div>
          <div className='bar-item'>
            <img src='icons/orders.svg' alt='' />
            <p>Orders</p>
          </div>
        </div>
      </div>
    </StyledBar>
  );
};

// Styles
const StyledBar = styled.div`
  position: fixed;
  height: 100%;
  width: 256px;
  left: 21px;
  top: 0px;
  bottom: 0px;
  background: white;
  box-shadow: 6px 0px 18px 0px #0000000f;

  .contents {
    margin-left: 24px;

    .logo {
      font-family: sans-serif;
      font-weight: 900;
      margin-top: 17px;
      color: #0a47c4;
    }

    .user-card {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin: 42px 0 40px 0;
      img {
        margin-right: 16px;
      }
      .user-id {
        color: #90a0b7;
        font-size: 11px;
      }
    }
    .bar-items {
      .bar-item {
        cursor: pointer;
        display: flex;
        margin-bottom: 20px;
        p {
          color: #334d6e;
          font-size: 13px;
          font-weight: 500;
          margin-left: 14px;
        }
      }
    }
  }
`;

export default SideBar;
