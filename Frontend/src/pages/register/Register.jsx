import "./Register.css";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleCreateAcount = (e) => {
    e.preventDefault();

    const user = { username: username, password: password };

    const postAcount = () => {
      fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status === 200) {
            navigate("/login");
          } else {
            alert("Username already existed");
          }
        })
        .catch((err) => console.log(err));
    };

    postAcount();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Sign Up</h1>
        <form action="" className="container">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => handleCreateAcount(e)}>Create Acount</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
