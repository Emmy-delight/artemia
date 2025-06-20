  "use client"
import { db } from "@/config/firebase.config";
import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import * as yup from "yup";


const schema = yup.object().shape({
    productname: yup.string().required("product name is required").min(8),
    description :yup.string().required("description is required ").min(10),
    price: yup.number().required("price is required").positive("price must be positive"),
})
export default function AddProduct ({userId}) {
 const {data : session} = useSession();
 console.log(session)
 const userIdentifier = userId || (session?.user?.id);

 const {handleSubmit,handleChange,touched,values,errors} = useFormik({
  initialValues: {
    productname:"",
    description:"",
    price:""
  },
   onSubmit:async () => {
     await addDoc(collection(db,"products"),{
         user: userIdentifier,
         productname :values.productname,
         description : values.description,
         price: values.price,
         timecreated: new Date().getTime(),
     }).then(()=> {
        alert("You have added a product")
     })
     .catch(e => {
        console.error(e);
        alert("You encountered an unknown error")
     });
   },
  validationSchema: schema,
})

    return (
        <Card sx={{ maxWidth: 500, margin:"auto", mt:5, p:2}}>
            <CardHeader title="Add products" />
            <CardContent>
                <form onSubmit={handleSubmit} 
                className="flex flex-col gap-4">
                    <div>
                    <TextField
                    fullWidth
                    type="text"
                    label="product name"
                    id="productname"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    value={values.productname} />
                    {touched.productname && errors.productname ? <span className="text-red-600">{errors.productname}</span>:null}
                    </div>
                     <div>
                    <TextField 
                    fullWidth
                    multiline
                    rows= {3}
                    type="text"
                    label="Description"
                    id="description"
                    placeholder="Enter product description"
                    onChange={handleChange}
                    value={values.description}/>
                    {touched.description && errors.description ? <span className="text-red-600">{errors.description}</span>:null}
                    </div>
                    <div>
                    <TextField
                    fullWidth
                    type="number"
                    label="price"
                    id="price"
                    placeholder="Enter Price"
                    onChange={handleChange}
                    value={values.price}/>
                    {touched.price && errors.price ? <span className="text-red-600">{errors.price}</span>:null}
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth >Add Product</Button>
                </form>
            </CardContent>
        </Card>
    )
}