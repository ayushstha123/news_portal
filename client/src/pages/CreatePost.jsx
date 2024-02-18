import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import {app} from '../firebase.js';
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({});
const [publishError,setPublishError]=useState(null);
const navigate=useNavigate();
console.log(formData)
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload error");
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setImageUploadProgress(null);
                            setImageUploadError(null);
                            setImageUrl(downloadURL);
                            setFormData({
                                ...formData,
                                imageUrl: downloadURL
                            });
                        })
                        .catch((error) => {
                            setImageUploadError("Failed to get image download URL");
                            setImageUploadProgress(null);
                        });
                }
            );
        } catch (error) {
            setImageUploadError("Image upload failed");
        }
    }
    const handleSumbit = async (e) => {
      e.preventDefault();
      try {
          const postData = { ...formData, imageUrl: imageUrl }; // Include imageUrl in the form data
          const res = await fetch('/api/post/create', {
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: JSON.stringify(postData)
          });
          const data = await res.json();
          if (!res.ok) {
              setPublishError(data.message==500 ?  data.message : "the title must not be same as other title");
          } else {
              setPublishError(null);
              setFormData({});
              setImageUrl(null);
              navigate(`/post/${data.slug}`)

          }
      } catch (error) {
          setPublishError("Error while publishing");
      }
  }
    return (
        <div>
            <div className='p-3 max-w-3xl mx-auto min-h-screen'>
                <h1 className='text-center text-3xl my-7 font-semibold'>Create A Post</h1>
                <form onSubmit={handleSumbit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                        <TextInput onChange={(e) => setFormData({ ...formData, title: e.target.value })} type='text' placeholder='Title' id="title" className='flex-1' required/>
                        <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            <option value="uncategorized">Select a category</option>
                            <option value="World">World</option>
                            <option value="tech">Tech</option>
                            <option value="breaking_news">Breaking News</option>
                        </Select>
                    </div>
                    <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                        <FileInput type="file" accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                        <Button type='button' onClick={handleUploadImage} gradientDuoTone='greenToBlue' size='sm' outline>
                          {imageUploadProgress ? `Loading ${imageUploadProgress}%` : "Upload Image"}
                        </Button>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Uploaded Image" className='w-full h-72 object-cover' />}

                    {imageUploadError && (<Alert color="failure">{imageUploadError}</Alert>)}
                    <ReactQuill theme="snow" id='content' placeholder="Write your post here" className='h-72 mb-12' onChange={
                      (value)=>{
                        setFormData({...formData,content:value})
                      }
                    } required />
                    <Button type='submit' gradientDuoTone='greenToBlue'>Publish</Button>
                    {publishError && (<Alert color="failure">{publishError}</Alert>)}
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
