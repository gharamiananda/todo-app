import React, { useEffect, useState } from 'react';

const Todo = () => {



    const getStorageData = () => {
        const jsonData = localStorage.getItem("todos");

        return (JSON.parse(jsonData))
    }
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getStorageData());
    const [editItem, setEditItem] = useState(null);
    const [toggleButton, settoggleButton] = useState(false);


    const timestamp = (new Date().getTime()).toString()
    const handleAddItem = () => {

        if (!inputData) {
            return alert("Please Input your Task")
        }
        if (inputData && editItem) {
            const remainingTodos = items.filter(item => item._id !== editItem);



            setItems([...remainingTodos, { _id: editItem, inputData }]);

            setInputData("");
            settoggleButton(false)
        }
        else {
            setItems([...items, { _id: timestamp, inputData }]);


            setInputData("")
        }
    }
    const handleDelete = (id) => {
        const remainingTodos = items.filter(item => item._id !== id);
        setItems(remainingTodos)

    }
    const handleEdit = (id) => {
        const findTodo = items.find(item => item._id == id);
        setInputData(findTodo?.inputData);
        setEditItem(id)
        settoggleButton(true)
    }




    // useEffect(() => {


    //     const jsonData = localStorage.getItem("todos");

    //     setItems(JSON.parse(jsonData))
    // }, [items])
    useEffect(() => {


        let jsonTodos = JSON.stringify(items);
        localStorage.setItem("todos", jsonTodos)
    }, [items])
    return (


        <>
            <div className="main__div">
                <div className="child__div">
                    <figure>
                        <img src="" alt="" />
                        <figcaption>Add your list here!</figcaption>
                    </figure>

                    <div className="add__item">
                        <input type="text"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}

                            placeholder='Add Items' />
                        {!toggleButton ? <button title='Add Item' onClick={handleAddItem}>Add Item</button> :
                            <button title='Edit Item' onClick={handleAddItem}>Edit button Item</button>
                        }
                        <div className="show__item">
                            {
                                items?.map((elem, ind) => {
                                    return <div className="single__item" key={ind}>
                                        <h3>{elem.inputData}</h3>
                                        <button title='Delete Item' onClick={() => handleDelete(elem?._id)}>Delete Item</button>
                                        <button title='Edit Item' onClick={() => handleEdit(elem?._id)}>Edit Item</button>

                                    </div>
                                })
                            }
                        </div>

                        <div className="show__items">
                            <button>CkeckList</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;