import { auth } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import Products from "./products";


export default async function page () {
      const session = await auth();
      return(
        <>
        <AuthorizationCheck/>
        <Products userId={session?.user?.id} />
        </>
 )
}