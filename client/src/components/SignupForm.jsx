// SignupForm.js
import '../styles/SignupForm.css';

function SignupForm() {
  return (
    <form id="signup-form">
      <h2>Sign Up</h2>
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <a href="#">Log in here</a></p>
    </form>
  );
}

export default SignupForm;
