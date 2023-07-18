import { useState } from 'react';

export const Login = () => {
  const [userData, setUserData] = useState({
    user: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((userData) => ({
      ...userData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="user" className="form-label">
            User
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            name="user"
            value={userData.user}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <a href="/signup" className="ms-3">Sign Up</a>
          <a href="/forgot-password" className="ms-3">Forgot your password</a>
        </div>
      </form>
    </div>
  );
};
