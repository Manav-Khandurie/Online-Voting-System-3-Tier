
function LoginForm() {
  return (
    <form id="login-form">
      <h2>Login</h2>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p> Dont have an account? <a href="#">Sign up here</a></p>
    </form>
  );
}

export default LoginForm;
