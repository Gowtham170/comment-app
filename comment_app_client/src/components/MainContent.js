import React, {useEffect, useState} from 'react';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

export default function MainContent() {

  const [status, setStatus] = useState(true);
  const [comment, setComment] = useState('');
  const [values,SetValues] = useState([]);
  const [email, setEmail] = useState(''); 
  const [filteredComment, setFilteredComment] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  };

  const changeStatus = (e) => {
    setStatus(false);
};

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
        const user = decodeToken(token);
        const id = user.id;
        fetch('http://localhost:5000/api/comment/'+id, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': token
          },
          method: 'GET',
          body: JSON.stringify()
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            setEmail(data.email);
            setFilteredComment(data.comments);
          })
          .catch((err) => console.log(err));
  }, [])

  const getComments = () => {
    const token = localStorage.getItem('auth-token');
    fetch('http://localhost:5000/api/comment/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      },
      method: 'GET',
      body: JSON.stringify()
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        SetValues(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if(token) {
      const user = decodeToken(token);
      if(!user) {
        localStorage.removeItem('auth-token')
        navigate('/');
      }
      else{
        getComments();
      }
    }
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();

    const data = {comment};

    const token = localStorage.getItem('auth-token');
    fetch('http://localhost:5000/api/comment/add', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': token
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch((err) => console.log(err));

    setComment('');

    window.location.reload(false);
  }

  return(
    <div className='container-lg p-5'>
      <div className='text-center'>
        <h2 className='pt-4'>Comment Section</h2>
      </div>
      <div className='row justify-content-center align-content-center'>
        <div className='col-12 col-lg-5 col-md-8 col-sm-10'>
          <form className='mt-5' onSubmit={formHandler}>
            <label className='mb-3'>What would you like to share with world?</label>
            <textarea className='form-control mb-4' value={comment} onChange={handleChange} style={{ height: '120px', resize: 'none' }} required></textarea>
            <div className='input-group mb-4'>
              <button type='submit' className='btn btn-outline-primary' style={{ width: '120px' }}>Submit</button>
            </div>
          </form>
        </div>
        <div className='col col-lg-7 col-md-8 col-sm-10'>
          <div className='card border-1 border-dark mt-lg-5'>
            <div className='card-body'>
              <div className='card-title d-flex justify-content-between'>
                comment
                <button className='btn btn-sm btn-outline-primary'  onClick={changeStatus} style={{width:'80px'}}>filter</button>
              </div>
              <div className='card-text mt-4 mx-4'>
                {(status) ? (values.map((comment)=> {
                  return <ul key={comment.email} className='list-unstyled'>
                    <li className='d-flex justify-content-between'>
                    <p className='p-1 mt-5 ms-5'>{comment.email}</p>
                    <div className='card border-1 border-dark me-5'>
                      <div className='card-header'>comments</div>
                      <div className='card-body p-1'>
                          {comment.comments.map((value) => {
                            return <ul key={value} className='list-unstyled'>
                              <li className='ps-1'>{value}</li>
                            </ul>
                          })}
                      </div>
                    </div>
                   </li>
                  </ul>
                })): (<div className='d-flex justify-content-between'>
                  <p className='mt-5 pt-4 ms-5'>{email}</p>
                  <div className='card me-5'>
                    <div className='card-header'>comments</div>
                      <div className='card-body'>
                        {filteredComment.map((value) => {
                          return <div className='card-text'>{value}</div>
                        })
                        }
                      </div>
                  </div>
                </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center mt-5'>
      <button type='submit' className='btn btn-primary' onClick={logout} style={{ width: '120px' }}>logout</button>
      </div>
    </div>
  );
}