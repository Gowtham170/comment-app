import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {

  const [values, setValues] = useState(() => ({
    email: '',
    password: ''
  }));

  const handleChange = (e) =>{
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  };

  const formHandler = (e) => {
    e.preventDefault();

    const user = {
      email: values.email,
      password: values.password
    }
    
    fetch('http://localhost:5000/api/user/login', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method:'POST',
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('auth-token', data.token) 
        if(data.status === 'ok') {
          alert('Login successful')
          window.location.href = '/Comment'
        }
        else {
          alert('Please check your email and password')
        }
      })
      .catch(err => {
        console.log(err);
      });


    setValues({
      email: '',
      password: '',
    });
  } 

  return (
    <div className='container-lg p-3'>
      <div className='text-center'>
        <h2 className='pt-4'>Sign In</h2>
        <p className='text-muted pt-5'>Don't have an account? <Link to='/SignUp' type='button' className='text-primary' style={{ textDecoration: 'none' }}>Sign Up</Link></p>
      </div>
      <div className='row justify-content-center align-content-center'>
        <div className='col-10 col-lg-6 col-md-8 col-sm-9'>
          <form className='mt-3' onSubmit={formHandler}>
            <label className='form-label' htmlFor='email'>Email</label>
            <input name='email' id='email' className='form-control mb-4' value={values.email} onChange={handleChange} required type='email' placeholder='e.g John@example.com'></input>
            <label className='form-label' htmlFor='password'>Password</label>
            <input name='password' id='password' className='form-control mb-2' value={values.password} onChange={handleChange} required type='password' autoComplete='on'></input>
            <div className='text-end my-4'>
              <Link to='/ForgotPassword' type='button' style={{ textDecoration: 'none' }}>Forgot your password?</Link>
            </div>
            <div className='input-group'>
              <button type='submit' className='btn btn-primary text-light' style={{ width: '120px' }}><i className='bi bi-lock-fill'></i> Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
