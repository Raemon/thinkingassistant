'use client';

import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

// export default function LoginButton() {
//   const { data: session } = useSession();

//   if (session) {
//     return (
//       <div>
//         Signed in as {session.user?.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }
//   return (
//     <button onClick={() => signIn('google')}>
//       Sign in with Google
//     </button>
//   );
// }


export default function LoginButton() {
    return (
    <button onClick={() => signIn('google')}>
      Sign in with Google
    </button>
    );
}
