"use client";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignIn from "@/components/GoogleSignIn";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {getUserByEmail, updateUserDetails} from "@/lib/actions";
import {useRouter} from "next/navigation";
import {MONTHS , DAYS , YEARS} from "@/constants"; 


const page = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        name: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
        marketingEmails: false,
        dataSharing: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 10;

        return {
            hasLetter,
            hasNumberOrSpecial,
            hasMinLength,
            isValid: hasLetter && hasNumberOrSpecial && hasMinLength
        };
    };

    const validateStep = () => {
        const newErrors: Partial<SignupFormData> = {};

        switch (step) {
            case 1:
                if (!formData.email) {
                    newErrors.email = 'Email is required';
                } else if (!validateEmail(formData.email)) {
                    newErrors.email = 'Please enter a valid email address';
                }
                break;
            case 2:
                const passwordValidation = validatePassword(formData.password);
                if (!formData.password) {
                    newErrors.password = 'Password is required';
                } else if (!passwordValidation.isValid) {
                    newErrors.password = 'Password does not meet requirements';
                }
                break;
            case 3:
                if (!formData.name.trim()) {
                    newErrors.name = 'Name is required';
                }
                if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
                    newErrors.birthYear = 'Date of birth is required';
                }
                if (!formData.gender) {
                    newErrors.gender = 'Please select a gender';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrors({});
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsLoading(true);
        try {
            const birthDate = new Date(
                parseInt(formData.birthYear),
                MONTHS.indexOf(formData.birthMonth),
                parseInt(formData.birthDay)
            );

            console.log("sign up starte");
            const result = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
            });
            console.log("sign up ended");
            
            if(result.data?.user){
                console.log("updating user details");
                await updateUserDetails(result.data?.user.id , {
                    gender : formData.gender,
                    dateOfBirth : birthDate,
                    dataSharing : formData.dataSharing,
                    marketingEmails : formData.marketingEmails,
                });
                
                console.log("redirectling");
                router.push("/");
            }else {

            }


            // Handle successful signup
            console.log('Signup successful!');

        } catch (error) {
            console.error('Signup failed:', error);
            // Handle error (show error message to user)
        } finally {
            setIsLoading(false);
        }
    };

    const updateFormData = (field: keyof SignupFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const checkEmailExitsAndNext = async () => {
        if (!validateStep()) return;
        const emailExists = await getUserByEmail(formData.email);

        if(!emailExists){
            handleNext();
        }else{
            setErrors({
                email: "Email already exists"
            })
        }
    }


    const passwordValidation = validatePassword(formData.password);

    return (
        <div className={'auth-card'}>
            <form className={'signup-form'} onSubmit={(e) => e.preventDefault()}>
                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                        <Image src={"/images/logo.svg"} alt={"Logo"} height={50} width={50}/>
                    </div>

                    {/* Progress indicator */}
                    {step > 1 && (
                        <div className="mb-8 w-full">
                            <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 hover:text-white transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>

                                <span className="ml-auto">Step {step} of 4</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-1">
                                <div
                                    className="bg-green-500 h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${(step / 4) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <>
                            <h2 className="text-center mb-8">Sign up to start listening</h2>

                            <div className={'input-group'}>
                                <Label htmlFor={"email"}>Email address</Label>
                                <Input
                                    id={"email"}
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"name@domain.com"}
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email}</span>
                                )}
                            </div>

                            <Button
                                type={"button"}
                                onClick={checkEmailExitsAndNext}
                                className={'rounded-full w-full !py-6 bg-green-500 hover:bg-green-600'}
                            >
                                Next
                            </Button>

                            <div className={'flex-center gap-5 w-full'}>
                                <hr />
                                <span>or</span>
                                <hr/>
                            </div>

                            <GoogleSignIn/>

                            <div className={'flex-between w-full mt-5'}>
                                <span className={'text-xs text-zinc-400'}>Already have an account?</span>
                                <Link href={"/login"} className={'underline text-green-500'}>Log in here</Link>
                            </div>
                        </>
                    )}

                    {/* Step 2: Password */}
                    {step === 2 && (
                        <>
                            <h3 className="text-center mb-8">Create a password</h3>

                            <div className={'input-group'}>
                                <Label htmlFor={"password"}>Password</Label>
                                <div className="relative">
                                    <Input
                                        id={"password"}
                                        name={"password"}
                                        type={showPassword ? "text" : "password"}
                                        placeholder={"••••••••••"}
                                        value={formData.password}
                                        onChange={(e) => updateFormData('password', e.target.value)}
                                        className={errors.password ? 'border-red-500' : ''}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-sm text-zinc-400 mb-6">
                                <p className="mb-2">Your password must contain at least</p>
                                <div className="space-y-1">
                                    <div className={`flex items-center gap-2 ${passwordValidation.hasLetter ? 'text-green-500' : 'text-zinc-400'}`}>
                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                        1 letter
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordValidation.hasNumberOrSpecial ? 'text-green-500' : 'text-zinc-400'}`}>
                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                        1 number or special character (example: # ? ! &)
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-zinc-400'}`}>
                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                        10 characters
                                    </div>
                                </div>
                            </div>

                            <Button
                                type={"button"}
                                onClick={handleNext}
                                className={'rounded-full w-full !py-6 bg-green-500 hover:bg-green-600'}
                                disabled={!passwordValidation.isValid}
                            >
                                Next
                            </Button>
                        </>
                    )}

                    {/* Step 3: Personal Info */}
                    {step === 3 && (
                        <>
                            <h2 className="text-center mb-8">Tell us about yourself</h2>

                            <div className={'input-group'}>
                                <Label htmlFor={"name"}>Name</Label>
                                <p className="text-sm text-zinc-400 mb-2">This name will appear on your profile</p>
                                <Input
                                    id={"name"}
                                    name={"name"}
                                    type={"text"}
                                    placeholder={"Enter your name"}
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name}</span>
                                )}
                            </div>

                            <div className={'input-group'}>
                                <Label>Date of birth</Label>
                                <p className="text-sm text-zinc-400 mb-2">
                                    Why do we need your date of birth? <Link href="#" className="text-green-500 underline">Learn more</Link>
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <Input
                                        type="number"
                                        placeholder="2006"
                                        value={formData.birthYear}
                                        onChange={(e) => updateFormData('birthYear', e.target.value)}
                                        className={errors.birthYear ? 'border-red-500' : ''}
                                    />
                                    <select
                                        value={formData.birthMonth}
                                        onChange={(e) => updateFormData('birthMonth', e.target.value)}
                                        className="px-4 py-6 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Month</option>
                                        {MONTHS.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={formData.birthDay}
                                        onChange={(e) => updateFormData('birthDay', e.target.value)}
                                        className="px-4 py-6 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Day</option>
                                        {DAYS.map(day => (
                                            <option key={day} value={day.toString()}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.birthYear && (
                                    <span className="text-red-500 text-sm">{errors.birthYear}</span>
                                )}
                            </div>

                            <div className={'input-group'}>
                                <Label>Gender</Label>
                                <p className="text-sm text-zinc-400 mb-4">
                                    We use your gender to help personalise our content recommendations and ads for you.
                                </p>
                                <div className="space-y-3">
                                    {['Man', 'Woman', 'Non-binary', 'Something else', 'Prefer not to say'].map((option) => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option}
                                                checked={formData.gender === option}
                                                onChange={(e) => updateFormData('gender', e.target.value)}
                                                className="w-4 h-4 text-green-500 border-zinc-600 focus:ring-green-500"
                                            />
                                            <span className="text-white">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && (
                                    <span className="text-red-500 text-sm">{errors.gender}</span>
                                )}
                            </div>

                            <Button
                                type={"button"}
                                onClick={handleNext}
                                className={'rounded-full w-full !py-6 bg-green-500 hover:bg-green-600'}
                            >
                                Next
                            </Button>
                        </>
                    )}

                    {/* Step 4: Terms & Conditions */}
                    {step === 4 && (
                        <>
                            <h2 className="text-center mb-8">Terms & Conditions</h2>

                            <div className="space-y-6">
                                <label className="flex items-start gap-3 cursor-pointer p-4 bg-zinc-800 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={formData.marketingEmails}
                                        onChange={(e) => updateFormData('marketingEmails', e.target.checked)}
                                        className="w-5 h-5 text-green-500 border-zinc-600 focus:ring-green-500 mt-1"
                                    />
                                    <span className="text-white text-sm">
                                    I would prefer not to receive marketing messages from Spotify
                                  </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer p-4 bg-zinc-800 rounded-lg">
                                    <input
                                        type="checkbox"
                                        checked={formData.dataSharing}
                                        onChange={(e) => updateFormData('dataSharing', e.target.checked)}
                                        className="w-5 h-5 text-green-500 border-zinc-600 focus:ring-green-500 mt-1"
                                    />
                                    <span className="text-white text-sm">
                                        Share my registration data with Spotify's content providers for marketing purposes.
                                    </span>
                                </label>
                            </div>

                            <div className="text-sm text-zinc-400 mt-6 mb-6">
                                <p>
                                    By clicking on 'Sign up', you agree to Spotify's{' '}
                                    <Link href="#" className="text-green-500 underline">
                                        Terms and Conditions of Use
                                    </Link>
                                    .
                                </p>
                                <p className="mt-2">
                                    To learn more about how Spotify collects, uses, shares and protects your personal data, please see{' '}
                                    <Link href="#" className="text-green-500 underline">
                                        Spotify's Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>

                            <Button
                                type={"button"}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={'rounded-full w-full !py-6 bg-green-500 hover:bg-green-600 disabled:opacity-50'}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </>
                    )}
            </form>
        </div>
    );
};

export default page;