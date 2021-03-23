import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 775px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  `,
  Form: styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    & > input {
      width: 100px;
      height: 40px;
    }
  `,
  FormElement: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100px;
  `,
};

export default Styled;
