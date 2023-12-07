import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
};

const Todo = () => {

    const[inputData,setInputData]=useState("");
    const[items,setItems]=useState(getLocalData())
    const [isEditItem,setIsEditItem]=useState("");
    const[toggleButton,setToggleButton]=useState(false);

     const addItem=()=>{
          if(!inputData){
            alert("plz fill the data");
          }
          else if(inputData && toggleButton){
            setItems(
              items.map((currElem)=>{
                if(currElem.id==isEditItem){
                  return {...currElem,name:inputData};
                }
                else{
                  return currElem;
                }
              })
            )
            setInputData("");
            setIsEditItem(null);
             setToggleButton(false);
          }
          else{
            const myNewInputData={
              id:new Date().getTime().toString(),
              name:inputData,
            }
            setItems([...items,myNewInputData]);
            setInputData("");
          }
     };

     const deleteItem=(index)=>{
       const updatedeItem=items.filter((currElem)=>{
          return currElem.id !== index;
       });
       setItems(updatedeItem);
     }

    const removeAll=()=>{
      setItems([]);
    };

    useEffect(()=>{
      localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items]);

    const editItem=(index)=>{
      const item_todo_find=items.find((curElem)=>{
         return curElem.id===index;
      })
      setInputData(item_todo_find.name);
     setIsEditItem(index);
      setToggleButton(true);
    }

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
           <figure>
              <img src="./images/todo.svg" alt='todologo'/>
              <figcaption>Add Your List Here </figcaption>
            
           </figure>
           <div className='addItems'>
                <input
                    type="text"
                    placeholder='Add Item'
                    className='form-control' 
                    value={inputData}
                    onChange={(event)=>setInputData(event.target.value)}
                />
                {toggleButton ? (<i className='far fa-edit add-btn ' onClick={addItem}></i>) :
                <i className='fa fa-plus add-btn ' onClick={addItem}></i>}
                
           </div>

          <div className='showItems'>
              {items.map((curElem)=>{
                  return (
                    <div className='eachItem' key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className='todo-btn'>
                    <i className='far fa-edit add-btn '
                      onClick={()=>editItem(curElem.id)}></i>
                    <i className='far fa-trash-alt add-btn ' onClick={()=>deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                  )
              })}
               
          </div>


           <div className='showItems'>
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
              </button>
           </div>
        </div>
      </div>
    </>
  )
}

export default Todo