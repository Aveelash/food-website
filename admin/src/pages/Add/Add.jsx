import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

    const url = "http://localhost:4000";

    const [storeImage, setStoreImage] = useState(false)
    const [storeData, setStoreData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "Salad"
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStoreData((data) => ({ ...data, [name]: value }));
    };


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", storeData.name)
        formData.append("description", storeData.description)
        formData.append("price", Number(storeData.price))
        formData.append("category", storeData.category)
        formData.append("image", storeImage)
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {
            setStoreData({
                name: "",
                description: "",
                price: 0,
                category: "Salad"
            })
            setStoreImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={storeImage ? URL.createObjectURL(storeImage) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setStoreImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={storeData.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={storeData.description} name="description" rows={6} placeholder='Write content here'></textarea>
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={storeData.price} name='price' type="Number" placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add