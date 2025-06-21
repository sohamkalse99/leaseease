import { Button } from 'react-daisyui'
import EmailIcon from '../static/svg/emailIcon'
import PasswordIcon from '../static/svg/passwordIcon'
import UserIcon from '../static/svg/userIcon';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_HOST, SIGNUP } from '../constants';
import { ICON } from '../static/png/icon';
const Register = ({auth}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState();
    let navigate = useNavigate();
    useEffect(()=>{
        if(auth.isAuthenticated()){
            navigate('/home');
        }
    })
    
    const handleSubmit = async () => {
        setError(null);

        if(email===''){
            setError('Email can not be empty');
            return;
        }

        if(password===''){
            setError('Password can not be empty');
            return;
        }


        if(firstname===''){
            setError('First name can not be empty');
            return;
        }

        if(lastname===''){
            setError('Last name can not be empty');
            return;
        }

        const response = await axios.post(API_HOST+SIGNUP,{
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });
        if(response?.data?.result){
            navigate('/login')
        } else{
            setError('Registration failed')
        }
    };
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <ICON />
            {error && (
            <div role="alert" className="alert alert-error w-1/3 mb-5">
                <span>Error! {error}</span>
            </div>
            )}
            <label className="input input-bordered flex items-center gap-2 mb-5 w-1/3">
                <EmailIcon />
                <input type="text" className="grow" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5 w-1/3">
                <PasswordIcon />
                <input type="password" className="grow" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5 w-1/3">
                <UserIcon />
                <input type="text" className="grow" placeholder="First name" onChange={(e)=>{setFirstname(e.target.value)}}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-5 w-1/3">
                <UserIcon />
                <input type="text" className="grow" placeholder="Last name" onChange={(e)=>{setLastname(e.target.value)}}/>
            </label>
            <Button className="btn btn-active btn-success w-1/3 text-white" onClick={handleSubmit}>Register</Button>
            <p>Already have an account? <Link className="link link-secondary" to="/login">Login</Link></p>
        </div>
    );
  };
  
  export default Register;