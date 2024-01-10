import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateUsersModal from './UpdateUsersModal';
import DeleteUserModal from './DeleteUserModal';
import ReactPaginate from 'react-paginate';


const TableUserPaginate = (props) => {
    
    const {listUsers, pageCount} = props;

    const handlePageClick = (e) => {
        props.fetchListUserPaginate(+e.selected + 1);
    };
    

    return (
        <>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && 
            listUsers.map((user) => { 
                return (
                <tr key={``}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <UpdateUsersModal user={user} fetchListUserPaginate={props.fetchListUserPaginate}/>
                        <DeleteUserModal user={user} fetchListUserPaginate={props.fetchListUserPaginate}/>
                    </td>
                </tr>
                )
            }
            )
        }
        {listUsers && listUsers.length === 0 &&
        <tr>
            <td colSpan="4">No data</td>
        </tr>
        }
      </tbody>
    </Table>
    <div className='d-flex justify-content-center'>  
    <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
    </>
    );
};

export default TableUserPaginate;