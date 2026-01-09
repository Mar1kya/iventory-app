import { SignUp } from "@stackframe/stack";
export const metadata = {
    title: 'Sign Up',
    description: 'Create a free account to start managing your inventory. Signing up takes less than a minute.'
}

export default function SignUpPage() {
    return <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
        <div className="max-w-md w-full space-y-6">
            <SignUp />
        </div>
    </div>

}