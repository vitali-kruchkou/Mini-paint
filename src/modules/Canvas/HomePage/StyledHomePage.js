import styled from 'styled-components';

const Style = {
  Container: styled.div`
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    @media (max-width: 762px) {
      max-width: 400px;
      max-height: 700px;
      margin: 0 auto;
    }
    @media (max-width: 575px) {
      max-width: 400px;
      max-height: 400px;
      margin: 0 auto;
    }
  `,
  Button: styled.div`
    margin: 0 auto;
    text-align: center;
    border: none;
    & > button {
      background-color: #b629fd;
      color: white;
      border: none;
    }
  `,
  SignOut: styled.div`
    color: #000080;
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    & > button {
      background-color: black;
      color: white;
      border: none;
    }
    @media (max-width: 575px) {
      font-size: 13px;
    }
  `,
};

export default Style;
