import styled from 'styled-components';

const Styled = {
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
    width: 200px;
    & > .SignIn {
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
    & > .SignIn:hover {
      background-color: #e1dfdf;
      color: black;
      border: none;
    }
    & > .Google {
      width: 200px;
      background-color: white;
      border: none;
      font-size: 15px;
      height: 40px;
      transition: 0.4s linear;
    }
    & > .Google:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
    & > .Google > span {
      margin-left: 10px;
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
      box-shadow: none;
      border: none;
    }
  `,
  Title: styled.span`
    font-size: 30px;
    font-style: italic;
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
    & > Link > .SignUp {
      border: 1px solid black;
    }
  `,
  Error: styled.span`
    color: red;
  `,
};

export default Styled;
