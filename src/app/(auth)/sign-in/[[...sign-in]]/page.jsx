import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sign-in">

        <SignIn path="/sign-in" />
        {/* Optional: Add additional custom styling or elements */}
      </div>
   
  );
}