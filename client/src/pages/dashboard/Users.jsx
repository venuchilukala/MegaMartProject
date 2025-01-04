// import { useQuery } from "@tanstack/react-query";
// import React from "react";

// const Users = () => {
//   const { refetch, data: users = [] } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await 
//       return res.json();
//     },
//   });
//   console.log(users);
//   return <div>Users</div>;
// };

// export default Users;


import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  // const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:6001/users");
      return res.json();
    },
  });

  //Handle Admin role
  const handleAdminStatus = (user) => {
    // axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
    //   alert(`${user.name}'s admin status changed!`);
    //   refetch();
    // });
  };

  //Delete an user from database
  const handleDeleteUser = (user) =>{
    // axiosSecure.delete(`/users/${user._id}`).then((res)=>{
    //   alert(`${user.name} is removed from database`)
    //   refetch()
    // })
  }

  return (
    <div>
      <div className="flex items-center justify-between m-4">
      <h2 className="text-2xl font-semibold my-4">
        Manage all <span className="text-blue-500">Users</span>
      </h2>
        <h5 className="text-2xl font-semibold my-4">Total users: <span className="text-blue-500 ">{users.length}</span></h5>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-blue-500 text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                      onClick={() => handleAdminStatus(user)}
                      className="btn btn-xs  bg-indigo-500 text-white"
                    >
                      Admin
                    </button>
                    ) : (
                      <button
                        onClick={() => handleAdminStatus(user)}
                        className="btn btn-xs"
                      >
                        User
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={()=>handleDeleteUser(user)} className="btn btn-ghost btn-xs text-red-500">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;