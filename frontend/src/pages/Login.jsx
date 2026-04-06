import { useState } from "react";

function Login() {
  // ✅ STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Sending:", email, password);

    try {
      const res = await fetch("https://ankaa-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (res.ok && data.token) {
        // ✅ STORE AUTH
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", "true");

        // ✅ REDIRECT
        window.location.href = "/admin";
      } else {
        alert(data.msg || "Login failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-3xl mb-6">Admin Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 bg-black border"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 bg-black border"
      />

      <button
        onClick={handleLogin}
        className="border px-6 py-2"
      >
        Login
      </button>

    </div>
  );
}

export default Login;