import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const { updateUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.target)

    const username = formData.get("username")
    const password = formData.get("password")

    console.log(username, password)

    try {
      const res = await apiRequest.post("/auth/login", {
        username, password
      })

      // localStorage.setItem("user", JSON.stringify(res.data))
      updateUser(res.data)
      
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
