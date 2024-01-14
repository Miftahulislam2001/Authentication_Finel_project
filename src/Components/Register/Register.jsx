import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';

const Register = () => {
    const auth = getAuth(app);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleUserSubmit = (event) => {
        // event.PreventDefault
        event.preventDefault();

        //=======Get Form Input Data========//
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;


        // Validation
        setErrorMessage('')
        setSuccessMessage('')

        if (!/(?=.*[A-Z])/.test(password)) {
            setErrorMessage(" Ensure string has One uppercase letters.");
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setErrorMessage("Ensure string has One digits.");
            return;
        }
        else if (password.length < 6) {
            setErrorMessage('Ensure string is of length 6.')
            return
        }


        //========SignUp With Password=========//
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                form.reset();
                setSuccessMessage('Register Successfully')
                setErrorMessage('')
                updateProfileData(user, name)
                sendVerificationEmail(user)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage)
                setSuccessMessage('')
            });

    }

     //======== Update Profile  ==========//
     const updateProfileData = (user, name) => {
        updateProfile(user, {
            displayName: name,
        })
            .then((result) => {
                alert("Profile Update");
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    //=========== Send Verification Email ==========//
    const sendVerificationEmail = (user) => {
        console.log(user);
        sendEmailVerification(user)
            .then((result) => {
                alert("please verification your email");
            })
            .then((error) => {
                console.log(error?.message);
            });
    };

    return (
        <section className='border rounded-xl p-[17px] mx-auto md:w-1/2 mt-1 shadow-3xl'>
            <h2 className='text-center text-2xl'>Sign Up</h2>
            <form onSubmit={handleUserSubmit}>
                <div className='flex flex-col my-3'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className='border rounded p-2 text-base' autoComplete='off' placeholder='Name' />
                </div>
                <div className='flex flex-col my-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className='border rounded p-2 text-base' autoComplete='off' placeholder='email' required />
                </div>
                <div className='flex flex-col my-3'>
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" id="password" className='border rounded p-2 text-base' autoComplete='off' placeholder='password' />
                </div>

                <p className='text-[#da4747]'>{errorMessage}</p>
                <p className='text-[#32bc40]'>{successMessage}</p>

                <button type='submit' className='bg-[#289199] text-white w-full p-2 text-[21px] rounded mt-[10px]'>Sign Up</button>
                <p className='mt-[8px] text-center'>Already have an account? <Link to="/login" className='text-[#1f32dd]'>Login</Link></p>


            </form>
        </section>
    );
};

export default Register;