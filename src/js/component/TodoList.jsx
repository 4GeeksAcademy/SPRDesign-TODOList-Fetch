import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import image from "../../img/image-background.jpg";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    
    const createUser = () => {
        return fetch('https://playground.4geeks.com/apis/fake/todos/user/sprdesign', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([]) // array vacío
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                return data; // Devuelve los datos para que puedan ser utilizados después
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        createUser()
            .then(() => {
                return fetch('https://playground.4geeks.com/apis/fake/todos/user/sprdesign');
            })
            .then(resp => resp.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleInputChange = (event) => {
        setCurrentTask(event.target.value);
    };

    const getTasks = async () => {
        try {
            // Obtener la lista actualizada después de agregar la tarea
            const updatedTasks = await (await fetch('https://playground.4geeks.com/apis/fake/todos/user/sprdesign')).json();
            
            setTasks(updatedTasks);// Actualizar con la lista actualizada

        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async () => {
        if (currentTask.trim()) {
            try {
                // Añadir task al servidor
                const updatedTasks = [...tasks, { label: currentTask }];
                await fetch('https://playground.4geeks.com/apis/fake/todos/user/sprdesign', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTasks)
                });

                setTasks(updatedTasks); // Actualizar la lista               
                setCurrentTask("");// Limpiar input

            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index)); //Filtrar tasks y eliminar por el índex
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask(); //Añade task al pulsar Enter
        };
    };


    return (
        <div className="image-background" style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 75%', // La imagen se posiciona desde el centro hacia abajo
        }}>

            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="iphone-wrapper">
                    <div className="iphone">

                        <div className="front-camera"></div>
                        <div className="speaker"></div>

                        <div className="iphone-screen">
                            <div className="content">
                                <div className="text-center">

                                    <h1 className="display-5 opacity-50" style={{
                                        color: "white"
                                    }}>ToDo</h1>

                                    <hr className="w-100" style={{ marginTop: '10px', color: "white" }} />

                                    <div className="mt-3">
                                        <div className="input-group mb-1 w-100">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What needs to be done?"
                                                value={currentTask}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyPress}
                                                style={{ height: '25px', boxShadow: 'none' }}
                                                maxLength={18} // longitud máxima de carácteres
                                            />
                                        </div>
                                    </div>

                                    <ul className="list-group mt-1 mx-auto w-100">
                                        {tasks.map((task, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                style={{ height: '25px' }}
                                            >
                                                {task.label}
                                                <span
                                                    className="badge badge-pill"
                                                    style={{
                                                        color: "grey",
                                                        fontSize: "10px",
                                                    }}
                                                    onClick={() => deleteTask(index)}
                                                >
                                                    X
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="mt-3 w-100 opacity-50" style={{
                                        fontSize: "12px",
                                        color: "white",
                                    }}>{tasks.length} Items Left</p>

                                </div>
                            </div>
                        </div>

                        <div className="iphone-button"></div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;