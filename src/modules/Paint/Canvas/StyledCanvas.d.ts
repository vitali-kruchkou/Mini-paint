import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 775px;
    height: 500px;
    margin: 0 auto;
    @media (max-width: 768px) {
      max-width: 775px;
      margin: 0 auto;
    }
    @media (max-width: 575px) {
      max-width: 550px;
      max-height: 400px;
      margin: 0 auto;
    }
    & > canvas {
      border: 1px solid gray;
      background: #f7f2f2;
    }
  `,
  Buttons: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};

export default Styled;
