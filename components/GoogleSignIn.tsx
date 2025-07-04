"use client";

import Image from "next/image";
import {authClient} from "@/lib/auth-client";
import {auth} from "@/lib/auth";

const GoogleSignIn = () => {

    const handleSignIn = async () => {
        return await authClient.signIn.social({provider : "google"});
    };

    return (
        <button
            type="button"
            className="social-btn-google"
            onClick={handleSignIn}
        >
          <span className="w-5 h-5">
            <Image src={"/images/google.svg"} alt={"google"} height={20} width={20} />
          </span>
            <span className="font-bold">Sign in with Google</span>
        </button>
    )
};

export default GoogleSignIn;