import BtnBasic from "@/components/btn/btnBasic.component";
import Image from "next/image";

export default function Home() {
  return (
    <div 
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center shadow-md w-full max-w-md ">
          <BtnBasic url={"auth/login"} color={""} name={"Login"} padding={"1.5"} more="me-3"  />
          <BtnBasic url={"auth/register"} color={""} name={"Register"} padding={"1.5"}  />
        </div>
      </div>
    </div>
  );
}
