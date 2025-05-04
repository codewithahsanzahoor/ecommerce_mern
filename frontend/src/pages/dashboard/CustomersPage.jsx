import React, { useEffect, useState } from 'react';

const CustomersPage = () => {
	const [users, setUsers] = useState([]);

	// 👇 Simulated initial user data (Replace with API call)
	useEffect(() => {
		// 🔁 Replace this with your real data fetching logic (e.g. fetch("/api/users"))
		const dummyUsers = [
			{ id: 1, name: 'Ahsan', email: 'ahsan@example.com', role: 'User' },
			{ id: 2, name: 'Sara', email: 'sara@example.com', role: 'Admin' },
		];
		setUsers(dummyUsers);
	}, []);

	// 🧠 Logic to delete a user
	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			setUsers((prev) => prev.filter((user) => user.id !== id));

			// 💬 Add your API DELETE request here
			// await fetch(`/api/users/${id}`, { method: 'DELETE' })
		}
	};

	// 🧠 Logic to update role
	const handleRoleChange = (id, newRole) => {
		setUsers((prev) =>
			prev.map((user) =>
				user.id === id ? { ...user, role: newRole } : user
			)
		);

		// 💬 Add your API PUT request here to update user role
		// await fetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
	};

	return (
		<div className='container mt-4'>
			<h3 className='mb-4'>Manage Customers</h3>

			<table className='table table-hover table-bordered'>
				<thead className='table-light'>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.id}>
							<td>{index + 1}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>
								<select
									className='form-select form-select-sm'
									value={user.role}
									onChange={(e) =>
										handleRoleChange(
											user.id,
											e.target.value
										)
									}
								>
									<option value='User'>User</option>
									<option value='Admin'>Admin</option>
								</select>
							</td>
							<td>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => handleDelete(user.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					{users.length === 0 && (
						<tr>
							<td
								colSpan='5'
								className='text-center'
							>
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
