import React, { useState } from 'react'

const AddTask = (props) => {
    const [count, setCount] = useState(Number(1));
    const [clicked, setClicked] = useState(false);
    const [values, setValues] = useState({
        title: "",
        note: ""
    })

    const {title, note} = values;

    function handleChange(event){
        const { value, name } = event.target;
        
        setValues((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

            // console.log(title, note)
        
    }

    

  return (
    <div className='addtask-background addtask addtask-text-color font-bold rounded-xl ' >
        <form className='my-3'>
        <div className='mx-3'>
        <input type="text" placeholder='What are you working on?' value={values.title} name="title" className='text-2xl mt-3' onChange={handleChange}></input>
            <h1 className='my-5 text-xl'>Est Pomodoros</h1>
            <div className='flex'>
                <input placeholder={count} type="number"  className='input-background px-2 py-1 rounded-lg'></input>
                    <button type="button" onClick={()  => setCount(count + 1)} className='ml-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 " >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </button>
                    <button type="button" onClick={() => setCount(count - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
            </div>
            <div>
                {!clicked ? (<button type="button" onClick={() => setClicked(true)} style={{color: "#a3a3a3"}}  className='text-sm my-5 underline'>+ Add Note </button>)
                : <textarea value={values.note} name="note"  onChange={handleChange} className='textarea-background my-3 rounded-md font-light'></textarea> }
                
            </div>
        </div>
            

            <div className='flex justify-end px-2 py-3 rounded-b-xl' style={{backgroundColor: "#efefef"}}>
                <button 
                name="cancel" type="button" className='mx-2'
                onClick={() => props.cancelCreation()}
                >Cancel</button>
                <button name="save" type="button"
                onClick={() => {
                    props.sendValues(title, note)
                    setValues({title: "",note: ""})
                }}
                >Save</button>
            </div>
            
        </form>
    </div>
  )
}

export default AddTask
