import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  ScanFace, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

export default function SignInScreen({ onSignInSuccess }) {
  // Mode: 'employeeId' (Figma Node 2059-2830) | 'email' | 'phone' | 'otp'
  const [authMode, setAuthMode] = useState('employeeId');
  
  // Form states
  const [employeeId, setEmployeeId] = useState('11234');
  const [email, setEmail] = useState('tonald.drump@workmate.com');
  const [phoneNumber, setPhoneNumber] = useState('555-019-2834');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otp, setOtp] = useState(['4', '8', '2', '9']);
  
  // Interactive UI states
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Quick fill helper
  const handleAutofill = (type) => {
    setErrorMessage('');
    if (type === 'employeeId') {
      setAuthMode('employeeId');
      setEmployeeId('11234');
      setPassword('password123');
    } else if (type === 'email') {
      setAuthMode('email');
      setEmail('tonald.drump@workmate.com');
      setPassword('password123');
    } else if (type === 'phone') {
      setAuthMode('phone');
      setPhoneNumber('555-019-2834');
    }
  };

  // Face ID Biometric scan simulation
  const handleBiometricScan = () => {
    setIsScanningBiometric(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsScanningBiometric(false);
      onSignInSuccess({
        id: "11234",
        name: "Tonald Drump",
        role: "Junior Full Stack Developer",
        method: "Biometric Face ID"
      });
    }, 1800);
  };

  // Submit action
  const handleSignIn = (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'employeeId') {
        if (!employeeId.trim()) {
          setErrorMessage('Please enter your Employee ID');
          return;
        }
        onSignInSuccess({
          id: employeeId,
          name: "Tonald Drump",
          role: "Junior Full Stack Developer",
          method: "Employee ID"
        });
      } else if (authMode === 'email') {
        if (!email.trim()) {
          setErrorMessage('Please enter your Email address');
          return;
        }
        onSignInSuccess({
          id: "11234",
          name: "Tonald Drump",
          role: "Junior Full Stack Developer",
          method: "Email Auth"
        });
      } else if (authMode === 'phone') {
        // Switch to OTP view
        setAuthMode('otp');
      } else if (authMode === 'otp') {
        onSignInSuccess({
          id: "11234",
          name: "Tonald Drump",
          role: "Junior Full Stack Developer",
          method: "Phone OTP"
        });
      }
    }, 700);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next field
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between px-6 py-4 bg-[#FCFCFD] text-[#252D3C] overflow-y-auto no-scrollbar relative">
      
      {/* Top Banner / Mode Toggle for easy reviewer switching */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#5D6676] mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBE9FE] text-[#6938EF] font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Figma Node 2059-2830</span>
          </div>
          <button 
            onClick={() => handleAutofill('employeeId')}
            className="text-[11px] font-semibold text-[#6938EF] hover:underline flex items-center gap-1"
          >
            Quick Fill Demo
          </button>
        </div>

        {/* Tab switchers between Figma Sign In variants */}
        <div className="flex p-1 bg-[#F4F3FF] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthMode('employeeId'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              authMode === 'employeeId' 
                ? 'bg-white text-[#6938EF] shadow-sm font-bold' 
                : 'text-[#777F8C] hover:text-[#252D3C]'
            }`}
          >
            Employee ID
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('email'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              authMode === 'email' 
                ? 'bg-white text-[#6938EF] shadow-sm font-bold' 
                : 'text-[#777F8C] hover:text-[#252D3C]'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('phone'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              authMode === 'phone' || authMode === 'otp'
                ? 'bg-white text-[#6938EF] shadow-sm font-bold' 
                : 'text-[#777F8C] hover:text-[#252D3C]'
            }`}
          >
            Phone
          </button>
        </div>
      </div>

      {/* Screen Heading */}
      <div className="mb-6">
        {authMode === 'otp' && (
          <button 
            onClick={() => setAuthMode('phone')}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#6938EF] mb-2 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Phone
          </button>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-[#252D3C]">
          {authMode === 'otp' ? 'Enter Verification Code' : 'Sign In'}
        </h1>
        <p className="text-xs text-[#5D6676] mt-1">
          {authMode === 'otp' 
            ? `We sent a 4-digit code to ${countryCode} ${phoneNumber}`
            : 'Sign in to my account'}
        </p>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-[#FEEEEE] border border-[#FDCACA] rounded-xl text-xs text-[#E34D4D] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E34D4D]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSignIn} className="space-y-4">
        {/* Variant 1: Employee ID (Exact Node 2059-2830 default) */}
        {authMode === 'employeeId' && (
          <>
            <div>
              <label className="block text-xs font-medium text-[#344054] mb-1.5">
                Employee ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="My Employee ID"
                  className="w-full h-12 pl-10 pr-10 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF] transition-all"
                  required
                />
                <button
                  type="button"
                  title="Verified employee badge"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6938EF]"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#344054] mb-1.5">
                Password
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleBiometricScan}
                  title="Scan Face ID"
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6938EF] hover:text-[#5925DC] group"
                >
                  <ScanFace className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="My Password"
                  className="w-full h-12 pl-10 pr-10 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#777F8C] hover:text-[#252D3C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Variant 2: Email Login */}
        {authMode === 'email' && (
          <>
            <div>
              <label className="block text-xs font-medium text-[#344054] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tonald.drump@workmate.com"
                  className="w-full h-12 pl-10 pr-4 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#344054] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="My Password"
                  className="w-full h-12 pl-10 pr-10 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#777F8C] hover:text-[#252D3C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Variant 3: Phone Login */}
        {authMode === 'phone' && (
          <div>
            <label className="block text-xs font-medium text-[#344054] mb-1.5">
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-12 px-3 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF]"
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+62">🇮🇩 +62</option>
                <option value="+65">🇸🇬 +65</option>
              </select>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777F8C]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="555-019-2834"
                  className="w-full h-12 pl-10 pr-4 bg-white border border-[#EBECEE] rounded-xl text-sm text-[#252D3C] placeholder-[#777F8C] focus:outline-none focus:ring-2 focus:ring-[#6938EF]/20 focus:border-[#6938EF] transition-all"
                  required
                />
              </div>
            </div>
            <p className="text-[11px] text-[#5D6676] mt-2">
              We'll send a 4-digit SMS verification code to verify your employee account.
            </p>
          </div>
        )}

        {/* Variant 4: OTP Verification */}
        {authMode === 'otp' && (
          <div className="space-y-4 py-2">
            <div className="flex justify-between gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-14 h-14 text-center text-xl font-bold bg-white border-2 border-[#EBECEE] focus:border-[#6938EF] focus:ring-2 focus:ring-[#6938EF]/20 rounded-xl text-[#252D3C] focus:outline-none transition-all"
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-[#5D6676]">
              <span>Didn't receive code?</span>
              <button 
                type="button" 
                onClick={() => setOtp(['5', '1', '9', '2'])}
                className="text-[#6938EF] font-semibold hover:underline"
              >
                Resend Code (54s)
              </button>
            </div>
          </div>
        )}

        {/* Options Row: Remember Me & Forgot Password (as in Figma) */}
        {authMode !== 'otp' && (
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div 
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  rememberMe 
                    ? 'bg-[#6938EF] border-[#6938EF] text-white' 
                    : 'bg-white border-[#C0C4CA]'
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-[#344054] font-medium">Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => { setForgotModalOpen(true); setResetSuccess(false); }}
              className="text-[#6938EF] font-semibold hover:underline"
            >
              Forgot Password
            </button>
          </div>
        )}

        {/* Primary Action Button: Sign In (Figma Specs: #6938EF, rounded-xl, 48px height) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-2 bg-[#6938EF] hover:bg-[#5925DC] active:scale-[0.99] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#6938EF]/20 transition-all cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{authMode === 'phone' ? 'Get OTP Code' : authMode === 'otp' ? 'Verify & Continue' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Face Scan Biometric Simulation Modal */}
      {isScanningBiometric && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full bg-[#EBE9FE] flex items-center justify-center text-[#6938EF] animate-pulse">
              <ScanFace className="w-12 h-12" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-[#6938EF] border-t-transparent animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-[#252D3C]">Scanning Face ID</h3>
          <p className="text-xs text-[#5D6676] mt-1 max-w-xs">
            Authenticating Employee ID #11234 (Tonald Drump) with biometric sensor...
          </p>
        </div>
      )}

      {/* Alternative Auth Buttons (Figma Specs: Outlined with #D9D6FE, text #6938EF) */}
      {authMode !== 'otp' && (
        <div className="my-5">
          {/* OR Divider */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-[#EBECEE] w-full" />
            <span className="bg-[#FCFCFD] px-3 text-[11px] font-semibold text-[#777F8C] uppercase tracking-wider">
              OR
            </span>
          </div>

          <div className="space-y-2.5">
            {authMode !== 'email' && (
              <button
                type="button"
                onClick={() => { setAuthMode('email'); setErrorMessage(''); }}
                className="w-full h-12 bg-white hover:bg-[#F4F3FF] border border-[#D9D6FE] text-[#6938EF] rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Sign In With Email</span>
              </button>
            )}

            {authMode !== 'phone' && (
              <button
                type="button"
                onClick={() => { setAuthMode('phone'); setErrorMessage(''); }}
                className="w-full h-12 bg-white hover:bg-[#F4F3FF] border border-[#D9D6FE] text-[#6938EF] rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Sign In With Phone</span>
              </button>
            )}

            {authMode !== 'employeeId' && (
              <button
                type="button"
                onClick={() => { setAuthMode('employeeId'); setErrorMessage(''); }}
                className="w-full h-12 bg-white hover:bg-[#F4F3FF] border border-[#D9D6FE] text-[#6938EF] rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In With Employee ID</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div className="text-center text-xs text-[#5D6676] pt-2">
        <span>Don't have an account? </span>
        <button
          type="button"
          onClick={() => setSignUpModalOpen(true)}
          className="text-[#6938EF] font-bold hover:underline cursor-pointer"
        >
          Sign Up Here
        </button>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-left">
            <h3 className="text-base font-bold text-[#252D3C]">Reset Password</h3>
            <p className="text-xs text-[#5D6676] mt-1">
              Enter your work email to receive password reset instructions.
            </p>
            {resetSuccess ? (
              <div className="mt-4 p-3 bg-[#E8F7F1] text-[#17A364] rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Reset link sent to tonald.drump@workmate.com</span>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <input
                  type="email"
                  defaultValue="tonald.drump@workmate.com"
                  className="w-full h-11 px-3 border border-[#EBECEE] rounded-xl text-xs text-[#252D3C]"
                  placeholder="Enter email"
                />
                <button
                  type="button"
                  onClick={() => setResetSuccess(true)}
                  className="w-full h-11 bg-[#6938EF] text-white rounded-xl text-xs font-semibold"
                >
                  Send Reset Link
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full mt-3 text-xs text-[#777F8C] font-medium py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {signUpModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-left">
            <h3 className="text-base font-bold text-[#252D3C]">Create Workmate Account</h3>
            <p className="text-xs text-[#5D6676] mt-1">
              Contact your HR administrator or submit your employee onboard request.
            </p>
            <div className="mt-4 space-y-2.5 text-xs">
              <input
                type="text"
                placeholder="Full Name (e.g. Tonald Drump)"
                className="w-full h-11 px-3 border border-[#EBECEE] rounded-xl"
              />
              <input
                type="email"
                placeholder="Corporate Email"
                className="w-full h-11 px-3 border border-[#EBECEE] rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setSignUpModalOpen(false);
                  handleAutofill('employeeId');
                }}
                className="w-full h-11 bg-[#6938EF] text-white rounded-xl font-semibold mt-2"
              >
                Register Employee Account
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSignUpModalOpen(false)}
              className="w-full mt-3 text-xs text-[#777F8C] font-medium py-1"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
