import { SignIn } from "@stackframe/stack";
export const metadata = {
  title: 'Sign In',
  description: 'Log in to your account to access your inventory control panel and settings.'
}

export default function SignInPage() {
    return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
        <div className="max-w-md w-full space-y-6">
            <SignIn />
        </div>
    </div>
}