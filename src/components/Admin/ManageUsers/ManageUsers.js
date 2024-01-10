import AddUsersModal from "./AddUsersModal";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import TableUserPaginate from "./TableUserPaginate";
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const LIMIT_USER = 2;
    const [listUsers, setListUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        fetchListUserPaginate(1);
    }, []);

    

    const getListUsersPaginate = async (page, limit) => {
        return await axios.get(`http://localhost:8081/api/v1/participant?page=${page}&limit=${limit}`);
    }

    const fetchListUserPaginate = async (page) => {
        let res = await getListUsersPaginate(page, LIMIT_USER);
        if(res.data.EC === 0) {
            setListUsers(res.data.DT.users);
            setPageCount(res.data.DT.totalPages);
        }
    }



    return (
        <div className="user-container">
            <AddUsersModal fetchListUserPaginate={fetchListUserPaginate}/>
            <div>
                <TableUserPaginate 
                    listUsers={listUsers}
                    pageCount={pageCount}
                    fetchListUserPaginate={fetchListUserPaginate}/>  

            </div>    
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />    
        </div>
    )
};

export default ManageUsers;
