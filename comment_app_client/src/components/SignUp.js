import React, {useState} from 'react';
import {Link } from 'react-router-dom';

export default function SignUp() {

  const [values, setValues] = useState(() => ({
    email: '',
    password: '',
    secret: ''
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
      password: values.password,
      secret: values.secret
    }
    
    fetch('http://localhost:5000/api/user/register', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status === 'ok') {
          alert('registered successful')
          window.location.href = '/'
        }
        else {
          alert('email already exists');
        }
      })
      .catch(err => {
        console.log(err);
      });

    setValues({
      email: '',
      password: '',
      secret: ''
    });
  } 

  return (
    <div className='container-lg p-3'>
      <div className='text-center'>
        <h2 className='pt-4'>Sign Up</h2>
        <p className='text-muted pt-5'>Already have an account? <Link to='/' type='button' className='text-primary' style={{ textDecoration: 'none' }}>Sign In</Link></p>
      </div>
      <div className='row justify-content-center align-content-center'>
        <div className='col-10 col-lg-6 col-md-8 col-sm-9'>
          <form className='mt-3' onSubmit={formHandler}>
            <label className='form-label' htmlFor='email'>Email</label>
            <input name='email' id='email' className='form-control mb-4' value={values.email} onChange={handleChange} required type='email' placeholder='e.g John@example.com'></input>
            <label className='form-label' htmlFor='password'>Password</label>
            <input name='password' id='password' className='form-control mb-4' value={values.password} onChange={handleChange} required type='password' autoComplete='on'></input>
            <label className='form-label' htmlFor='secret'>Secret</label>
            <input name='secret' id='secret' className='form-control mb-4' value={values.secret} onChange={handleChange} required type='password' autoComplete='on'></input>
            <div className='input-group'>
              <button type='submit' className='btn btn-primary text-light ' style={{ width: '120px' }}><i className='bi bi-lock-fill'></i> Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
