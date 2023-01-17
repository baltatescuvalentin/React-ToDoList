import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    function validInputs() {
        return username && password;
    }

    let navigator = useNavigate();

    return (
        <div className="shadow-lg border rounded-lg border-gray-400 py-5 px-8 bg-gray-50 w-[500px] mt-16 ml-auto mr-auto">
            <p className="text-4xl font-semibold mb-4 text-gray-700">Sign In!</p>
            { errorMsg && <p className="text-3xl text-red-800 font-medium mb-2">{errorMsg}</p>}
            <form className="flex flex-col">
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="username">
                    Username 
                </label>
                <input type="text" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="username" 
                    required 
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    />          
  
                <label className="text-[18px] flex flex-row items-center [&>*]:ml-2" htmlFor="password">
                    Password
                </label>
                <input type="password" 
                    className="mb-4 text-[22px] outline-none bg-gray-50 border-b-2 border-gray-800" 
                    id="password" 
                    required 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <input type="submit" 
                    disabled={validInputs() ? false : true} 
                    className={`text-[24px] bg-green-400 rounded-lg text-white w-full h-10 ${validInputs() && 'hover:cursor-pointer'} ${validInputs() ? 'bg-green-400 shadow' : 'bg-gray-400'}`} 
                    value="Sign up!"/> 
            </form>
            <div className="border-b-2 border-black m-4"></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Forgot your password?</p>
                <p className="text-xl text-green-400 hover:cursor-pointer" onClick={() => navigator('../resetpassword')}>Reset Password!</p>
            </div>
            <div className="border-b-2 border-black m-4"></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Don't have an account?</p>
                <p className="text-xl text-green-400 hover:cursor-pointer" onClick={() => navigator('../signup')}>Sign Up!</p>
            </div>
        </div>
    )
}

export default Signin;