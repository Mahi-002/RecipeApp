import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchRecipes();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch users.');
        }
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/recipes');
            setRecipes(response.data);
        } catch (error) {
            toast.error('Failed to fetch recipes.');
        }
    };

    const handleBanUser = async (userId) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/banUser/${userId}`);
            toast.success('User banned successfully.');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to ban user.');
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/deleteRecipe/${recipeId}`);
            toast.success('Recipe deleted successfully.');
            fetchRecipes();
        } catch (error) {
            toast.error('Failed to delete recipe.');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.banned ? 'Banned' : 'Active'}
                        {!user.banned && (
                            <button onClick={() => handleBanUser(user.id)}>Ban User</button>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.title}
                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
