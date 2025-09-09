"use client";

import { useMutation, useQuery, Authenticated, Unauthenticated } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const add = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello World</h1>
            <p>/web</p>
            <UserButton />
            <Button onClick={() => add()}>Add Dubey</Button>
            {JSON.stringify(users)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-svh">
          <p>Please sign in to continue</p>
          <SignInButton>Sign In</SignInButton>
        </div>
      </Unauthenticated>
    </>
  )
}
