import React, { useState, useMemo } from 'react';
import UserForm from './UserForm';

const UserTable = ({ users, onAddUser, onUpdateUser, onDeleteUser }) => {
    // ... (all the state and logic from the previous version remains the same)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    
    const filteredAndSortedUsers = useMemo(() => {
        let sortedUsers = [...users];
        if (searchTerm) {
            sortedUsers = sortedUsers.filter(user =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortConfig.key !== null) {
            sortedUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortedUsers;
    }, [users, searchTerm, sortConfig]);
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '↕️';
        return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
    };
    
    const handleFormSubmit = (userData) => {
        if (editingUser) onUpdateUser(editingUser.id, userData);
        else onAddUser(userData);
        closeForm();
    };
    
    const openForm = (user = null) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingUser(null);
    };

    return (
        // Add animation class here!
        <div className="user-table-container animate__animated animate__fadeIn">
            <div className="toolbar">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search by name, email..."
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="search-bar"
                    />
                </div>
                <button className="btn-primary add-user-btn" onClick={() => openForm()}>+ Add User</button>
            </div>
            
            {isFormOpen && (
                <UserForm
                    onSubmit={handleFormSubmit}
                    onCancel={closeForm}
                    initialData={editingUser}
                />
            )}

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('id')}>ID {getSortIndicator('id')}</th>
                            <th onClick={() => requestSort('firstName')}>First Name {getSortIndicator('firstName')}</th>
                            <th onClick={() => requestSort('lastName')}>Last Name {getSortIndicator('lastName')}</th>
                            <th onClick={() => requestSort('email')}>Email {getSortIndicator('email')}</th>
                            <th onClick={() => requestSort('department')}>Department {getSortIndicator('department')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id} className="animate__animated animate__fadeIn">
                                <td data-label="ID">{user.id}</td>
                                <td data-label="First Name">{user.firstName}</td>
                                <td data-label="Last Name">{user.lastName}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Department"><span className="department-tag">{user.department}</span></td>
                                <td data-label="Actions">
                                    <div className="action-buttons">
                                      <button className="btn-edit" onClick={() => openForm(user)}>Edit</button>
                                      <button className="btn-danger" onClick={() => onDeleteUser(user.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="pagination-controls">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    Next
                </button>
                <select value={usersPerPage} onChange={e => {setUsersPerPage(Number(e.target.value)); setCurrentPage(1);}}>
                    <option value="10">10 / page</option>
                    <option value="25">25 / page</option>
                    <option value="50">50 / page</option>
                    <option value="100">100 / page</option>
                </select>
            </div>
            <style jsx>{`
                .user-table-container { 
                    background: var(--card-bg); 
                    padding: 2rem; 
                    border-radius: 15px; 
                    box-shadow: var(--shadow);
                    backdrop-filter: blur(10px); /* Frosted glass effect */
                }
                .toolbar { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    margin-bottom: 2rem; 
                }
                .search-wrapper { position: relative; }
                .search-bar { 
                    padding: 12px 20px 12px 40px; /* Add space for icon */
                    width: 350px; 
                    border-radius: 25px; 
                    border: 1px solid var(--border-color);
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .search-bar:focus {
                    outline: none;
                    border-color: var(--primary-accent);
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                }
                .search-wrapper::before {
                    content: '🔍'; /* Search icon */
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-light);
                }
                .add-user-btn {
                  padding: 12px 25px;
                  border-radius: 25px;
                  font-size: 1rem;
                }
                .table-wrapper { overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 1rem; text-align: left; }
                th { 
                    background-color: transparent;
                    color: var(--text-light);
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                    cursor: pointer;
                    border-bottom: 2px solid var(--border-color);
                }
                tr { transition: background-color 0.2s ease; }
                tr:hover { background-color: rgba(0,0,0,0.02); }
                .department-tag {
                  background-color: #eaf3fa;
                  color: #3498db;
                  padding: 5px 10px;
                  border-radius: 15px;
                  font-size: 0.8rem;
                  font-weight: 500;
                }
                .action-buttons { display: flex; gap: 10px; }
                .action-buttons button { padding: 5px 10px; font-size: 0.9rem; border-radius: 5px; box-shadow: none; }
                .pagination-controls { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem; color: var(--text-light); }
                .pagination-controls button, .pagination-controls select {
                  background: var(--white);
                  border: 1px solid var(--border-color);
                  padding: 8px 12px;
                  border-radius: 5px;
                  transition: all 0.2s ease;
                }
                .pagination-controls button:hover:not(:disabled) {
                  background-color: var(--primary-accent);
                  color: var(--white);
                  border-color: var(--primary-accent);
                }
                .pagination-controls button:disabled { opacity: 0.5; cursor: not-allowed; }

                 @media (max-width: 768px) {
                    .toolbar { flex-direction: column; gap: 1rem; align-items: stretch; }
                    .search-bar { width: 100%; box-sizing: border-box; }
                    table, thead, tbody, th, td, tr { display: block; }
                    thead tr { position: absolute; top: -9999px; left: -9999px; }
                    tr { border: 1px solid var(--border-color); border-radius: 10px; margin-bottom: 1rem; }
                    td { border: none; border-bottom: 1px solid #eee; position: relative; padding-left: 50%; padding-top: 10px; padding-bottom: 10px; text-align: right; }
                    td:before { content: attr(data-label); position: absolute; left: 15px; width: 45%; padding-right: 10px; white-space: nowrap; text-align: left; font-weight: bold; color: var(--text-dark); }
                 }
            `}</style>
        </div>
    );
};

export default UserTable;
