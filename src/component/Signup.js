import "./signup.css"
import "./global.css"
import { useState } from "react";
import { validateEmail, validateName } from "../validation";
import { useNavigate } from "react-router-dom";






function Signup(props)


{  
    const [signupData,setsignupData]=useState(
    {name:"",
    email:"",
    password:"",
    phoneNumber:"",
    gender:"",
    dateOfBirth:"",
    address:{
        street:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    }
    
    })


    const [formError,setFormError]=useState({name:"",email:"",password:""})
    const navigate = useNavigate()
      


     async  function submitHandler(event)

        {   
        event.preventDefault();

            let hasError = false;
            const errors = {name:"",email:"",password:""};

            
            const nameErr = validateName(signupData.name);
            if (nameErr) {
                   errors.name = nameErr;
                   hasError = true;
                        }



          const emailErr = validateEmail(signupData.email);
            if (emailErr) {
                           errors.email = emailErr;
                           hasError = true;
                          }



           if (!signupData.password) {
                                    errors.password = "Password is required";
                                    hasError = true;
                                    } else if (signupData.password.length < 6) {
                                       errors.password = "Password must be at least 6 characters";
                                        hasError = true;
                                             }

            setFormError(errors);

           if (hasError) {
            return;
           }

           
          

           const result = await props.signup(signupData)
           if(!result.success)
             {
                console.log("iner if ")
                console.log(result.message)
                setFormError({ name: "",email:result.message, password: ""});
             }

            if(result && result.success)
           {  await props.login({email:signupData.email,password:signupData.password})

           }
             
         }

        
  
         


       function changeHandler(event) {
    const { name, value } = event.target;

    // Check agar input address field ka hai (ex: address.city)
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; // gets 'city', 'state' etc.
      setsignupData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value
        }
      }));
    } else {
      // Regular fields ke liye
      setsignupData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  }



         if (props.loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

    return (
        <div className="signup-form-container">

            <h2> Signup </h2>
            <form className="signupform" onSubmit={submitHandler} >



              <div className="form-left">


                <div className="input-container">
                     <h3 className="form-section">Signup info</h3>
                     <label htmlFor="username" className="form-label">Name <sup>*</sup></label>
                     <input className={`form-input ${formError.name ? "error" : ""}`}
                            type="text"  
                            name="name" 
                            id="username" 
                            onChange={changeHandler} 
                            value={signupData.name}></input>

                     {formError.name && ( <span className="error-text">{formError.name}</span>)}
                 </div>

                 <div className="input-container">
                    <label htmlFor="useremail" className="form-label">Email <sup>*</sup></label>
                     <input className={`form-input ${formError.email ? "error" : ""}`}
                            type="text"  
                            name="email" 
                            inputMode="email"       
                            autoComplete="email"
                            id="useremail"  
                            onChange={changeHandler} 
                            value={signupData.email}></input>
                     {formError.email && (  <span className="error-text">{formError.email}</span>)} 
                 </div>

                 <div className="input-container"> 

                     <label htmlFor="userpassword" className="form-label">Password <sup>*</sup></label>
                     <input className={`form-input ${formError.password ? "error" : ""}`}
                            type="password" 
                            name="password"
                            id="userpassword" 
                            onChange={changeHandler} 
                            value={signupData.password}></input>

                     {formError.password && (  <span className="error-text">{formError.password}</span>)}          
                </div>
              
              </div>


              <div className="form-right">

                     <h3 className="form-section">Basic info</h3>
                     <label htmlFor="number" className="form-label">Contact Number</label>
                     <input type="text"
                            inputMode="nummeric"
                            name="phoneNumber"
                            id="number"
                            className="form-input"
                            placeholder="Number"
                            onChange={changeHandler}
                            value={signupData.phoneNumber}
                     ></input>

                     <p className="form-label">Gender</p>
                     <div className="gender-section">
                            <label htmlFor="male" className="form-label">MALE</label>
                            <input type="radio"
                                   name="gender"
                                   value="male"
                                   onChange={changeHandler}
                                   
                            ></input>

                            <label htmlFor="female" className="form-label">FEMALE</label>
                            <input type="radio" 
                                   name="gender"
                                   value="female"
                                   onChange={changeHandler}
                            ></input>
                            <label htmlFor="other" className="form-label">OTHER</label>
                            <input type="radio" 
                                   name="gender"
                                   value="other"
                                   onChange={changeHandler}
                            ></input>
                            
                      </div>

                     <label htmlFor="dob" className="form-label">Date Of Birth</label>
                     <input type="date"
                            className="form-date-input"
                            name="dateOfBirth"
                            onChange={changeHandler}
                            value={signupData.dateOfBirth}
                            

                     ></input>

                     <h3 className="form-section">Address</h3>
                     <label htmlFor="streetid" className="form-label">street</label>

                     <input type="text" 
                            name="address.street"
                            id="streetid"
                            className="form-input"
                            placeholder="street"
                            onChange={changeHandler}
                            value={signupData.address.street}
                     ></input>

                     <div className="address-basic">

                            <div className="address-left">
                                   <label htmlFor="countryid" className="form-label">Country</label>
                                   <input type="text"
                                          name="address.country"
                                          className="form-input"
                                          id="countryid"
                                          placeholder="country"
                                          onChange={changeHandler}
                                          value={signupData.address.country}
                                   ></input>
                                   <label htmlFor="stateid" className="form-label">State</label>
                                   <input type="text" 
                                          name="address.state"
                                          className="form-input"
                                          id="stateid"
                                          placeholder="state"
                                          onChange={changeHandler}
                                          value={signupData.address.state}

                                   ></input>

                            </div>


                            <div className="address-right">
                                   <label htmlFor="cityid" className="form-label">City</label>
                                   <input type="text" 
                                          name="address.city"
                                          className="form-input"
                                          id="cityid"
                                          placeholder="city"
                                          onChange={changeHandler}
                                          value={signupData.address.city}

                                   ></input>

                                   <label htmlFor="pincodeid" className="form-label">Pincode</label>
                                   <input type="text" 
                                          name="address.pincode"
                                          className="form-input"
                                          id="pincodeid"
                                          placeholder="pincode"
                                          onChange={changeHandler}
                                          value={signupData.address.pincode}
                                   ></input>
                                   
                            
                     

                     </div>

                            
                     </div>


                     


                     

                     
                     
                     
              </div>
            
            <div className="button-container">
              <button className=" button" type="submit" > Signup</button>
              <button className=" button" 
                      type="button" 
                      onClick={(event)=>
                      {event.preventDefault();
                       navigate("/login");
                       }} > Go To Login
              </button>

            </div>
            
                
            </form>

             
        </div>
    )

}

export default Signup;





// note- ye jo on  type email required true ye sab tabhi kam karta hai jab form 
// pe on submit lga ho 
// agar button me on submit lgaeenge to kam nhi karega 

// koi v form submit karenge to url pe data show karta hai whi show na kare 
// isilie event.preventDefault lgaya hai isse url me data show nhi karta 