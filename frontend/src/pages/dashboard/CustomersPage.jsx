import React, { useEffect } from 'react';
import useUserStore from '../../store/userStore';

const CustomersPage = () => {
  const { users, loading, error, fetchUsers, deleteUser, updateUserRole } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleRoleChange = (id, newRole) => {
    updateUserRole(id, newRole);
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className='container mt-4'>
      <h3 className='mb-4'>Manage Customers</h3>

      <table className='table table-hover table-bordered'>
        <thead className='table-light'>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className='form-select form-select-sm'
                  value={user.isAdmin ? 'Admin' : 'User'}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                >
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>
                </select>
              </td>
              <td>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan='5' className='text-center'>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
