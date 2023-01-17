import { useState, useEffect } from "react";
import { RxDotFilled } from 'react-icons/rx';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function ResetPassword() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [validUsername, setValidUsername] = useState();
    const [validPassword, setValidPassword] = useState();
    const [validConfirm, setValidConfirm] = useState();

    const [focusUsername, setFocusUsername] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const [focusConfirm, setFocusConfirm] = useState(false);


    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setValidUsername(username !== '');
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirm(password === confirm);
    }, [password, confirm]);

    function validInputs() {
        return validUsername && validPassword && validConfirm;
    }

    return (
        <div className="shadow-lg border rounded-lg border-gray-400 py-5 px-8 bg-gray-50 w-[500px] mt-16 ml-auto mr-auto">
            <p className="text-4xl font-semibold mb-4 text-gray-700">Sign Up!</p>
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <form className="flex flex-col">
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
                        <p className="text-red-600">Username should not be empty.</p>
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
                {focusPassword && !validPassword && password !== '' &&
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
                    className={`mb-2 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800`}
                    id="confirm" 
                    required 
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirm(e.target.value)}
                    onFocus={() => setFocusConfirm(true)}
                    onBlur={() => setFocusConfirm(false)}
                    />
                {focusConfirm && !validConfirm && confirm !== '' &&
                <div className="mb-2">
                    <div className="flex flex-row items-center">
                        <RxDotFilled color="red" size={24} />
                        <p className="text-red-600">Passwords should match.</p>
                    </div>
                    
                </div>
                }

                <p className="text-red-500 mb-2">Fields with * are required!</p>
  
                <input type="submit" 
                    disabled={validInputs() ? false : true} 
                    className={`text-[24px] mb-2 bg-green-400 rounded-lg text-white w-full h-10 ${validInputs() && 'hover:cursor-pointer'} ${validInputs() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Sign up!"/> 
            </form>
        </div>
    )
}

export default ResetPassword;