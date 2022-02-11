import React, {useState} from 'react';

export default function ForgotPassword() {

  const [values, setValues] = useState(() => ({
    email: '',
    secret: ''
  }));

  const handleChange = (e) =>{
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  };

  const formHandler =(e) => {
    e.preventDefault();

    const user = {
      email: values.email,
      secret: values.secret,
    }

    fetch('http://localhost:5000/api/user/forgotpassword', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.status === 'ok') {
          alert(`Your password is ${data.password}`);
          window.location.href = '/';
        }
        else {
          alert('email and secret are invalid');
        }
      })
      .catch(err => {console.log(err)});

    setValues({
      email: '',
      secret: ''
    });
  } 

  return (
    <div className='container-lg p-5'>
      <div className='text-center mb-5'>
        <h2 className='pt-4'>Forgot Password</h2>
      </div>
      <div className='row justify-content-center align-content-center'>
        <div className='col-10 col-lg-6 col-md-8 col-sm-9'>
          <form className='mt-3' onSubmit={formHandler}>
            <label className='form-label' htmlFor='email'>Email</label>
            <input name='email' id='email' className='form-control mb-4' value={values.email} onChange={handleChange} required type='text' placeholder='e.g John@example.com'></input>
            <label className='form-label' htmlFor='secret'>Secret</label>
            <input name='secret' id='secret' className='form-control mb-4' value={values.secret} onChange={handleChange} required type='password' autoComplete='on'></input>
            <div className='input-group'>
              <button type='submit' className='btn btn-primary text-light' style={{ width: '120px' }}><i className='bi bi-lock-fill'></i> Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
