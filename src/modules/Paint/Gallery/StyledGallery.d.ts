import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    @media (max-width: 768px) {
      max-width: 700px;
      box-shadow: none;
      border: none;
    }
  `,
  Img: styled.img`
    max-width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 10px;
    @media (max-width: 775px) {
      max-width: 300px;
    }
  `,
  Text: styled.div`
    margin: 0 auto;
    text-align: center;
    font-family: Georgia, serif;
    font-size: 20px;
  `,
};

export default Styled;
