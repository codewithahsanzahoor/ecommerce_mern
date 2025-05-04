import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => (
	<>
		<Navbar />
		<div className='container mt-4'>
			<main>
				<Outlet />
			</main>
		</div>
	</>
);

export default MainLayout;
