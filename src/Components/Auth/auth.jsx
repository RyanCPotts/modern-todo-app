import { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context';

const Auth = ({ capability, children }) => {
  const { loggedIn, user, can } = useContext(LoginContext);

  console.log('LoggedIn:', loggedIn);
  console.log('User:', user);
  console.log('Capability:', capability);
  console.log('Can do capability:', can(capability));

  const isLoggedIn = loggedIn;
  const canDoCap = capability ? can(capability) : true;

  const renderPage = isLoggedIn && canDoCap;

  return (
    <When condition={renderPage}>
      {children}
    </When>
  );
}

export default Auth;
