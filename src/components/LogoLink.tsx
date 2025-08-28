import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FiLogIn } from "react-icons/fi";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
export function LogoLink() {
  return (
    <Link href="/">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.jpg"
          width={580}
          height={386}
          alt=""
          className="w-10 h-10 rounded-2xl sm:w-12 sm:h-12"
        />

        <div className="font-medium sm:text-2xl dark:text-white">
          <div>Muhasip</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Modüler Bilgi İşlem Sistemi
          </div>
        </div>
      </div>
    </Link>
  );
}
export function UserLink() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn)
    return (
      <SignOutButton>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="font-medium text-red-600 sm:text-1xl dark:text-white">
            Sign Out
            <div className=" text-sm text-gray-500 dark:text-gray-400">
              {user.fullName}
            </div>
          </div>
          <div className="justify-center">
            <Image
              src={user.imageUrl}
              width={580}
              height={386}
              alt=""
              className="w-10 h-10 rounded-2xl sm:w-12 sm:h-12 "
            />
          </div>
        </div>
      </SignOutButton>
    );
  return (
    <SignInButton>
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="font-medium text-green-600 sm:text-1xl dark:text-white">
          Sign In
          <div className=" text-sm text-gray-500 dark:text-gray-400">{""}</div>
        </div>
        <div className="justify-center">
          <FiLogIn
            size={40}
            className="w-10 h-10 rounded-2xl sm:w-12 sm:h-12 "
          />
        </div>
      </div>
    </SignInButton>
  );
}
