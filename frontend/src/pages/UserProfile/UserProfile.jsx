import {React,useState} from 'react'
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const UserProfile = () => {
    const [isEditing,setIsEditing] = useState(false);


    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleSave = () => {
        setIsEditing(false)
    }



    return(
    <div>
        <Header isEditing = {isEditing} onEdit = {handleEdit}/>
        <Body isEditing = {isEditing} />
        {isEditing && <Footer onCancel = {handleCancel} onSave = {handleSave}/>} 
    </div>
    )
}

export default UserProfile;