import { useState } from "react";

function RegisterPage({onRegisterSuccess,onLoginClick}){
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        country: '',
        terms: false,
        bio: ''
    });

    const [errors,setErrors] = useState({});

    const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if(!formData.name) newErrors.name = "Name is required";
        if(!formData.email || !validateEmail(formData.email)) newErrors.email = "Email is Invalid";
        if(!formData.password || !validatePassword(formData.password)) newErrors.password = "Password is Invalid";
        if(!formData.gender) newErrors.gender = "Select a Gender";
        if(!formData.country) newErrors.country = "Select a Country";
        if(!formData.terms) newErrors.terms = "You must accept Terms";

        setErrors(newErrors);

        if(Object.keys(newErrors).length === 0){
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = existingUsers.find((user)=>user.email===formData.email);
            if(userExists){
                alert('User with this email already exists')
                return;
            }
            const updatedUsers = [...existingUsers,formData];
            localStorage.setItem('users',JSON.stringify(updatedUsers));

            onRegisterSuccess();
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <div>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange}/>
                {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleChange}/>
                {errors.mail && <p>{errors.mail}</p>}
            </div>

            <div>
                <label>Password:</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange}/>
                {errors.password && <p>{errors.password}</p>}
            </div>

            <div>
                <label>Gender:</label>
                <input type="radio" name="gender" value="male" onChange={handleChange}/> Male
                <input type="radio" name="gender" value="female" onChange={handleChange}/> Female
                {errors.gender && <p>{errors.gender}</p>}
            </div>

            <div>
                <label>Country:</label>
                <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="">--Select--</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
                {errors.country && <p>{errors.country}</p>}
            </div>

            <div>
                <label>Accept Terms:</label>
                <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange}/>
                {errors.terms && <p>{errors.terms}</p>}
            </div>

            <div>
                <label>Bio:</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={6} cols={6}></textarea>
            </div>

            <button type="submit">Register</button>

            <p>
                Already have an Account?{' '}
                <button type="button" onClick={onLoginClick}>
                    Login Here
                </button>
            </p>
        </form>
    );
}
export default RegisterPage;