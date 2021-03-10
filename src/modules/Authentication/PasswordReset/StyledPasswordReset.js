import styled from 'styled-components';

const Style = {
  Container: styled.div`
    // max-width: 750px;
    // margin: 0 auto;
    // margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
    height: 500px;
    border-radius: 3px;
    padding-top: 20px;
  `,
  Button: styled.div`
    width: 250px;
    & > .ResetPas {
      width: 200px;
      background: rgb(151, 11, 221);
      background: linear-gradient(
        90deg,
        rgba(151, 11, 221, 1) 0%,
        rgba(128, 11, 93, 1) 35%,
        rgba(237, 120, 10, 1) 100%
      );
      border: none;
      font-size: 18px;
      height: 30px;
      color: white;
      transition: 0.4s linear;
    }
    & > .ResetPas:hover {
      background-color: #e1dfdf;
      color: black;
      border: none;
    }
  `,
  Form: styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px solid black;
    padding: 80px;
    box-shadow: inset 0 0 0 1px #337ab7;
    @media (max-width: 768px) {
      padding: 0;
      box-shadow: none;
      border: none;
    }
  `,
  Title: styled.div`
    font-size: 30px;
    font-style: italic;
    padding-bottom: 30px;
  `,
  Links: styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-between;
    margin: 20px 0;
    & > Link {
      color: black;
    }
  `,
  Accept: styled.span`
    color: green;
  `,
};

export default Style;
