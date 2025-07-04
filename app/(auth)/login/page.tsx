import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleSignIn from "@/components/GoogleSignIn";
import Link from "next/link";

const page = () => {
    return (
        <div className={'auth-card !max-w-2xl lg:max-h-2/3 lg:rounded-3xl'}>
            <form className={'login-form'}>
                <Image src={"/images/logo.svg"} alt={"Logo"} height={50} width={50}/>
                <h3>Login to spotify</h3>

                <GoogleSignIn/>

                <div className={'input-group'}>
                    <Label htmlFor={"email"}>
                        Email address
                    </Label>
                    <Input
                        id={"email"}
                        name={"email"}
                        type={"email"}
                        placeholder={"name@domain.com"}
                    />
                </div>

                <Button
                    type={"submit"}
                    className={'rounded-full w-full !py-6'}
                >
                    Login
                </Button>

                <div className={'flex-between w-full mt-5'}>
                    <span className={'text-xs text-zinc-400'}>Don't have an account?</span>
                    <Link href={"/signup"} className={'underline'}>signup</Link>
                </div>
            </form>
        </div>
    )
};

export default page;