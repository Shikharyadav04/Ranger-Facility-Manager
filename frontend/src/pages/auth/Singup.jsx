import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import toast from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [countryCode, setCountryCode] = useState("+91");


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/ranger/register`,
                {
                    fullName,
                    email,
                    phoneNumber: countryCode + phoneNumber,
                    location,
                    password,
                }
            );

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);

                toast.success(`Account created! Welcome, ${user.fullName}! 🎉`);
                navigate('/ranger/dashboard');
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                "Signup failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-teal-600 to-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-teal-700">
                        Create Ranger Account
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Register to raise facility complaints
                    </p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Name"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>

                        <div className="flex gap-2">
                            {/* Country Code Dropdown */}
                            <select
                                className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50
                 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => setCountryCode(e.target.value)}
                                defaultValue="+91"
                                required
                            >
                                <option value="+1">🇺🇸 +1 (USA)</option>
                                <option value="+44">🇬🇧 +44 (UK)</option>
                                <option value="+61">🇦🇺 +61 (Australia)</option>
                                <option value="+65">🇸🇬 +65 (Singapore)</option>
                                <option value="+971">🇦🇪 +971 (UAE)</option>
                                <option value="+91">🇮🇳 +91 (India)</option>
                                <option value="+92">🇵🇰 +92 (Pakistan)</option>
                                <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
                                <option value="+880">🇧🇩 +880 (Bangladesh)</option>
                                <option value="+975">🇧🇹 +975 (Bhutan)</option>
                            </select>

                            {/* Phone Number Input */}
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="9876543210"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // allowing only digits and max length 10
                                    if (/^\d{0,10}$/.test(value)) {
                                        setPhoneNumber(value);
                                    }
                                }}
                                required
                            />

                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location / Building
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Building A, Floor 2"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="••••••••"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md 
                       transition duration-200 shadow"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                {/* Login link */}
                <div className="text-center text-sm text-gray-700 pt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-600 font-medium hover:underline">
                        Login here
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Signup;
