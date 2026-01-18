import React,{useState,useEffect} from 'react'
import { useLoaderData } from 'react-router-dom';

function Github() {

    //way to fetch data inside component without loader function
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //         fetch('https://api.github.com/users/octocat')
    //             .then(response => response.json())
    //             .then(data => setData(data))
    //             .catch(error => console.error('Error fetching GitHub data:', error));
    //     },[])
    
    const data = useLoaderData();
    return (

        <div className='bg-gray-500 text-3xl text-white text-center p-4 mx-2'>Github Followers : {data.followers}
            <img src={data.avatar_url} alt={data.name}  width={400}/>
        </div>
    )
}

export default Github

export const GithubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/octocat')
    return response.json()
}