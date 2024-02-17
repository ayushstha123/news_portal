import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';

import React from 'react'

const CreatePost = () => {
  return (
    <div>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create A Post</h1>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id="title" className='flex-1'/>
            <Select>
              <option value="uncategorized">Select a category</option>
              <option value="World">World</option>
              <option value="tech">tech</option>
              <option value="breaking_news">Breaking news</option>
              
            </Select>
          </div>
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type="file" accept='image/*'/>
            <Button type='button' gradientDuoTone='greenToBlue' size='sm' outline>Upload Image</Button>
          </div>
          <ReactQuill theme="snow" placeholder="Write your post here" className='h-72 mb-12' required/>
          <Button type='submit' gradientDuoTone='greenToBlue'>Publish</Button>
          </form>
      </div>
    </div>
  )
}

export default CreatePost