import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from '../../Firebase/firebase.init';


const LogIn = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();

    //============SignIn With Google===========//
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const googleUser = result.user;
                setSuccessMessage('Login Successfully')
            })
            .catch(error => {
                const googleError = error.message;
                setErrorMessage(googleError)
            })
    }

    //============SignIn With Google===========//
    const handleSignInWithGitHub = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const gitHubUser = result.user;
                console.log(gitHubUser);
            })
            .catch(error => {
                const gitHubError = error.message;
                setErrorMessage(gitHubError)
            })
    }

    //============SignIn With Password===========//
    const handleSignInWithPassword = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const passwordUser = result.user;
                console.log(passwordUser);
                setSuccessMessage('Login Successfully')
            })
            .catch(error => {
                const passwordError = error.message;
                setErrorMessage(passwordError)

            })
    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if (!email) {
            alert("please write at least Email for password reset");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("please check your email");
            })
            .catch((error) => {
                setErrorMessage(error?.message)
        });
    }

    


    return (
        <section className='border rounded-xl p-[25px] mt-10 shadow-3xl mx-auto md:w-1/2'>
            <h2 className='text-center text-3xl'>Login</h2>
            <form onSubmit={handleSignInWithPassword}>
                <div className='flex flex-col my-4'>
                    <label htmlFor="email" className='text-[17px]'>Email</label>
                    <input type="email" ref={emailRef} name="email" id="email" className='border rounded p-2 text-base' autoComplete='off' placeholder='email' required />
                </div>
                <div className='flex flex-col my-4'>
                    <label htmlFor="password" className='text-[17px]'>Password</label>
                    <input type="password" name="password" id="password" className='border rounded p-2 text-base' autoComplete='off' placeholder='password' required />
                </div>
                <p className='text-[#da4747]'>{errorMessage}</p>
                <p className='text-[#24a049]'>{successMessage}</p>
                <button type='submit' className='bg-[#289199] text-white w-full p-2 text-[21px] rounded mt-[10px]'>Login</button>
                <p className='mt-[8px] text-center'>New to Project ? <Link to="/register" className='text-[#1f81dd]'>Create New Account</Link><Link onClick={handleResetPassword} className='text-[#1f81dd] ml-3'>Forget Password</Link></p>

                <div className='flex items-center justify-between mt-[25px] '>
                    <hr className='w-[45%] bg-[#95A0A7]' />
                    <p className='text-[#95A0A7]'>Or</p>
                    <hr className='w-[45%] bg-[#95A0A7]' />
                </div>
                <button onClick={handleSignInWithGoogle} className='p-[10px] border rounded w-full flex justify-center items-center gap-[6px] mt-[33px]'><FcGoogle className='text-[32px]' /><span>Continue with Google</span></button>
                <button onClick={handleSignInWithGitHub} className='p-[10px] border rounded w-full flex justify-center items-center gap-[6px] mt-[10px]'><AiFillGithub className='text-[32px]' /><span>Continue with Github</span></button>
            </form>
        </section>
    );
};

export default LogIn;