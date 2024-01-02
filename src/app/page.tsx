'use client'
import { signOut,useSession } from "next-auth/react";
import Link from "next/link";


export default  function Home() {

  const { data: session } = useSession();


  return (
    <div className="container mx-auto">
    {session ? User({session}) : Guest()}
  </div>
  )
}


// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={"/login"}>
          <button className="mt-5 px-10 py-1 rounded-sm bg-black text-white">
            Sign In
          </button>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({session}:any) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button className="mt-5 px-10 py-1 rounded-sm bg-black text-white" onClick={()=>signOut()}>
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"}>
          <button className="mt-5 px-10 py-1 rounded-sm bg-black text-white">
            Profile Page
          </button>
        </Link>
      </div>
    </main>
  );
}
