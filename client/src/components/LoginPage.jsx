import Image from './Image';
import '../styles/LoginPage';
import SignupForm from './SignupForm';

function LoginPage() {
    return (
      <div className="container">
        <div className="form-container">
          <h1>Welcome to Our Voting System</h1>
          <SignupForm />
        </div>
        <div className="image-container">
          <Image />
        </div>
      </div>
    );
  }
export default LoginPage;
