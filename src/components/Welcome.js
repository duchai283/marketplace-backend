import React from 'react'

export const Welcome = () => {
    const [user,setUser] = React.useState(null);
    
    React.useEffect(async ()=>{
        const res = await fetch('http://localhost:8080/city/getAll')
        const user = await res.json();
        console.log(user);
        setUser(user)
    },[])


    return (
        user ? (<div>
            <h1>Test Connect Data With JAVA server</h1>
            <p>Id:{user.id} </p> 
            <p>Name: {user.title}</p>
        </div>): <div><h1>Đéo có con mẹ gì, fail rồi </h1></div>
    )
}
