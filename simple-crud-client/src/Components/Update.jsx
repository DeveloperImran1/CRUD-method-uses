import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loaderData = useLoaderData();
    const handleDelete = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updatedUser = {name, email};

        fetch(`http://localhost:5000/users/${loaderData._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body:  JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount > 0){
                alert('Update successfully')
            }
        })
    }

    return (
        <div>
            <h3>Update Information of {loaderData.name} </h3>
            <form onSubmit={handleDelete}> 
                <input type="text" name="name" defaultValue={loaderData.name} />
                <br />
                <input type="email" name="email" defaultValue={loaderData.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;