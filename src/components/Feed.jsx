import { useState,useEffect } from "react"
import { Stack,Box,Typography,Button } from "@mui/material"
import{ SideBar,Videos } from "./index"
import { FetchFromAPI } from "../utils/FetchFromAPI"
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos,setVideos] = useState([]);
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [progress,setProgress] = useState(10)
  const fetchMoreData = ()=>{
       FetchFromAPI(`search?part=snippet&q=${selectedCategory}`,token)
      .then((data)=>   {
        setProgress(20)
        setVideos({videos:[...videos,...data.items]})
        setProgress(50)
        setToken(data.nextPageToken);
        setResult(data.pageInfo.totalResults)
        setProgress(100)
             });
           }
 
  
  useEffect(()=>{
    FetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data)=>   {
        setProgress(20)
        setVideos(data.items)
        setProgress(50)
        setToken(data.nextPageToken);
        setResult(data.pageInfo.totalResults)
        setProgress(100)
             });
  },[selectedCategory])




  return (
    <Stack sx={{flexDirection:{sx:"column", md:"row"}}}>
          <LoadingBar color="#f11946" progress={progress}  onLoaderFinished={() => setProgress(0)}/>      
      <Box sx={{height:{sx:'auto', md:'92vh'}, borderRight:'1px solid #3d3d3d', px: {sx:0, md:2}}}>
      <SideBar 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />


      <Typography className="copyright"
      variant="body2"
      sx={{mt:1.5, color:'#fff'}}
      >
        Copyright &copy; 2024 3S MEDIA 
      </Typography>
      </Box>
      <Box p={2} sx={{
        overflowY:'auto',
        height:'90vh', flex:2
      }}>
        <Typography variant="h4" 
        fontWeight='bold'
        mb={2}
        sx={{color:'white'}}
        >
          {selectedCategory}  <span style={{color:'#F32503'}}>videos</span>
        </Typography>
        <InfiniteScroll
          dataLength={videos?.length}
          next={fetchMoreData}
          hasMore={videos?.length<result}
          loader={<h4 style={{"color":"white","textAlign":"center"}}>Loading...</h4>}
        >
      <Videos videos = {videos} />
        
      
      
        </InfiniteScroll>
     
      </Box>
    </Stack>
  )
}

export default Feed