import react, { useReducer } from 'react'


export const AddContact = async(name, address, phone, email, dispatch) => {
    const newContact = {
        name: name,
        address: address,
        phone: phone,
        email: email,
    }

    const options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addContact)
    }

    const response = await fetch('https://playground.4geeks.com/contact/agendas/rickr/contacts', options)

    return (
        <>
        <div></div>
        </>
    )
}