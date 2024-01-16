import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import image from "../../img/image-background.jpg";

const TodoList = () => {
    const [tasks, setTasks] = useState([{ label: "", done: false }]); // Estado para almacenar las tareas
    const [currentTask, setCurrentTask] = useState(''); // Estado para almacenar la tarea actual que se está escribiendo

    // Función asincrónica para obtener las tareas desde el servidor
    const getTasks = async () => {

        const url = 'https://playground.4geeks.com/apis/fake/todos/user/sprdesign' // URL de la API
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        try {
            const resp = await fetch(url, request); // Realizar la petición GET al servidor
            // Verificar si la respuesta es exitosa (código de estado 200)
            if (resp.ok) {
                const data = await resp.json(); // Convertir la respuesta a formato JSON
                setTasks(data); // Actualizar tasks con los datos obtenidos del servidor
                console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Función para manejar cambios en input
    // Obtener el valor actual del input. event contiene información sobre la interacción del usuario.
    // event.target: elemento del DOM que desencadenó el evento, y value: obtiene el valor actual del elemento (el valor del input).
    // Al usar 'event.target.value', estamos extrayendo el valor actual del input y actualizando currentTask con ese valor.
    const handleInputChange = (event) => {
        setCurrentTask(event.target.value); // Actualizar currentTask con el valor del campo de entrada
    };

    // Efecto para cargar las tareas al cargar el componente
    useEffect(() => {
        getTasks(); // Llamar a la función getTasks al montar el componente y cuando [] está vacío
    }, []);

    // Función para agregar una tarea
    const addTask = async (event) => {
        // Verificar si la tecla presionada es 'Enter'
        if (event.key === 'Enter') {

            const newTask = tasks.concat([{ label: currentTask, done: false }]); // Concatenar la nueva tarea a la lista de tareas

            const url = 'https://playground.4geeks.com/apis/fake/todos/user/sprdesign'
            const request = {
                method: "PUT", // petición de añadir
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask) // Convertir newTask a JSON y asignarla como cuerpo de la petición
            }
            try {
                const response = await fetch(url, request) // Realizar la petición PUT al servidor
                if (!response.ok) throw Error("There was a mistake"); // Verificar si la respuesta es exitosa 
                getTasks(); // Actualizar la lista de tareas después de agregar una nueva

            } catch (error) {
                console.log(error); // Manejo de errores
            }
            setCurrentTask("");// Limpiar el input después de agregar la tarea
        }
    }

    // Función para eliminar una tarea
    const deleteTask = async (index) => {
        
        const updatedTasks = tasks.filter((_, i) => i !== index);// Filtrar la tarea que se va a eliminar de la lista de tareas actual

        try {
            // Enviar la lista actualizada de tareas al servidor
            const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/sprdesign', {
                method: "PUT",
                body: JSON.stringify(updatedTasks),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Verificar si la respuesta del servidor es exitosa
            if (response.ok) {
                // Actualizar tasks con la lista de tareas actualizada
                setTasks(updatedTasks);
            } else {
                // error si hay problemas al actualizar las tareas
                throw Error("Error updating tasks.");
            }
        } catch (error) {
            console.error("Error in the PUT request", error);
        }
    };

    // Renderizar el componente
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
                                                onKeyDown={addTask}
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
                                    }}>{tasks.length} Items Left</p> //-1 para que cuente a partir de la posicion 1 y obviar la posición 0(example task)

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