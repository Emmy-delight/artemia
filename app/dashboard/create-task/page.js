   "use client"
import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required("Title is required").min(5),
    description: yup.string().required("description is required").min(10)
})

export default function CreateTask () {
     const {handleSubmit,handleChange,touched,values,errors} = useFormik({
        initialValues: {
            title: "",
            description:""
        },
        onSubmit: () => {},
        validationSchema: schema,
     })
    return (
        <Card sx={{maxWidth: 500, margin: "auto", mt: 5, p:3}}>
            <CardHeader title="Add Task"/>
            <CardContent>
                <form onSubmit={handleSubmit}
                 className="flex flex-col gap-4">
                  <div>
                  <TextField 
                  fullWidth
                  label="Title"
                  type="text"
                  id="title"
                  placeholder="Enter Task Title"
                  onChange={handleChange}
                  value={values.title}/>
                  {touched.title && errors.title ? <span className="text-red-600 text-sm">{errors.title}</span>:null}
                  </div>
                  <div>
                 <TextField 
                 fullWidth
                 multiline
                 rows={3}
                  label="Description"
                  type="text"
                  id="description"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  value={values.description}/>
                   {touched.description && errors.description ? <span className="text-red-600 text-sm">{errors.description}</span>:null}
                  </div>
                  <Button variant="contained" type="submit" color="primary">Submit Task</Button>
                </form>
            </CardContent>
        </Card>
    )
}