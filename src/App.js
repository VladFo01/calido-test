import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
    const [obj, setObj] = useState({name: '', value: ''});
    const [array, setArray] = useState([]);
    const nameInput = useRef();
    const collection = [];
    const fields = [];

    useEffect(() => {
        function getCollections(arr) {
            arr.forEach(object => {
                const keys = Object.keys(object);
                keys.forEach(key => {
                    if (!fields.includes(key)) {
                        fields.push(key);
                    }
    
                    const newObj = {
                        id: Math.random().toString(36).slice(2),
                        field: key,
                        name: object[key],
                    }
                    if (key === 'value') {
                        newObj.valueGetter = val => val * 100;
                    }
                    collection.push(newObj);
                });
            });
        }
    
        getCollections(array);

        console.log(collection);
        console.log(fields);
    });


    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            setArray(prevArr => {
                return [...prevArr, obj];
            });
            setObj({value: '', name: ''});
            handleClick();
        }
    }

    function handleClick() {
        nameInput.current.focus();
    }

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;

        setObj(prevObj => {
            return {...prevObj, [key]: value}
        });
    }

    const collections = [{ name: 'dsajkdnsa dnsakd', field: 'name' }, { name: 'Value', field: 'value', valueGetter: val => val * 100 } ];

    return (
        <>
            <div>
                <button onClick={handleClick}>Focus on A</button>
                <input ref={nameInput} id='inputA' onChange={handleChange} name='name' placeholder='name' value={obj.name} />
                <input id='inputB' placeholder='value' onChange={handleChange} name='value' onKeyDown={handleKeyDown} value={obj.value} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map(elem => (
                        <tr key={Math.random().toString(36).slice(2)}>
                            <td>{elem.name}</td>
                            <td>{elem.value * 100}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default App;