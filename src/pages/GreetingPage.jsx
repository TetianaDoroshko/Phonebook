import { useSelector } from 'react-redux';
import logoLg from 'images/phone-book (3).png';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { refreshThunk } from 'redux/authThunk';

export const GreetingPage = () => {
  const name = useSelector(store => store.auth.user.name);
  const avatar = useSelector(store => store.auth.user.avatar);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const isVerify = useSelector(store => store.auth.isVerify);

  return isLoggedIn ? (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Hello, {name}</h1>
      <Link
        to="contacts"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        <Image src={logoLg} preview={false} />
        {avatar && (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            style={{
              position: 'absolute',
              height: '80px',
              width: '80px',
              top: '30px',
              left: '110px',
              borderRadius: '50%',
            }}
          />
        )}
      </Link>{' '}
      {!isVerify && (
        <p>
          In order to use all the features of the application, you need to
          confirm your email. Please, check your email.
        </p>
      )}
    </div>
  ) : (
    <>
      <h1>Welcome to Phonebook</h1>
    </>
  );
};
