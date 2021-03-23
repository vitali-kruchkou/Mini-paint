import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 775px;
    height: 500px;
    margin: 0 auto;
    border: 1px solid green;
    @media (max-width: 768px) {
      max-width: 400px;
      margin: 0 auto;
    }
    @media (max-width: 575px) {
      max-width: 400px;
      max-height: 200px;
      margin: 0 auto;
      margin-top: 20px;
      & > div {
        font-size: 10px;
      }
    }
  `,
};

export default Styled;
