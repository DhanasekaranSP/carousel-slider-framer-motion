import './App.css';
import {motion} from 'framer-motion';
import {useEffect,useState,useRef} from "react";
import axios from 'axios';
import { UnsplashImage } from './assets/UnsplashImage.js';
import {Heading} from './assets/Heading.js'

function App() {

  const [images, setImage] = useState([]);
  useEffect(() => {fetchImages();}, [])

  const fetchImages = (count = 8) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {setImage([...images, ...res.data]);})
      .catch(err=>(console.log("ERROR FETCHING IMAGE")))
    }
    
  const [width,setWidth] = useState(0);
  const carousel = useRef();
  useEffect(() => {setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth)})

  return (
    <div className="App">
      <Heading/>
      <motion.div ref={carousel} className='carousel' whileTap={{cursor:"grabbing"}}>
        <motion.div className='inner-carousel' drag="x" dragConstraints={{right: 0 ,left:-width}}>
        {images.map(image => {
          return(
            <motion.div className='item' key={images}>
              <UnsplashImage url={image.urls.regular} key={image.id}/>
              {/* <img src={image} alt=''/> */}
              </motion.div>
          );
        })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
