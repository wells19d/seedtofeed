import { useSelector } from 'react-redux';
// import AudioClip from './AudioClip';
import moment from 'moment';
import './Uploads.css';

const UploadList = (props) => {
   const uploads = useSelector(store => store.uploads);
//    const images = uploads.filter(o => o.file_type === 'image');
//    const audios = uploads.filter(o => o.file_type === 'audio');
   
   return (
      <>
         {/* <h2>All Uploaded Files:</h2>
         <ul>
            {(uploads.length === 0) && <li>There are no uploaded files</li>}
            {uploads.map(file =>
               <li key={file.id}>
                  File #{file.id} <a href={file.file_url} target='_blank' rel="noopener noreferrer">{file.description}</a> - 
                  (<em>{file.file_type} file</em>, uploaded {moment(file.uploaded_at).calendar()})
               </li>
            )}
         </ul>

         <h2>Uploaded Images:</h2>
         <ul>
            {(images.length === 0) && <li>There are no uploaded images</li>}
            {images.map(file =>
               <img src={file.file_url} className='uploaded-image' alt={file.description} />
            )}
         </ul>

         <h2>Uploaded Audio:</h2>
         <ul>
            {(audios.length === 0) && <li>There are no uploaded audio files</li>}
            {audios.map(file =>
               <AudioClip file={file} />
            )}
         </ul> */}
      </>
   )
}

// Using hooks instead!
// const mapStateToProps = (state) => ({
//    uploads: state.uploads,
//    images: state.uploads.filter(o => o.file_type === 'image'),
//    audios: state.uploads.filter(o => o.file_type === 'audio'),
// });
// export default connect(mapStateToProps)(UploadList)
export default UploadList;