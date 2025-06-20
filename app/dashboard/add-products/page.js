import { auth } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import AddProduct from "./add-product";

export default async function page () {
      const session = await auth();
      return(
        <>
        <AuthorizationCheck/>
        <AddProduct  userId={session?.user?.id} />
        </>
 )
}