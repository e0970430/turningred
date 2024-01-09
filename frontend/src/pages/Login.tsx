import { useAuth } from "./../contexts/AuthContext";

function Login() {
  const { userAccount, connect } = useAuth();

  return (
    <div>
      {userAccount ? (
        <p>Welcome, {userAccount}!</p>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
}

export default Login;
