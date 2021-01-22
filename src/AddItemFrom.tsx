import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type  AddItemFromType = {
    addItem: (title: string) => void
}
function AddItemFrom(props: AddItemFromType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")

        }
    }


    const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPreesHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <input className={""}
                   value={title}
                   onChange={ChangeTitleHandler}
                   onKeyPress={onKeyPreesHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemFrom