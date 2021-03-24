import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 775px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    text-align: center;
    @media (max-width: 775px) {
      flex-direction: column;
    }
  `,
  Form: styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    text-align: center;
    & > input {
      width: 100px;
      height: 40px;
    }
    @media (max-width: 775px) {
      flex-direction: row;
    }
  `,
  FormElement: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 50px;
    @media (max-width: 775px) {
      width: 100px;
      align-items: space-between;
      height: 200px;
    }
  `,
  Button: styled.button`
    width: 50px;
    height: 40px;
    margin: 10px;
    @media (max-width: 775px) {
      margin: 10px;
    }
    @media (max-width: 560px) {
      margin: 5px;
    }
  `,
  Buttons: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 775px) {
      width: 300px;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    @media (max-width: 560px) {
      width: 240px;
    }
  `,
};

export default Styled;
