/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Divider, Tooltip } from 'antd';
import { Toaster } from 'react-hot-toast';
import {
  UserOutlined,
  GoogleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Style from './StyledSignIn';
import allActions from '@store/actions';
import { signInWithGoogle } from '@firebaseConfig/';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const logginGoogle = () => {
    // signInWithGoogle();
    dispatch(allActions.authActions.signInGoogle());
  };

  const logginEmailAndPassword = event => {
    dispatch(allActions.authActions.signin(email, password));
  };

  return (
    <>
      <Style.Container>
        <Toaster />
        <Style.Form>
          <Form>
            <Style.Title>Clever Todo List</Style.Title>
            <Divider />
            <p>
              Welcome to Clever Todo list.
              <br />
              Please login to your account
            </p>
            <Divider />
            <Form.Item>
              <Input
                type="email"
                name="userEmail"
                value={email}
                placeholder="Your email"
                id="userEmail"
                onChange={onChangeHandler}
                prefix={<UserOutlined />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                type="password"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={onChangeHandler}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item>
              <Style.Button>
                <button className="SignIn" onClick={logginEmailAndPassword}>
                  Login
                </button>
              </Style.Button>
              <Style.Links>
                <Link to="/signUp">
                  <span className="SignUp">Sign up </span>
                </Link>{' '}
                <br />
                <Link to="/passwordReset">
                  <span>Forgot Password?</span>
                </Link>
              </Style.Links>
            </Form.Item>
            <Divider plain>Or Login Using</Divider>
            <Form.Item>
              <Style.Button>
                <button className="Google" onClick={logginGoogle}>
                  <GoogleOutlined />
                  <span>Google</span>
                </button>
              </Style.Button>
            </Form.Item>
          </Form>
        </Style.Form>
      </Style.Container>
    </>
  );
};

export default SignIn;
