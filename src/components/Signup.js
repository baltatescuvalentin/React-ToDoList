import { useState, useEffect } from "react";
import { RxDotFilled } from 'react-icons/rx';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const USER_REGEX = /^[A-z][A-z0-9-_]{6,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    const [validUsername, setValidUsername] = useState();
    const [validPassword, setValidPassword] = useState();
    const [validConfirm, setValidConfirm] = useState();
    const [validFullname, setValiFullname] = useState();
    const [validEmail, setValidEmail] = useState();

    const [focusUsername, setFocusUsername] = useState(false);
    const [focusFullname, setFocusFullname] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const [focusConfirm, setFocusConfirm] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setErrorMsg('');
            await signup(username, email, password, fullname);
        }
        catch(e) {
            setErrorMsg(e.message);
        }
    }

    let navigator = useNavigate();

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirm(password === confirm);
    }, [password, confirm]);

    useEffect(() => {
        setValiFullname(fullname !== '');
    }, [fullname]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    function validInputs() {
        return validUsername && validPassword && validConfirm && validFullname && validEmail;
    }

    return (
        <div className="shadow-2xl border-2 rounded-lg border-red-300 py-5 px-8 bg-gray-50 w-[500px] mb-8 mt-12 ml-auto mr-auto">
            <p className="text-4xl font-semibold mb-4 text-gray-700">Sign Up!</p>
            { errorMsg && <p className="text-xl bg-red-100 text-red-800 p-2 rounded-lg font-medium mb-2">{errorMsg}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="username">
                    <span className="text-red-500">*</span>Username 
                {validUsername ? <FiThumbsUp size={18} color="green"/> : (!validUsername && username !== '') && <FiThumbsDown size={18} color="red" /> }</label>
                <input type="text" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="username" 
                    required 
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusUsername(true)}
                    onBlur={() => setFocusUsername(false)}
                    />
                {focusUsername && !validUsername && 
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Username should start with a letter.</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Username should include numbers.</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Username should have at least 7 characters.</p>
                    </div>
                </div>
                }

                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="fullname">
                    <span className="text-red-500">*</span>Email
                {validEmail ? <FiThumbsUp size={18} color="green"/> : (!validEmail && email !== '') && <FiThumbsDown size={18} color="red" /> }</label>
                <input type="email" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="Email" 
                    required 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                    />
                {focusEmail && !validEmail && 
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Enter an valid email.</p>
                    </div>
                    
                </div>
                }
                
            
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="fullname">
                    <span className="text-red-500">*</span>Fullname
                {validFullname ? <FiThumbsUp size={18} color="green"/> : (!validFullname && fullname !== '') && <FiThumbsDown size={18} color="red" /> }</label>
                <input type="text" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="fullname" 
                    required 
                    placeholder="Fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    onFocus={() => setFocusFullname(true)}
                    onBlur={() => setFocusFullname(false)}
                    />
                {focusFullname && !validFullname && 
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Fullname should not be empty.</p>
                    </div>
                    
                </div>
                }
  
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="password">
                    <span className="text-red-500">*</span>Password
                {validPassword ? <FiThumbsUp size={18} color="green"/> : (!validPassword && password !== '') && <FiThumbsDown size={18} color="red" /> }</label>
                <input type="password" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="password" 
                    required 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)}
                    />
                {focusPassword && !validPassword && 
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Password should have a lowercase letter.</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Password should have an uppercase letter.</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Password should have a number.</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Password should have a special character(!@#$%).</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Password should have at least 9 characters.</p>
                    </div>
                </div>
                }

                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="confirm">
                    <span className="text-red-500">*</span>Confirm Password
                {validConfirm && confirm !== '' ? <FiThumbsUp size={18} color="green"/> : (!validConfirm && confirm !== '') && <FiThumbsDown size={18} color="red" /> }</label>
                <input type="password" 
                    className={`${focusConfirm && !validConfirm ? 'mb-2' : 'mb-8'} text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800`}
                    id="confirm" 
                    required 
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirm(e.target.value)}
                    onFocus={() => setFocusConfirm(true)}
                    onBlur={() => setFocusConfirm(false)}
                    />
                {focusConfirm && !validConfirm && 
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Passwords should match.</p>
                    </div>
                    
                </div>
                }

                {
                   !validInputs() && <p className="text-red-500 text-[20px] mb-2">Fields with * are required!</p>
                }
  
                <input type="submit" 
                    disabled={validInputs() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white w-full h-10 ${validInputs() && 'hover:cursor-pointer'} ${validInputs() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Sign up!"/> 
            </form>
            <div className="border-b-2 border-black m-4"></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Already have an account?</p>
                <p className="text-xl text-green-400 hover:cursor-pointer" onClick={() => navigator('../signin')}>Sign In!</p>
            </div>
        </div>
    )
}

export default Signup;