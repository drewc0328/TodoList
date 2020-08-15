import React, {useState, useEffect} from 'react'

const Home = (props) => {

    const [tasks, setTasks] = useState("");
    const [completeRequest, setCompleteRequest] = useState(false);

    const deleteTask = async (taskID) => {
        console.log(tasks)
        let response;
        try {
            response = await fetch("http://localhost:5000/api/users/deleteTask", {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: props.userID,
                    tid: taskID
                })
            })
            const responseData = await response.json();
            console.log(responseData);
            setTasks(responseData.tasks);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getUser = async () => {
           let response;
            try {
                response = await fetch(`http://localhost:5000/api/users/getUser/${props.userID}`);
                const responseData = await response.json();

                if (!response.ok) {
                    console.log(responseData.message);
                }

                console.log(responseData);
                console.log(responseData.user.tasks);
                
                setTasks(responseData.user.tasks)
                setCompleteRequest(true);                

            } catch (err) {
                console.log(err);
            } 
        };
        getUser();        
    }, [])

    if (completeRequest) {
        return (
            <div>
                {tasks.map(task => 
                    (
                        <div>
                            <li>
                                {task.title}
                                <button onClick={deleteTask.bind(null, task._id)}>Delete</button>
                            </li>
                            <div>
                                {task.content}
                            </div>
                        </div>
                    )
                )}
                <div>
                    <button>Add Task</button>
                </div>
            </div>
        )
    } else {
        return(
            <div>
                <h3>Loading Requests</h3>
            </div>
        );
    }

        
}

export default Home;