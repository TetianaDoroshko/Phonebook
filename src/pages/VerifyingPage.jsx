import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { verifyThunk } from 'redux/authThunk';
import { useEffect } from 'react';
import { Typography } from 'antd';

export const VerifyingPage = () => {
  const { verificationToken } = useParams();
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(verifyThunk(verificationToken));
  }, [disaptch, verificationToken]);

  const isVerify = useSelector(store => store.auth.isVerify);

  return isVerify ? (
    <div>
      <Typography.Title type="success" style={{ marginBottom: '20px' }}>
        Successful Email Verification
      </Typography.Title>
      <Typography.Text>
        Congratulations! You have successfully passed the mail verification.{' '}
      </Typography.Text>
      <Link to="/contacts">Continue using the app..</Link>
    </div>
  ) : (
    <>
      <Typography.Title type="danger" style={{ marginBottom: '20px' }}>
        Unsuccessful Email Verification
      </Typography.Title>
      <Typography.Text>
        Please sign in and from there, request a new verification email.{' '}
      </Typography.Text>
      <Link to="/login">Go to Sign In</Link>
    </>
  );
};
