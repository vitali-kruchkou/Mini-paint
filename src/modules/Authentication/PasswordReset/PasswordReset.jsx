import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { Toaster } from 'react-hot-toast';
import Style from './StyledPasswordReset';
import { useDispatch } from 'react-redux';
import allActions from '@store/actions';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    dispatch(allActions.authActions.resetPassw(email));
    setEmail('');
  };
  return (
    <Style.Container>
      <Toaster />
      <Style.Form>
        <Form>
          <Style.Title>Reset your Password</Style.Title>
          <Form.Item>
            <Input
              type="email"
              name="userEmail"
              id="userEmail"
              value={email}
              placeholder="Input your email"
              onChange={onChangeHandler}
            />
          </Form.Item>
          <Form.Item>
            <Style.Button>
              <button className="ResetPas" onClick={sendResetEmail}>
                Send me a reset link
              </button>
            </Style.Button>
          </Form.Item>
          <Link to="/signIn">&larr; back to sign in page</Link>
        </Form>
      </Style.Form>
    </Style.Container>
  );
};

export default PasswordReset;
