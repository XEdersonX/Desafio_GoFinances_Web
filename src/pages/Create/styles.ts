import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 70vh;
  margin: 0 auto;

  display: flex;
  /*flex-direction: column; */
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 48px;
    color: #3a3a3a;
    max-width: 450px;
    line-height: 56px;

    margin-top: 80px;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }

  input {
    width: 100%;
    max-width: 380px;

    margin-top: 8px;

    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    &::placeholder {
      color: #a8a8b3;
    }

    & + input {
      display: flex;
    }

    & + button {
      margin-top: 30px;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #5636d3;
    border-radius: 5px 5px 5px 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }

  form {
    width: 100%;
    max-width: 450px;
  }
`;
